package jtech.tasks.service;

import jakarta.persistence.EntityNotFoundException;
import jtech.tasks.domain.Task;
import jtech.tasks.domain.TaskStatus;
import jtech.tasks.dto.TaskFilterRequest;
import jtech.tasks.dto.TaskRequest;
import jtech.tasks.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.data.domain.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private TaskRequest basicRequest;

    @BeforeEach
    void setUp() {
        basicRequest = new TaskRequest("My Title", "My Description", null);
    }

    @Test
    void create_whenStatusNull_setsPendingAndSaves() {
        Task saved = new Task();
        saved.setId(1L);
        saved.setTitle("My Title");
        saved.setDescription("My Description");
        saved.setStatus(TaskStatus.PENDING);

        when(taskRepository.save(any(Task.class))).thenReturn(saved);

        Task result = taskService.create(basicRequest);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals(TaskStatus.PENDING, result.getStatus());
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void create_whenStatusProvided_setsCorrectStatus() {
        TaskRequest request = new TaskRequest("T", "D", "done");
        Task saved = new Task();
        saved.setId(2L);
        saved.setTitle("T");
        saved.setDescription("D");
        saved.setStatus(TaskStatus.COMPLETED);

        when(taskRepository.save(any(Task.class))).thenReturn(saved);

        Task result = taskService.create(request);

        assertEquals(TaskStatus.COMPLETED, result.getStatus());
        verify(taskRepository).save(any(Task.class));
    }

    @Test
    void update_whenFound_updatesAndReturns() {
        Long id = 10L;
        Task existing = new Task();
        existing.setId(id);
        existing.setTitle("old");
        existing.setDescription("old");
        existing.setStatus(TaskStatus.PENDING);

        TaskRequest request = new TaskRequest("new title", "new desc", "done");

        when(taskRepository.findById(id)).thenReturn(Optional.of(existing));
        when(taskRepository.save(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));

        Task updated = taskService.update(id, request);

        assertEquals("new title", updated.getTitle());
        assertEquals("new desc", updated.getDescription());
        assertEquals(TaskStatus.COMPLETED, updated.getStatus());
        verify(taskRepository).findById(id);
        verify(taskRepository).save(existing);
    }

    @Test
    void update_whenNotFound_throwsEntityNotFoundException() {
        Long id = 99L;
        when(taskRepository.findById(id)).thenReturn(Optional.empty());
        TaskRequest request = new TaskRequest("t", "d", "pending");

        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> taskService.update(id, request));
        assertTrue(ex.getMessage().contains("Task not found with id"));
        verify(taskRepository).findById(id);
        verify(taskRepository, never()).save(any());
    }

    @Test
    void delete_whenFound_marksDeletedTrue() {
        Long id = 5L;
        Task existing = new Task();
        existing.setId(id);
        existing.setDeleted(false);

        when(taskRepository.findById(id)).thenReturn(Optional.of(existing));
        when(taskRepository.save(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));

        taskService.delete(id);

        assertTrue(existing.isDeleted());
        verify(taskRepository).findById(id);
        verify(taskRepository).save(existing);
    }

    @Test
    void delete_whenNotFound_throwsEntityNotFoundException() {
        Long id = 77L;
        when(taskRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> taskService.delete(id));
        verify(taskRepository).findById(id);
        verify(taskRepository, never()).save(any());
    }

    @Test
    void findAll_whenStatusNull_callsFindAll() {
        TaskFilterRequest filter = new TaskFilterRequest(null, PageRequest.of(0, 10));
        Page<Task> page = new PageImpl<>(List.of(new Task(), new Task()));

        when(taskRepository.findAll(filter.pageable())).thenReturn(page);

        Page<Task> result = taskService.findAll(filter);

        assertEquals(2, result.getContent().size());
        verify(taskRepository).findAll(filter.pageable());
        verify(taskRepository, never()).findAllByStatusIs(any(), any());
    }

    @Test
    void findAll_whenStatusProvided_callsFindAllByStatusIs() {
        TaskFilterRequest filter = new TaskFilterRequest(TaskStatus.COMPLETED, PageRequest.of(0, 5));
        Page<Task> page = new PageImpl<>(Collections.singletonList(new Task()));

        when(taskRepository.findAllByStatusIs(filter.pageable(), filter.status())).thenReturn(page);

        Page<Task> result = taskService.findAll(filter);

        assertEquals(1, result.getContent().size());
        verify(taskRepository).findAllByStatusIs(filter.pageable(), filter.status());
        verify(taskRepository, never()).findAll(any(Pageable.class));
    }

    @Test
    void findById_whenFound_returnsTask() {
        Long id = 3L;
        Task t = new Task();
        t.setId(id);
        when(taskRepository.findById(id)).thenReturn(Optional.of(t));

        Task result = taskService.findById(id);

        assertEquals(id, result.getId());
        verify(taskRepository).findById(id);
    }

    @Test
    void findById_whenNotFound_throwsEntityNotFoundException() {
        Long id = 404L;
        when(taskRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> taskService.findById(id));
        verify(taskRepository).findById(id);
    }
}

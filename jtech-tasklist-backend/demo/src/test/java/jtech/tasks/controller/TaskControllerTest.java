package jtech.tasks.controller;

import jakarta.persistence.EntityNotFoundException;
import jtech.tasks.domain.Task;
import jtech.tasks.domain.TaskStatus;
import jtech.tasks.dto.TaskFilterRequest;
import jtech.tasks.dto.TaskRequest;
import jtech.tasks.dto.TaskResponse;
import jtech.tasks.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.data.domain.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class TaskControllerTest {

    private TaskController controller;
    private TaskService mockService;

    @BeforeEach
    void setUp() {
        controller = new TaskController();
        mockService = mock(TaskService.class);
        ReflectionTestUtils.setField(controller, "taskService", mockService);
    }

    @Test
    void create_returnsCreatedResponse() {
        TaskRequest request = new TaskRequest("t", "d", null);

        Task saved = new Task();
        saved.setId(1L);
        saved.setTitle("t");
        saved.setDescription("d");
        saved.setStatus(TaskStatus.PENDING);

        when(mockService.create(request)).thenReturn(saved);

        ResponseEntity<?> resp = controller.create(request);

        assertEquals(201, resp.getStatusCode().value());
        assertTrue(resp.getBody() instanceof TaskResponse);
        TaskResponse body = (TaskResponse) resp.getBody();
        assertEquals(1L, body.id());
        assertEquals("t", body.title());
        verify(mockService).create(request);
    }

    @Test
    void update_returnsOkResponse() {
        Long id = 2L;
        TaskRequest request = new TaskRequest("title", "desc", TaskStatus.COMPLETED);

        Task updated = new Task();
        updated.setId(id);
        updated.setTitle("title");
        updated.setDescription("desc");
        updated.setStatus(TaskStatus.COMPLETED);

        when(mockService.update(id, request)).thenReturn(updated);

        ResponseEntity<?> resp = controller.update(id, request);

        assertEquals(200, resp.getStatusCode().value());
        TaskResponse body = (TaskResponse) resp.getBody();
        assertEquals("title", body.title());
        assertEquals(TaskStatus.COMPLETED.name(), body.status());
        verify(mockService).update(id, request);
    }

    @Test
    void delete_returnsOkAndCallsService() {
        Long id = 3L;
        doNothing().when(mockService).delete(id);

        ResponseEntity<Void> resp = controller.delete(id);

        assertEquals(200,resp.getStatusCode().value());
        assertNull(resp.getBody());
        verify(mockService).delete(id);
    }

    @Test
    void findAll_returnsPagedTaskResponse() {
        Task t1 = new Task();
        t1.setId(1L);
        t1.setTitle("a");
        t1.setDescription("b");
        t1.setStatus(TaskStatus.PENDING);

        Page<Task> page = new PageImpl<>(List.of(t1), PageRequest.of(0, 10), 1);
        when(mockService.findAll(any(TaskFilterRequest.class))).thenReturn(page);

        TaskFilterRequest filter = new TaskFilterRequest(null, 10, 0, "", "", "");
        ResponseEntity<?> resp = controller.findAll(filter);

        assertEquals(200, resp.getStatusCode().value());
        Object body = resp.getBody();
        assertTrue(body instanceof Page);
        Page<?> responsePage = (Page<?>) body;
        assertEquals(1, responsePage.getContent().size());
        Object first = responsePage.getContent().get(0);
        assertTrue(first instanceof TaskResponse);
        TaskResponse tr = (TaskResponse) first;
        assertEquals(1L, tr.id());
        verify(mockService).findAll(filter);
    }

    @Test
    void findById_returnsTaskResponse() {
        Long id = 8L;
        Task t = new Task();
        t.setId(id);
        t.setTitle("x");
        t.setDescription("y");
        t.setStatus(TaskStatus.COMPLETED);

        when(mockService.findById(id)).thenReturn(t);

        ResponseEntity<TaskResponse> resp = controller.findById(id);

        assertEquals(200, resp.getStatusCode().value());
        TaskResponse body = resp.getBody();
        assertEquals("x", body.title());
        assertEquals(TaskStatus.COMPLETED.name(), body.status());
        verify(mockService).findById(id);
    }

    @Test
    void findById_whenNotFound_throwsEntityNotFoundException() {
        Long id = 99L;
        when(mockService.findById(id)).thenThrow(new EntityNotFoundException("Task not found with id: " + id));

        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> controller.findById(id));
        assertTrue(ex.getMessage().contains("Task not found with id"));
        verify(mockService).findById(id);
    }

    @Test
    void update_whenServiceThrowsNotFound_propagatesException() {
        Long id = 50L;
        TaskRequest req = new TaskRequest("t", "d", null);
        when(mockService.update(id, req)).thenThrow(new EntityNotFoundException("Task not found with id: " + id));

        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> controller.update(id, req));
        assertTrue(ex.getMessage().contains("Task not found with id"));
        verify(mockService).update(id, req);
    }
}

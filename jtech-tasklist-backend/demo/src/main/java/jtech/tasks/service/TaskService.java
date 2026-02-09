package jtech.tasks.service;

import jakarta.persistence.EntityNotFoundException;
import jtech.tasks.domain.Task;
import jtech.tasks.domain.TaskStatus;
import jtech.tasks.dto.TaskFilterRequest;
import jtech.tasks.dto.TaskRequest;
import jtech.tasks.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;


@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Transactional
    public Task create(TaskRequest request) {
        Task task = new Task();

        task.setTitle(request.title());
        task.setDescription(request.description());

        TaskStatus status = request.status() == null || request.status().isBlank() ? TaskStatus.PENDING : TaskStatus.valueOf(request.status().toUpperCase());

        task.setStatus(status);

        return taskRepository.save(task);
    }

    @Transactional
    public Task update(Long id, TaskRequest request) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));

        task.setTitle(request.title());
        task.setDescription(request.description());

        TaskStatus status = request.status() == null || request.status().isBlank() ? TaskStatus.PENDING : TaskStatus.valueOf(request.status().toUpperCase());

        task.setStatus(status);

        return taskRepository.save(task);
    }

    @Transactional
    public void delete(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));
        task.setDeleted(true);
        taskRepository.save(task);
    }

    @Transactional(readOnly = true)
    public Page<Task> findAll(TaskFilterRequest filterRequest) {
        if (ObjectUtils.isEmpty(filterRequest.status())) {
            return taskRepository.findAll(filterRequest.pageable());
        }
        return taskRepository.findAllByStatusIs(filterRequest.pageable(), filterRequest.status());
    }

    @Transactional(readOnly = true)
    public Task findById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));
    }


}


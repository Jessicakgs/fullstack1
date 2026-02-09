package jtech.tasks.controller;

import jakarta.validation.Valid;
import jtech.tasks.domain.Task;
import jtech.tasks.dto.TaskFilterRequest;
import jtech.tasks.dto.TaskRequest;
import jtech.tasks.dto.TaskResponse;
import jtech.tasks.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;


    @PostMapping
    public ResponseEntity<TaskResponse> create(@RequestBody @Valid TaskRequest request) {
        Task task = taskService.create(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(TaskResponse.from(task));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> update(@PathVariable Long id, @RequestBody @Valid TaskRequest request) {
        Task task = taskService.update(id, request);
        return ResponseEntity.ok(TaskResponse.from(task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/search")
    public ResponseEntity<Page<TaskResponse>> findAll(@RequestBody TaskFilterRequest filterRequest) {
        Page<Task> tasks = taskService.findAll(filterRequest);
        Page<TaskResponse> response = tasks.map(TaskResponse::from);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> findById(@PathVariable Long id) {
        Task task = taskService.findById(id);
        return ResponseEntity.ok(TaskResponse.from(task));
    }


}

package jtech.tasks.repository;

import jtech.tasks.domain.Task;
import jtech.tasks.domain.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {


    Page<Task> findByStatusAndDeletedFalse(TaskStatus status, Pageable pageable);

    @Query("SELECT t FROM Task t WHERE t.deleted = false")
    Page<Task> findAllByDeletedFalse(Pageable pageable);

}

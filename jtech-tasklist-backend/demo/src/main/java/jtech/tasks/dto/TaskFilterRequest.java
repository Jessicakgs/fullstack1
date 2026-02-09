package jtech.tasks.dto;

import jtech.tasks.domain.TaskStatus;
import org.springframework.data.domain.Pageable;

public record TaskFilterRequest(
        TaskStatus status, Pageable pageable
) {
}

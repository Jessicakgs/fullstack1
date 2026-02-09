package jtech.tasks.dto;

import jtech.tasks.domain.TaskStatus;

public record TaskFilterRequest(
        TaskStatus status, Integer pageSize, Integer pageNumber, String sort, String sortColumn, String q
) {
}

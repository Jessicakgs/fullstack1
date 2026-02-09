package jtech.tasks.dto;

import jakarta.validation.constraints.NotBlank;
import jtech.tasks.domain.TaskStatus;

public record TaskRequest(
        @NotBlank(message = "The title is mandatory.")
        String title,

        String description,

        TaskStatus status
) {}

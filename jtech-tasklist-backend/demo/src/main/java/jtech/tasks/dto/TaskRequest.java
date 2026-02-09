package jtech.tasks.dto;

import jakarta.validation.constraints.NotBlank;

public record TaskRequest(
        @NotBlank(message = "The title is mandatory.")
        String title,

        String description,

        String status
) {}

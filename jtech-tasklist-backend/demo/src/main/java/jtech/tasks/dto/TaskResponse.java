    package jtech.tasks.dto;

    import jtech.tasks.domain.Task;

    public record TaskResponse(Long id, String title, String description, String status) {
        public static TaskResponse from(Task task) {
            return new TaskResponse(
                    task.getId(),
                    task.getTitle(),
                    task.getDescription(),
                    task.getStatus().name()
            );
        }
    }

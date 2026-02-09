import { Box, Typography } from "@mui/material";

const TaskItemComponent: React.FC<{
  task: any;
  onClick: (t: any) => void;
}> = ({ task, onClick }) => {
  return (
    <Box
      onClick={() => onClick(task)}
      sx={{
        width: "100%",
        minHeight: 100,
        border: 1,
        padding: 2,
        borderRadius: 2,
        mb: 1,
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        cursor: "pointer",
        "&:hover": { backgroundColor: "action.hover" },
      }}
      role="button"
      tabIndex={0}
      aria-label={`Tarefa ${task.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick(task);
      }}
    >
      <Typography fontWeight={700} fontSize={18}>
        {task.title}
      </Typography>
      <Typography color="text.secondary" component="span">
        {task.description}
      </Typography>
      <Typography component="span">{task.status}</Typography>
    </Box>
  );
};

export default TaskItemComponent;

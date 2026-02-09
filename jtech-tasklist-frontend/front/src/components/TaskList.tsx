import { Box, Typography } from "@mui/material";
import TaskItemComponent from "./TaskItem";

const TaskList: React.FC<{
  tasks: any[];
  onTaskClick: (t: any) => void;
}> = ({ tasks, onTaskClick }) => {
  if (tasks.length === 0)
    return (
      <Typography color="text.secondary">Nenhuma tarefa encontrada.</Typography>
    );

  return (
    <Box width="100%" mt={1} role="list" aria-label="Lista de tarefas">
      {tasks.map((task) => (
        <TaskItemComponent key={task.id} task={task} onClick={onTaskClick} />
      ))}
    </Box>
  );
};

export default TaskList;

import { useMemo, useState } from "react";
import {
  Box,
  OutlinedInput,
  Select,
  Typography,
  MenuItem,
  Button,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "Completed" | "In Progress";
};

function TaskItem({ task }: { task: Task }) {
  return (
    <Box
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
      }}
      role="listitem"
      aria-label={`Tarefa ${task.title}`}
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
}

export default function App() {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: "Comprar suprimentos",
      description: "Canetas e papel",
      status: "Pending",
    },
    {
      id: 2,
      title: "Enviar relatório",
      description: "Relatório mensal",
      status: "Completed",
    },
    {
      id: 3,
      title: "Reunião com equipe",
      description: "Planejamento Q2",
      status: "In Progress",
    },
  ]);

  const [filter, setFilter] = useState<"all" | "completed" | "uncompleted">(
    "all",
  );
  const [query, setQuery] = useState("");

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      if (filter === "completed" && t.status !== "Completed") return false;
      if (filter === "uncompleted" && t.status === "Completed") return false;

      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q)
      );
    });
  }, [tasks, filter, query]);

  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        p: 4,
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box>
        <Typography variant="h1" sx={{ fontSize: 30, fontWeight: "bold" }}>
          Tasks
        </Typography>
        <Typography sx={{ fontSize: 20 }}>
          {tasks.length} tasks - {completedCount} completed
        </Typography>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
      >
        <OutlinedInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks..."
          aria-label="Pesquisar tarefas"
          sx={{ height: 40, minWidth: 280, flex: 1 }}
          startAdornment={
            <InputAdornment position="start" sx={{ ml: 0.5 }}>
              <SearchIcon aria-hidden />
            </InputAdornment>
          }
          endAdornment={
            query ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Limpar pesquisa"
                  onClick={() => setQuery("")}
                  edge="end"
                  size="small"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : undefined
          }
        />

        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          sx={{ height: 40, minWidth: 160 }}
          inputProps={{ "aria-label": "Filtrar tarefas" }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="uncompleted">Uncompleted</MenuItem>
        </Select>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            height: 40,
            backgroundColor: "black",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.85)" },
          }}
          aria-label="Criar nova tarefa"
          onClick={() => {
            alert(
              "Abrir modal de nova tarefa (implemente conforme sua necessidade)",
            );
          }}
        >
          New Task
        </Button>
      </Stack>

      <Box width="100%" mt={1} role="list" aria-label="Lista de tarefas">
        {filteredTasks.length === 0 ? (
          <Typography color="text.secondary">
            Nenhuma tarefa encontrada.
          </Typography>
        ) : (
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </Box>
    </Box>
  );
}

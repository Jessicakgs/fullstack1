import { useCallback, useMemo, useState } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterSelect from "./components/FilterSelect";
import NewTaskButton from "./components/NewTaskButton";
import TaskList from "./components/TaskList";
import NewTaskDialog from "./components/NewTaskDialog";
import TaskDetailsDrawer from "./components/TaskDetailsDrawer";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "Completed" | "In Progress";
};

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
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

  const [filter, setFilter] = useState<any>("all");
  const [query, setQuery] = useState("");

  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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

  const openNewTaskModal = useCallback(() => setIsNewTaskOpen(true), []);
  const closeNewTaskModal = useCallback(() => setIsNewTaskOpen(false), []);

  const handleSaveNewTask = useCallback(
    (taskData: Omit<Task, "id">) => {
      const nextId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
      const newTask: Task = { id: nextId, ...taskData };
      setTasks((prev) => [newTask, ...prev]);
      setIsNewTaskOpen(false);
    },
    [tasks],
  );

  const handleTaskClick = useCallback(
    (task: Task) => setSelectedTask(task),
    [],
  );
  const closeDrawer = useCallback(() => setSelectedTask(null), []);

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
      <Header total={tasks.length} completed={completedCount} />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
      >
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onClear={() => setQuery("")}
        />
        <FilterSelect value={filter} onChange={setFilter} />
        <NewTaskButton onClick={openNewTaskModal} />
      </Stack>

      <TaskList tasks={filteredTasks} onTaskClick={handleTaskClick} />

      <NewTaskDialog
        open={isNewTaskOpen}
        onClose={closeNewTaskModal}
        onSave={handleSaveNewTask}
      />

      <TaskDetailsDrawer task={selectedTask} onClose={closeDrawer} />
    </Box>
  );
};

export default App;

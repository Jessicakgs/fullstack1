import { useCallback, useMemo, useState } from "react";
import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterSelect from "./components/FilterSelect";
import NewTaskButton from "./components/NewTaskButton";
import TaskList from "./components/TaskList";
import NewTaskDialog from "./components/NewTaskDialog";
import TaskDetailsDrawer from "./components/TaskDetailsDrawer";

import { useTasks, useCreateTask, type TaskResponse } from "./hooks/useTasks";
type UiTask = {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "Completed" | "In Progress";
};

export const App: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<UiTask | null>(null);

  const {
    data: tasksPage,
    isLoading,
    isError,
  } = useTasks({
    title: query || undefined,
    pageNumber: 0,
    pageSize: 10,
    status:
      filter === "all"
        ? undefined
        : filter === "completed"
          ? "COMPLETED"
          : "PENDING",
  });

  const { mutate: createTask } = useCreateTask();

  const mappedTasks: any[] = useMemo(() => {
    if (!tasksPage?.content) return [];

    return tasksPage.content.map((t: TaskResponse) => ({
      id: t.id,
      title: t.title,
      description: t.description || "",
      status: t.status,
    }));
  }, [tasksPage]);

  const completedCount = mappedTasks.filter(
    (t) => t.status === "COMPLETED",
  ).length;
  const totalCount = tasksPage?.totalElements || 0;

  const openNewTaskModal = useCallback(() => setIsNewTaskOpen(true), []);
  const closeNewTaskModal = useCallback(() => setIsNewTaskOpen(false), []);

  const handleSaveNewTask = useCallback(
    (taskData: any) => {
      createTask(
        {
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
        },
        {
          onSuccess: () => {
            setIsNewTaskOpen(false);
          },
        },
      );
    },
    [createTask],
  );

  const handleTaskClick = useCallback(
    (task: UiTask) => setSelectedTask(task),
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
      <Header total={totalCount} completed={completedCount} />

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

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="error">Erro ao carregar tarefas.</Typography>
      ) : (
        <TaskList tasks={mappedTasks} onTaskClick={handleTaskClick} />
      )}

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

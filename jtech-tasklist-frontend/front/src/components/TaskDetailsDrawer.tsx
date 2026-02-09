import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TaskDetailsDrawer: React.FC<{
  task: any | null;
  onClose: () => void;
}> = ({ task, onClose }) => (
  <Drawer anchor="right" open={Boolean(task)} onClose={onClose}>
    <Box
      sx={{
        width: { xs: 320, sm: 420 },
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Detalhes da Tarefa</Typography>
        <IconButton aria-label="Fechar" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ my: 2 }} />

      {task ? (
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <Typography fontWeight={700} fontSize={18} gutterBottom>
            {task.title}
          </Typography>
          <Typography color="text.secondary" paragraph>
            {task.description}
          </Typography>

          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            Status
          </Typography>
          <Typography>{task.status}</Typography>
        </Box>
      ) : (
        <Typography color="text.secondary">
          Nenhuma tarefa selecionada.
        </Typography>
      )}

      <Box sx={{ mt: 2, display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <Button onClick={onClose}>Fechar</Button>
      </Box>
    </Box>
  </Drawer>
);

export default TaskDetailsDrawer;

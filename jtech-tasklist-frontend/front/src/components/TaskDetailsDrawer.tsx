import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

import { useUpdateTask, useDeleteTask } from "../hooks/useTasks";

const TaskDetailsDrawer: React.FC<{
  task: any | null;
  onClose: () => void;
}> = ({ task, onClose }) => {
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    status: "",
  });

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "TODO",
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (task) {
      updateTaskMutation.mutate(
        { id: task.id, data: formData },
        {
          onSuccess: () => {},
        },
      );
    }
  };

  const handleDelete = () => {
    if (task) {
      deleteTaskMutation.mutate(task.id, {
        onSuccess: () => {
          setOpenDeleteConfirm(false);
          onClose();
        },
      });
    }
  };

  const isLoading =
    updateTaskMutation.isPending || deleteTaskMutation.isPending;

  return (
    <>
      <Drawer anchor="right" open={Boolean(task)} onClose={onClose}>
        <Box
          sx={{
            width: { xs: 320, sm: 420 },
            p: 3,
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
            <Typography variant="h6">Editar Tarefa</Typography>
            <IconButton
              aria-label="Fechar"
              onClick={onClose}
              disabled={isLoading}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          {task ? (
            <Box
              component="form"
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 2,
              }}
            >
              <TextField
                label="Título"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                disabled={isLoading}
              />

              <TextField
                label="Descrição"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                disabled={isLoading}
              />

              <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                disabled={isLoading}
              >
                <MenuItem value="PENDING">Pendente</MenuItem>
                <MenuItem value="COMPLETED">Concluído</MenuItem>
              </TextField>
            </Box>
          ) : (
            <Typography color="text.secondary">
              Nenhuma tarefa selecionada.
            </Typography>
          )}

          <Box
            sx={{
              mt: 3,
              display: "flex",
              gap: 1,
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setOpenDeleteConfirm(true)}
              disabled={isLoading}
            >
              Deletar
            </Button>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button onClick={onClose} disabled={isLoading}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                startIcon={
                  updateTaskMutation.isPending ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SaveIcon />
                  )
                }
                disabled={isLoading}
              >
                {updateTaskMutation.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>

      <Dialog
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmar exclusão?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir a tarefa{" "}
            <strong>{task?.title}</strong>? Essa ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteConfirm(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            autoFocus
            disabled={isLoading}
            startIcon={
              deleteTaskMutation.isPending ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
          >
            {deleteTaskMutation.isPending ? "Deletando..." : "Confirmar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskDetailsDrawer;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const NewTaskDialog: React.FC<{
  open: boolean;
  initial?: Partial<any>;
  onClose: () => void;
  onSave: (task: Omit<any, "id">) => void;
}> = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<any["status"]>("Pending");

  React.useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
      setStatus("Pending");
    }
  }, [open]);

  const handleSave = () => {
    if (!title.trim()) {
      alert("Preencha o título da tarefa.");
      return;
    }
    onSave({ title: title.trim(), description: description.trim(), status });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="new-task-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="new-task-title">Nova Tarefa</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            autoFocus
          />
          <TextField
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as any["status"])}
            fullWidth
            inputProps={{ "aria-label": "Status da tarefa" }}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTaskDialog;

import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

const NewTaskButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Button
    variant="contained"
    startIcon={<AddIcon />}
    sx={{
      height: 40,
      backgroundColor: "black",
      "&:hover": { backgroundColor: "rgba(0,0,0,0.85)" },
    }}
    aria-label="Criar nova tarefa"
    onClick={onClick}
  >
    New Task
  </Button>
);

export default NewTaskButton;

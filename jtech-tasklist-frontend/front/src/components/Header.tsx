import { Box, Typography } from "@mui/material";

const Header: React.FC<{ total: number; completed: number }> = ({
  total,
  completed,
}) => (
  <Box>
    <Typography variant="h1" sx={{ fontSize: 30, fontWeight: "bold" }}>
      Tasks
    </Typography>
    <Typography sx={{ fontSize: 20 }}>
      {total} tasks - {completed} completed
    </Typography>
  </Box>
);

export default Header;

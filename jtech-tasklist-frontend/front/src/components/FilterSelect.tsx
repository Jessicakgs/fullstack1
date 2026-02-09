import { MenuItem, Select } from "@mui/material";

const FilterSelect: React.FC<{
  value: any;
  onChange: (f: any) => void;
}> = ({ value, onChange }) => (
  <Select
    value={value}
    onChange={(e) => onChange(e.target.value as any)}
    sx={{ height: 40, minWidth: 160 }}
    inputProps={{ "aria-label": "Filtrar tarefas" }}
  >
    <MenuItem value="all">All</MenuItem>
    <MenuItem value="completed">Completed</MenuItem>
    <MenuItem value="uncompleted">Uncompleted</MenuItem>
  </Select>
);

export default FilterSelect;

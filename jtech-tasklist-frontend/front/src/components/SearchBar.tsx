import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar: React.FC<{
  query: string;
  onQueryChange: (q: string) => void;
  onClear: () => void;
}> = ({ query, onQueryChange, onClear }) => (
  <OutlinedInput
    value={query}
    onChange={(e) => onQueryChange(e.target.value)}
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
            onClick={onClear}
            edge="end"
            size="small"
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </InputAdornment>
      ) : undefined
    }
  />
);

export default SearchBar;

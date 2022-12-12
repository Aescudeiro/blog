import { FC } from 'react';
import { Container, StyledInputBase, SearchIconWrapper } from './styles';
import SearchIcon from '@mui/icons-material/Search';

export const Search: FC = () => {
  return (
    <Container>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Container>
  );
};

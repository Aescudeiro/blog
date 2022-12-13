import { FC, useEffect, useState } from 'react';
import { Container, SearchIconWrapper, StyledTextField } from './styles';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchContentsQuery } from '../../../../gql/graphql';
import { Autocomplete, Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ModeCommentOutlined } from '@mui/icons-material';

type Content = {
  id: any;
  title: string;
  body: string;
  ownerId: string;
  ancestorTitle: string;
};

export const Search: FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>('');
  const [value, setValue] = useState<Content | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<readonly Content[]>([]);
  const { isFetching, isRefetching } = useSearchContentsQuery(
    {
      search: inputValue,
    },
    {
      enabled: inputValue.length > 0,
      onSuccess(data) {
        const contents: Content[] = data.searchcontents.map((content) => ({
          id: content.id,
          title: content.title ?? '',
          body: content.body ?? '',
          ownerId: content.ownerId,
          ancestorTitle: content.ancestor?.title ?? '',
        }));

        setOptions(contents);
        setIsOpen(true);
      },
    }
  );

  const handleClickContent = (content: Content) => {
    navigate(`/${content.ownerId}/${content.id}`);
    setIsOpen(false);
    setValue(null);
    setInputValue('');
    setOptions([]);
  };

  useEffect(() => {
    if (!isOpen) {
      setOptions([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!inputValue) {
      setIsOpen(false);
      setOptions([]);
    }
  }, [inputValue]);

  return (
    <Container>
      <Autocomplete
        getOptionLabel={(option) => option.title ?? option.body}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        open={isOpen}
        value={value}
        loading={isFetching || isRefetching}
        onChange={(_event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            placeholder="Search…"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  {params.InputProps.startAdornment}
                </>
              ),

              endAdornment: (
                <>
                  {isFetching || isRefetching ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),

              sx: {
                '& .MuiAutocomplete-input:first-of-type': {
                  paddingLeft: '40px',
                },
              },
            }}
          />
        )}
        renderOption={(_props, option) => (
          <Box
            key={option.id}
            sx={{ p: 1, cursor: 'pointer' }}
            onClick={() => handleClickContent(option)}
          >
            {option.title ? (
              <Box
                sx={{
                  p: 0.5,
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#00000012' },
                }}
              >
                <Typography component="span">{option.title}</Typography>
              </Box>
            ) : (
              <Box
                sx={{ fontWeight: 'bold' }}
                display="flex"
                alignItems="center"
              >
                <ModeCommentOutlined
                  sx={{ mr: 1, width: '16px', height: '16px' }}
                />
                <Typography
                  component="span"
                  fontStyle="italic"
                  marginRight={0.5}
                >
                  "{option.body.slice(0, 50)}..."
                </Typography>
                <Typography component="span" marginRight={0.5}>
                  In reply to
                </Typography>
                <Typography component="span">{option.ancestorTitle}</Typography>
              </Box>
            )}
          </Box>
        )}
      />
    </Container>
  );
};

import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

export const UpVotes: FC = () => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box display="flex" flexDirection="column" alignItems="center">
        <IconButton>
          <KeyboardArrowUpOutlinedIcon />
        </IconButton>
        <Typography variant="body2" component="span">
          0
        </Typography>
        <IconButton>
          <KeyboardArrowDownOutlinedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          borderWidth: '0 1px 0 0',
          borderStyle: 'dotted',
          borderColor: 'black',
          width: '50%',
          height: '100%',
        }}
      />
    </Box>
  );
};

import { Box, SxProps, Theme } from '@mui/material';
import { FC } from 'react';

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
  sx?: SxProps<Theme>;
}

export const TabPanel: FC<Props> = ({
  children,
  value,
  index,
  sx,
  ...other
}) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      sx={{
        overflow: 'auto',
        borderBottomLeftRadius: '6px',
        borderBottomRightRadius: '6px',
        ...sx,
      }}
    >
      {value === index && <Box sx={{ paddingTop: '8px' }}>{children}</Box>}
    </Box>
  );
};

import { styled, Box } from '@mui/material';

export const Container = styled(Box)({
  height: '100%',
  width: '100%',
  display: 'flex',
});

export const FormContainer = styled(Box)({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Image = styled(Box)({
  backgroundColor: 'black',
  backgroundImage: 'url(https://source.unsplash.com/random)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '50%',
});

export const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '70%',
});

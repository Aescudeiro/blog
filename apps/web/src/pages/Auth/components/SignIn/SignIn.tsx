import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useSignInEmailPassword } from '@nhost/react';
import { FC, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, FormContainer } from '../../styles';

export const SignIn: FC = () => {
  const [fields, setFields] = useState([
    {
      label: 'Email',
      type: 'email',
      value: '',
      name: 'email',
    },
    {
      label: 'Password',
      type: 'password',
      value: '',
      name: 'password',
      showPassword: false,
    },
  ]);
  const { signInEmailPassword, isLoading, isSuccess, isError, error } =
    useSignInEmailPassword();

  const handleFieldsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => {
      return prev.map((field) => {
        if (field.name === name) {
          return { ...field, value };
        }
        return field;
      });
    });
  };

  const handleClickShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFields((prev) => {
      return prev.map((field) => {
        if (field.name === 'password') {
          return {
            ...field,
            showPassword: !field.showPassword,
            type: field.showPassword ? 'password' : 'text',
          };
        }
        return field;
      });
    });
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setFields((prev) => {
      return prev.map((field) => {
        if (field.name === 'password') {
          return {
            ...field,
            showPassword: !field.showPassword,
            type: field.showPassword ? 'password' : 'text',
          };
        }
        return field;
      });
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [email, password] = fields;
    signInEmailPassword(email.value, password.value);
  };

  if (isSuccess) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <FormContainer>
      <Typography variant="h5" component="h1">
        Sign Up
      </Typography>
      <Form onSubmit={handleSubmit} autoComplete="off">
        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            value={field.value}
            onChange={handleFieldsChange}
            disabled={isLoading}
            margin="normal"
            InputProps={{
              endAdornment:
                field.name === 'password' ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {field.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : null,
            }}
          />
        ))}
        <Button
          type="submit"
          disabled={isLoading}
          variant="contained"
          sx={{ marginTop: '16px' }}
        >
          Sign In
        </Button>
        {isError ? <Typography>{error?.message}</Typography> : null}
      </Form>
      <Typography>
        Don't have an account?
        <Link to="/auth/sign-up"> Sign up</Link>
      </Typography>
    </FormContainer>
  );
};

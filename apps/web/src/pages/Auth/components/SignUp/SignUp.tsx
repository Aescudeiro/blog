import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useSignUpEmailPassword } from '@nhost/react';
import { FC, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, FormContainer } from '../../styles';

export const SignUp: FC = () => {
  const [fields, setFields] = useState([
    {
      label: 'First Name',
      type: 'text',
      value: '',
      name: 'firstName',
    },
    {
      label: 'Last Name',
      type: 'text',
      value: '',
      name: 'lastName',
    },
    {
      label: 'Username',
      type: 'text',
      value: '',
      name: 'username',
    },
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

  const { signUpEmailPassword, isSuccess, isLoading, isError, error } =
    useSignUpEmailPassword();

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
    const [firstName, lastName, username, email, password] = fields;

    signUpEmailPassword(email.value, password.value, {
      displayName: username.value,
      metadata: {
        firstName: firstName.value,
        lastName: lastName.value,
      },
    });
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
          variant="contained"
          disabled={isLoading}
          sx={{ marginTop: '16px' }}
        >
          Sign Up
        </Button>
        {isError ? <Typography>{error?.message}</Typography> : null}
      </Form>
      <Typography>
        Already have an account?
        <Link to="/auth/sign-in"> Sign in</Link>
      </Typography>
    </FormContainer>
  );
};

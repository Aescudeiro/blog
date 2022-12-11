import { FC, useState } from 'react';
import { useSignUpEmailPassword } from '@nhost/react';
import { Link, Navigate } from 'react-router-dom';
import { Form, FormContainer } from '../../styles';
import { Button, TextField, Typography } from '@mui/material';

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

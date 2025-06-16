import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { authService } from '../../services/auth';
import { useApiError } from '../../hooks/useApiError';
import { useLoading } from '../../hooks/useLoading';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Link,
  Alert,
} from '@mui/material';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: RegisterFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validate = (values: RegisterFormData) => {
  const errors: Partial<RegisterFormData> = {};

  if (!values.username) {
    errors.username = 'Username is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { error, handleError, clearError } = useApiError();
  const { loading, withLoading } = useLoading();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    initialValues,
    validate,
    onSubmit: async (values) => {
      try {
        clearError();
        await withLoading(authService.register(values));
        navigate('/login');
      } catch (err) {
        handleError(err);
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof RegisterFormData, value);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    handleBlur(name as keyof RegisterFormData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={values.username}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}; 
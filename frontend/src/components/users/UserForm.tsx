import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useApiError } from '../../hooks/useApiError';
import { useLoading } from '../../hooks/useLoading';
import { userService } from '../../services/user';
import type { User } from '../../types/user';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Container,
} from '@mui/material';

type UserFormData = Omit<User, 'id'>;

export const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { error, handleError, clearError } = useApiError();
  const { loading, withLoading } = useLoading();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useForm<UserFormData>({
    initialValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },
      },
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    },
    validate: (values) => {
      const errors: Partial<Record<keyof UserFormData, string>> = {};
      if (!values.name) errors.name = 'Name is required';
      if (!values.username) errors.username = 'Username is required';
      if (!values.email) errors.email = 'Email is required';
      if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: async (formData) => {
      try {
        clearError();
        if (id) {
          await withLoading(userService.update(parseInt(id), formData));
        } else {
          await withLoading(userService.create(formData));
        }
        navigate('/users');
      } catch (err) {
        handleError(err);
      }
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          clearError();
          const user = await withLoading(userService.getById(parseInt(id))) as User;
          resetForm();
          const userData: UserFormData = {
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            website: user.website,
            address: user.address,
            company: user.company,
          };
          Object.entries(userData).forEach(([key, value]) => {
            handleChange(key as keyof UserFormData, value);
          });
        } catch (err) {
          handleError(err);
        }
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? 'Edit User' : 'Create User'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={values.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={values.username}
                onChange={(e) => handleChange('username', e.target.value)}
                onBlur={() => handleBlur('username')}
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={values.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Website"
                name="website"
                value={values.website}
                onChange={(e) => handleChange('website', e.target.value)}
                onBlur={() => handleBlur('website')}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Street"
                name="address.street"
                value={values.address.street}
                onChange={(e) => handleChange('address.street', e.target.value)}
                onBlur={() => handleBlur('address')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Suite"
                name="address.suite"
                value={values.address.suite}
                onChange={(e) => handleChange('address.suite', e.target.value)}
                onBlur={() => handleBlur('address')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="address.city"
                value={values.address.city}
                onChange={(e) => handleChange('address.city', e.target.value)}
                onBlur={() => handleBlur('address')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Zipcode"
                name="address.zipcode"
                value={values.address.zipcode}
                onChange={(e) => handleChange('address.zipcode', e.target.value)}
                onBlur={() => handleBlur('address')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Latitude"
                name="address.geo.lat"
                value={values.address.geo.lat}
                onChange={(e) => handleChange('address.geo.lat', e.target.value)}
                onBlur={() => handleBlur('address')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Longitude"
                name="address.geo.lng"
                value={values.address.geo.lng}
                onChange={(e) => handleChange('address.geo.lng', e.target.value)}
                onBlur={() => handleBlur('address')}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="company.name"
                value={values.company.name}
                onChange={(e) => handleChange('company.name', e.target.value)}
                onBlur={() => handleBlur('company')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Catch Phrase"
                name="company.catchPhrase"
                value={values.company.catchPhrase}
                onChange={(e) => handleChange('company.catchPhrase', e.target.value)}
                onBlur={() => handleBlur('company')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Business"
                name="company.bs"
                value={values.company.bs}
                onChange={(e) => handleChange('company.bs', e.target.value)}
                onBlur={() => handleBlur('company')}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" onClick={() => navigate('/users')}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  {id ? 'Update' : 'Create'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}; 
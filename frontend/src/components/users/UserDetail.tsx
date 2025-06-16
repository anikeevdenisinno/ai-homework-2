import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../../services/user';
import type { User } from '../../types/user';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Grid,
  Divider,
} from '@mui/material';

export function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!id) return;
        const data = await userService.getById(parseInt(id));
        setUser(data);
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (!user) return;
    try {
      await userService.delete(user.id);
      navigate('/users');
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Typography>User not found</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" component="h1">
            User Details
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/users/${user.id}/edit`)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography variant="body1">
              <strong>Username:</strong> {user.username}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {user.phone}
            </Typography>
            <Typography variant="body1">
              <strong>Website:</strong> {user.website}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Address
            </Typography>
            <Typography variant="body1">
              <strong>Street:</strong> {user.address.street}
            </Typography>
            <Typography variant="body1">
              <strong>Suite:</strong> {user.address.suite}
            </Typography>
            <Typography variant="body1">
              <strong>City:</strong> {user.address.city}
            </Typography>
            <Typography variant="body1">
              <strong>Zipcode:</strong> {user.address.zipcode}
            </Typography>
            <Typography variant="body1">
              <strong>Location:</strong> {user.address.geo.lat}, {user.address.geo.lng}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {user.company.name}
            </Typography>
            <Typography variant="body1">
              <strong>Catch Phrase:</strong> {user.company.catchPhrase}
            </Typography>
            <Typography variant="body1">
              <strong>Business:</strong> {user.company.bs}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 
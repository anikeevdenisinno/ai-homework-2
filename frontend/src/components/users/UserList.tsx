import { useEffect, useState } from 'react';
import { userService } from '../../services/user';
import type { User } from '../../types/user';
import {
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
  Paper,
  IconButton,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApiError } from '../../hooks/useApiError';
import { useLoading } from '../../hooks/useLoading';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

export const UserList = () => {
  const navigate = useNavigate();
  const { error, handleError, clearError } = useApiError();
  const { loading, withLoading } = useLoading();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      clearError();
      const data = await withLoading(userService.getAll());
      setUsers(data as User[]);
    } catch (err) {
      handleError(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      clearError();
      await withLoading(userService.delete(id));
      await fetchUsers();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Users
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/users/new')}
        >
          Add User
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {user.username}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {user.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {user.website}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}; 
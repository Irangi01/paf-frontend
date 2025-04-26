import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Typography,
  Box,
  Alert,
  Snackbar
} from '@mui/material';

export default function CommunityForm({ onSubmit, initialData }) {
  const navigate = useNavigate();
  const [community, setCommunity] = useState({
    id: '',
    groupName: '',
    description: '',
    coverImage: '',
    category: '',
    active: true,
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setCommunity(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommunity({ ...community, [name]: name === 'active' ? value === 'true' : value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';
    
    if (!value) {
      switch (name) {
        case 'groupName':
          error = 'Group name is required';
          break;
        case 'category':
          error = 'Category is required';
          break;
        case 'description':
          error = 'Description is required';
          break;
        default:
          break;
      }
    }
    
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(community);
      setOpenSnackbar(true);
      
      // Wait for 2 seconds before navigating
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
          {initialData?.id ? 'EDIT COMMUNITY' : 'CREATE COMMUNITY'}
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {initialData?.id && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ID"
                  name="id"
                  value={community.id}
                  onChange={handleChange}
                  required
                  disabled
                  size="small"
                />
              </Grid>
            )}
            
            {/* Group Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Group Name *"
                name="groupName"
                value={community.groupName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={!!errors.groupName}
                helperText={errors.groupName}
                size="small"
              />
            </Grid>
            
            {/* Category */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category *"
                name="category"
                value={community.category}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={!!errors.category}
                helperText={errors.category}
                size="small"
              />
            </Grid>
            
            {/* Status */}
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Status *</InputLabel>
                <Select
                  name="active"
                  value={community.active.toString()}
                  label="Status *"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {/* Cover Image URL */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cover Image URL"
                name="coverImage"
                value={community.coverImage}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            
            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description *"
                name="description"
                value={community.description}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={4}
                size="small"
              />
            </Grid>
            
            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button 
                type="submit" 
                variant="contained" 
                size="medium"
                disabled={isSubmitting}
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Success Alert */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {initialData?.id ? 'Community updated successfully!' : 'Community created successfully!'}
        </Alert>
      </Snackbar>
    </Box>
  );
}
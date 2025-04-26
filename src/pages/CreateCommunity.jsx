import { Container, Typography } from '@mui/material';
import { createCommunity, updateCommunity } from '../services/communityService';
import { useNavigate, useLocation } from 'react-router-dom';
import CommunityForm from '../components/CommunityFrom';

export default function CreateCommunity({ setCommunities, showAlert }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = location.state?.editCommunity;
  const communityToEdit = location.state?.editCommunity;

  const handleSubmit = async (communityData) => {
    try {
      if (isEditMode) {
        // Update existing community
        const updatedCommunity = await updateCommunity({
          ...communityData,
          id: communityToEdit.id
        });
        setCommunities(prev => prev.map(c => 
          c.id === updatedCommunity.id ? updatedCommunity : c
        ));
        showAlert('Community updated successfully!');
      } else {
        // Create new community
        const createdCommunity = await createCommunity(communityData);
        setCommunities(prev => [...prev, createdCommunity]);
        showAlert('Community created successfully!');
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving community:', error);
      showAlert(error.response?.data?.message || 
               `Failed to ${isEditMode ? 'update' : 'create'} community`, 
               'error');
    }
  };

  return (
    <Container maxWidth="md">
        <br></br>
      <Typography 
        variant="h5" 
        component="div" 
        sx={{ 
          flexGrow: 1,
          fontFamily: '"Roboto Condensed", sans-serif',
          fontWeight: 700,
          letterSpacing: 1,
          color: 'text.primary'
        }}>
        {isEditMode ? 'EDIT COMMUNITY' : 'CREATE NEW COMMUNITY'}
      </Typography>
      <CommunityForm 
        onSubmit={handleSubmit} 
        initialData={communityToEdit}
      />
    </Container>
  );
}
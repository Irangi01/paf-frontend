import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField,
  Alert,
  CircularProgress,
  Snackbar,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CommunityTable from './CommunityTable';
import { 
  getAllCommunities,
  getCommunitiesByActiveState,
  deleteCommunity
} from '../services/communityService';

export default function CommunityList() {
  const [communities, setCommunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCommunities();
  }, [activeFilter]);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (activeFilter === 'ACTIVE') {
        data = await getCommunitiesByActiveState(true);
      } else if (activeFilter === 'INACTIVE') {
        data = await getCommunitiesByActiveState(false);
      } else {
        data = await getAllCommunities();
      }
      
      setCommunities(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching communities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCommunity(id);
      setCommunities(prev => prev.filter(c => c.id !== id));
      setSuccess('Community deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (community) => {
    navigate('/create-community', { state: { editCommunity: community } });
  };

  const filteredCommunities = communities.filter(community =>
    community.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = () => {
    fetchCommunities();
  };

  const handleDownload = () => {
    const csvContent = [
      ['ID', 'Group Name', 'Category', 'Status'].join(',')
    ];
    
    communities.forEach(community => {
      csvContent.push([
        community.id,
        community.groupName,
        community.category,
        community.active ? 'Active' : 'Inactive'
      ].join(','));
    });

    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'communities.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            letterSpacing: 1,
            color: 'text.primary'
          }}
        >
          COMMUNITY MANAGEMENT
        </Typography>
      <br />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>

      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          label="Search communities..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 2 }}
        />
        
        <Box sx={{ display: 'flex', gap: 1, flex: 1, minWidth: { sm: '300px' } }}>
          <TextField
            select
            label="Status"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            SelectProps={{ native: true }}
            fullWidth
            variant="outlined"
          >
            <option value="ALL">All Communities</option>
            <option value="ACTIVE">Active Only</option>
            <option value="INACTIVE">Inactive Only</option>
          </TextField>
          <Button variant="outlined" onClick={handleRefresh} sx={{ whiteSpace: 'nowrap' }}>
            Refresh
          </Button>
          {/* <Button variant="contained" onClick={handleDownload} sx={{ whiteSpace: 'nowrap' }}>
            Download
          </Button> */}
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <CommunityTable 
            communities={filteredCommunities} 
            onDelete={handleDelete}
            onRefresh={handleRefresh}
            onEdit={handleEdit}
          />
          {filteredCommunities.length === 0 && !loading && (
            <Alert severity="info" sx={{ mt: 2 }}>
              No communities found {searchTerm ? 'matching your search' : ''}
            </Alert>
          )}
        </>
      )}
    </Box>
  );
}
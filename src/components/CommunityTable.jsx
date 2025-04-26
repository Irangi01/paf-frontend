import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Chip,
    IconButton,
    Tooltip,
    Modal,
    Box,
    Typography,
    Divider,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
  } from '@mui/material';
  import { 
    Edit as EditIcon, 
    Delete as DeleteIcon, 
    Visibility as ViewIcon,
    Refresh as RefreshIcon,
    Close as CloseIcon,
    Warning as WarningIcon
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: '80vh',
    overflowY: 'auto'
  };
  
  const detailItemStyle = {
    mb: 2,
    p: 2,
    borderRadius: 1,
    backgroundColor: 'background.default',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.05)'
  };
  
  export default function CommunityTable({ communities, onDelete, onRefresh, onEdit }) {
    const [open, setOpen] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [communityToDelete, setCommunityToDelete] = useState(null);
  
    const handleView = (community) => {
      setSelectedCommunity(community);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedCommunity(null);
    };
  
    const handleDeleteClick = (communityId) => {
      setCommunityToDelete(communityId);
      setDeleteDialogOpen(true);
    };
  
    const handleDeleteConfirm = () => {
      onDelete(communityToDelete);
      setDeleteDialogOpen(false);
      setCommunityToDelete(null);
    };
  
    const handleDeleteCancel = () => {
      setDeleteDialogOpen(false);
      setCommunityToDelete(null);
    };
  
    return (
      <>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>GROUP NAME</TableCell>
                <TableCell>CATEGORY</TableCell>
                <TableCell>DESCRIPTION</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>
                  ACTIONS
                  <Tooltip title="Refresh">
                    <IconButton 
                      aria-label="refresh" 
                      size="small" 
                      onClick={onRefresh}
                      sx={{ ml: 1 }}
                    >
                      <RefreshIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {communities.map((community) => (
                <TableRow key={community.id} hover>
                  <TableCell>{community.id}</TableCell>
                  <TableCell>{community.groupName}</TableCell>
                  <TableCell>{community.category}</TableCell>
                  <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {community.description}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={community.active ? 'Active' : 'Inactive'}
                      color={community.active ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View">
                      <IconButton 
                        aria-label="view" 
                        size="small"
                        onClick={() => handleView(community)}
                      >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton 
                        aria-label="edit" 
                        size="small"
                        onClick={() => onEdit(community)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton 
                        aria-label="delete" 
                        size="small"
                        onClick={() => handleDeleteClick(community.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            sx: {
              borderRadius: '12px',
              padding: '16px',
              minWidth: '400px'
            }
          }}
        >
          <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon color="warning" sx={{ fontSize: '2rem', mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Confirm Deletion
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{ color: 'text.primary', fontSize: '1rem' }}>
              Are you sure you want to delete this community?
            </DialogContentText>
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              This action cannot be undone. All associated data will be permanently removed.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ padding: '16px 24px', justifyContent: 'space-between' }}>
            <Button 
              onClick={handleDeleteCancel} 
              variant="outlined" 
              sx={{
                borderRadius: '8px',
                padding: '8px 16px',
                textTransform: 'none',
                minWidth: '120px'
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteConfirm} 
              variant="contained" 
              color="error"
              sx={{
                borderRadius: '8px',
                padding: '8px 16px',
                textTransform: 'none',
                minWidth: '120px',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'error.dark',
                  boxShadow: 'none'
                }
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
  
        {/* View Community Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="view-community-modal"
          aria-describedby="view-community-details"
        >
          <Box sx={modalStyle}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3,
              pb: 2,
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                Community Details
              </Typography>
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
  
            {selectedCommunity && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={detailItemStyle}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      ID
                    </Typography>
                    <Typography variant="body1">
                      {selectedCommunity.id}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={detailItemStyle}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Group Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {selectedCommunity.groupName}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={detailItemStyle}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Category
                    </Typography>
                    <Typography variant="body1">
                      {selectedCommunity.category}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={detailItemStyle}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Status
                    </Typography>
                    <Chip 
                      label={selectedCommunity.active ? 'Active' : 'Inactive'} 
                      color={selectedCommunity.active ? 'success' : 'error'} 
                      size="small"
                    />
                  </Box>
                </Grid>
                
                {selectedCommunity.coverImage && (
                  <Grid item xs={12}>
                    <Box sx={detailItemStyle}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Cover Image URL
                      </Typography>
                      <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                        {selectedCommunity.coverImage}
                      </Typography>
                    </Box>
                  </Grid>
                )}
                
                <Grid item xs={12}>
                  <Box sx={detailItemStyle}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Description
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                      {selectedCommunity.description}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>
        </Modal>
      </>
    );
  }
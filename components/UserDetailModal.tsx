import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, IconButton, Grid, Avatar, Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { User } from '../redux/slices/userSlice';

interface UserDetailModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  user, open, onClose, onEdit, onDelete
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Employer Detail
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: '8px', top: '8px' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {user && (
          <Grid container direction="column" alignItems="center">
            <Avatar
              alt={user.name}
              src={`https://picsum.photos/id/${user.id}/200/200`}
              sx={{ marginBottom: '10px', width: '200px', height: '200px' }}
            />
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Website: {user.website}</p>
            </div>
          </Grid>
        )}
        <Grid container justifyContent="space-between" sx={{ marginTop: '20px' }}>
          <Button onClick={onEdit} startIcon={<EditIcon />}>Edit</Button>
          <Button onClick={onDelete} startIcon={<DeleteIcon />}>Delete</Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailModal;

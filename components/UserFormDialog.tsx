import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { User } from '../redux/slices/userSlice';

interface UserFormDialogProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  isEdit: boolean;
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({
  open, user, onClose, onChange, onSave, isEdit
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isEdit ? 'Edit User' : 'Add User'}
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
          <div>
            <TextField
              fullWidth
              label="Name"
              type='text'
              value={user.name}
              onChange={onChange}
              name="name"
              sx={{ marginBottom: '10px' }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={user.email}
              onChange={onChange}
              name="email"
              sx={{ marginBottom: '10px' }}
            />
            <TextField
              fullWidth
              label="Phone"
              type="tel"
              value={user.phone}
              onChange={onChange}
              name="phone"
              sx={{ marginBottom: '10px' }}
            />
            <TextField
              fullWidth
              label="Website"
              type="url"
              value={user.website}
              onChange={onChange}
              name="website"
              sx={{ marginBottom: '10px' }}
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          {isEdit ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;

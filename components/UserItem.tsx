import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { User } from '../redux/slices/userSlice';

interface UserItemProps {
  user: User;
  onClick: () => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onClick }) => {
  return (
    <ListItem key={user.id} sx={{ borderBottom: '1px solid #ccc' }} onClick={onClick}>
      <ListItemAvatar>
        <Avatar
          alt={user.name}
          src={`https://picsum.photos/id/${user.id}/300/300`}
        />
      </ListItemAvatar>
      <ListItemText
        primary={user.name}
        secondary={user.email}
        sx={{ cursor: 'pointer', paddingRight: '10px' }}
      />
    </ListItem>
  );
};

export default UserItem;

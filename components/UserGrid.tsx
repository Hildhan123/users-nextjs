import React from 'react';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { User } from '../redux/slices/userSlice';

interface UserGridProps {
  users: User[];
  onUserClick: (user: User) => void;
}

const UserGrid: React.FC<UserGridProps> = ({ users, onUserClick }) => {
  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
          <Card onClick={() => onUserClick(user)}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={`https://picsum.photos/id/${user.id}/300/300`}
                alt={user.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {user.email}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserGrid;

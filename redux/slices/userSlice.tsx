import { createSlice } from '@reduxjs/toolkit';
import users from '../../DB/users.json';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: users,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    editUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;

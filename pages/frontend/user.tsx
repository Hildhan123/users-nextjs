import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, editUser, addUser } from '../../redux/slices/userSlice';
import { List, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { RootState } from '../../redux/store';
import UserItem from '../../components/UserItem';
import UserGrid from '../../components/UserGrid';
import UserDetailModal from '../../components/UserDetailModal';
import UserFormDialog from '../../components/UserFormDialog';
import DeleteConfirmationDialog from '../../components/DeleteConfirmation';
import AlertMessage from '../../components/AlertMessage';
import GridViewToggle from '../../components/GridViewToggle';

const User: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedUser, setEditedUser] = useState<any | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
    website: '',
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [isGrid, setIsGrid] = useState(false);
  const fabContainerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const handleAddUser = () => {
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUserWithId = { ...newUser, id: newId };
    dispatch(addUser(newUserWithId));
    setAddUserOpen(false);
    setNewUser({
      id: 0,
      name: '',
      email: '',
      phone: '',
      website: '',
    });
    setAlertMessage(`Employer ${newUser.name} added successfully`);
  };

  const handleDelete = (id: number) => {
    const deletedUser = users.find(user => user.id === id);
    dispatch(deleteUser(id));
    setDeleteConfirmationOpen(false);
    setOpenModal(false);
    setAlertMessage(`Employer ${deletedUser?.name} deleted successfully`);
  };

  const handleEdit = () => {
    setEditedUser(selectedUser);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    dispatch(editUser(editedUser));
    setOpenEditDialog(false);
    setOpenModal(false);
    setAlertMessage(`Employer ${editedUser.name} updated successfully`);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setOpenModal(false);
  };

  const handleEditDialogClose = () => {
    setEditedUser(null);
    setOpenEditDialog(false);
  };
  const resetAlertMessage = () => {
    setAlertMessage("");
  };

  return (
    <div>
      {alertMessage && <AlertMessage message={alertMessage} onClose={resetAlertMessage} />}
      <GridViewToggle isGrid={isGrid} onToggle={() => setIsGrid(!isGrid)} />
      {isGrid ? (
        <UserGrid users={users} onUserClick={(user) => {
          setSelectedUser(user);
          setOpenModal(true);
        }} />
      ) : (
        <List>
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onClick={() => {
              setSelectedUser(user);
              setOpenModal(true);
            }}
          />
        ))}
      </List>
      )}
      <div style={fabContainerStyle}>
        <Fab color="primary" aria-label="add" onClick={() => setAddUserOpen(true)}>
          <AddIcon />
        </Fab>
        {/* <GridViewToggle isGrid={isGrid} onToggle={() => setIsGrid(!isGrid)} /> */}
      </div>
      <UserFormDialog
        open={addUserOpen}
        user={newUser}
        onClose={() => setAddUserOpen(false)}
        onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })}
        onSave={handleAddUser}
        isEdit={false}
      />
      <UserDetailModal
        user={selectedUser}
        open={openModal}
        onClose={handleCloseModal}
        onEdit={handleEdit}
        onDelete={() => setDeleteConfirmationOpen(true)}
      />
      <UserFormDialog
        open={openEditDialog}
        user={editedUser}
        onClose={handleEditDialogClose}
        onChange={(e) => setEditedUser({ ...editedUser, [e.target.name]: e.target.value })}
        onSave={handleSaveEdit}
        isEdit={true}
      />
      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        onConfirm={() => handleDelete(selectedUser?.id)}
      />
    </div>
  );
};

export default User;

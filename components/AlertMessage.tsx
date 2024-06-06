import React, { useState } from 'react';
import { Alert } from '@mui/material';

interface Props {
  message: string;
  onClose: () => void;
}

const AlertMessage: React.FC<Props> = ({ message, onClose }) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => {
    setShowAlert(false);
    onClose();
  };

  return (
    <>
      {showAlert && <Alert severity="success" onClose={handleCloseAlert}>{message}</Alert>}
    </>
  );
};

export default AlertMessage;

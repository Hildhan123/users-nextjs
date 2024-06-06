import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { ViewModule, ViewList } from '@mui/icons-material';

interface GridViewToggleProps {
  isGrid: boolean;
  onToggle: () => void;
}

const GridViewToggle: React.FC<GridViewToggleProps> = ({ isGrid, onToggle }) => {
  return (
    <Tooltip title={isGrid ? 'Switch to List View' : 'Switch to Grid View'}>
      <IconButton onClick={onToggle}>
        {isGrid ? <ViewList /> : <ViewModule />}
      </IconButton>
    </Tooltip>
  );
};

export default GridViewToggle;

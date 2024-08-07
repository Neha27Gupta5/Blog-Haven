import React, { useState } from 'react';
import { Button, Menu, MenuItem, useMediaQuery } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/system';

const ButtonStyled = styled(Button)(({ theme, isBigScreen }) => ({
  color: 'white',
  fontSize: '1rem',
  fontWeight: 300,
  border: isBigScreen ? '1px solid rgba(255, 255, 255, 0.6)' : 'none',
  height: '2.5rem',
  transition: 'background-color 0.3s, border-color 0.3s',
  display: 'flex',
  justifyContent: 'center',
  gap: '0.6rem',
  alignItems: 'center',
  '&:hover': {
    background: 'linear-gradient(to left, rgba(51, 8, 103,0.6), rgba(48, 207, 208, 0.6))',
    borderColor: 'white',
  },
}));

export default function Filter({ handleSelect }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isBigScreen = useMediaQuery('(min-width:600px)');

  return (
    <div>
      <ButtonStyled onClick={handleClick} isBigScreen={isBigScreen}>
        <TuneIcon />
        {isBigScreen && 'Filter'}
        {isBigScreen && <ArrowDropDownIcon />}
      </ButtonStyled>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableScrollLock={true}
        sx={{ '& .MuiPaper-root': { width: '12rem' } }}
      >
        {/* <MenuItem
          onClick={() => {
            handleSelect('All');
            handleClose();
          }}
          sx={{
            '&:hover': {
              background: 'linear-gradient(to left, rgba(51, 8, 103,0.6), rgba(48, 207, 208, 0.6))',
              borderColor: 'white',
            },
          }}
        >
          All Posts
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            handleSelect('Recent');
            handleClose();
          }}
          sx={{
            '&:hover': {
              background: 'linear-gradient(to left, rgba(51, 8, 103,0.6), rgba(48, 207, 208, 0.6))',
              borderColor: 'white',
            },
          }}
        >
          Recent Posts
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelect('Popular');
            handleClose();
          }}
          sx={{
            '&:hover': {
              background: 'linear-gradient(to left, rgba(51, 8, 103,0.6), rgba(48, 207, 208, 0.6))',
              borderColor: 'white',
            },
          }}
        >
          Popular Posts
        </MenuItem>
      </Menu>
    </div>
  );
}

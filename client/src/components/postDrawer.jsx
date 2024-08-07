import React, { useState, useEffect, useRef } from "react";
import { Box, styled, Typography, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Drawer = styled(Box)(({ open, isBigScreen }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: !isBigScreen && open ? 'fixed' : 'relative',
  backgroundColor: 'rgba(255,255,255,0.5)',
  zIndex: !isBigScreen ? 120 : 0,
//   width: !isBigScreen ? '3.5vw' : open ? '20vw' : '3.5vw','
width: open ? '15vw' : '10vw',
  height: '100vh',
  transition: 'width 0.3s',
  '@media (max-width: 1200px)': {
    width: open ? '15vw' : '2vw',
  },
  '@media (max-width: 900px)': {
    width: open ? '16vw' : '7vw',
  },
  '@media (max-width: 600px)': {
    width: open ? '40vw' : '10vw',
  },
}));

const DrawerHeader = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
`;

const DrawerBody = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ListItemTextStyled = styled(ListItemText)`
  padding-left: 1rem;
`;

const TypographyStyled = styled(Typography)`
  padding-left: 2rem;
`;

const IconButtonStyled = styled(IconButton)`
  margin-left: auto;
`;

const renderRow = ({ index, style, handleItemClick }) => (
  <ListItem style={style} key={index} component="div" disablePadding onClick={handleItemClick}>
    <ListItemButton>
      <ListItemTextStyled primary={`Item ${index + 1}`} />
    </ListItemButton>
  </ListItem>
);

const PostDrawer = () => {
  const [open, setOpen] = useState(true);
  const isBigScreen = useMediaQuery('(min-width:600px)');
  const drawerRef = useRef(null);

  const handleOpenClose = () => {
    setOpen(!open);
  };

  const handleItemClick = () => {
    if (!isBigScreen) {
      setOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isBigScreen) {
      setOpen(true);
    }
  }, [isBigScreen]);

  useEffect(() => {
    if (!isBigScreen && open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, isBigScreen]);

  return (
    <Drawer open={open} isBigScreen={isBigScreen} ref={drawerRef}>
      <DrawerHeader>
        {open && <TypographyStyled>Categories</TypographyStyled>}
        {isBigScreen ? null : (
          <IconButtonStyled onClick={handleOpenClose}>
            <Tooltip title="Choose Category" placement="top">
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Tooltip>
          </IconButtonStyled>
        )}
      </DrawerHeader>
      <DrawerBody>
        {open && (
          <FixedSizeList
            height={window.innerHeight - 3 * 16}
            itemSize={46}
            itemCount={100}
            overscanCount={5}
          >
            {({ index, style }) => renderRow({ index, style, handleItemClick })}
          </FixedSizeList>
        )}
      </DrawerBody>
    </Drawer>
  );
};

export default PostDrawer;

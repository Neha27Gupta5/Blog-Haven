import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';
import { FixedSizeList } from 'react-window';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

const DrawerBody = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  marginLeft: 'auto',
}));

const renderRow = ({ index, style }) => (
  <ListItem button style={style} key={index}>
    <ListItemText primary={`Item ${index + 1}`} />
  </ListItem>
);

const CategoryDrawer = () => {
  const isBigScreen = useMediaQuery('(min-width:600px)');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <>
      <DrawerHeader>
        {mobileOpen && <TypographyStyled>Categories</TypographyStyled>}
        <IconButtonStyled onClick={handleDrawerToggle}>
          <Tooltip title="Choose Category" placement="top">
            {mobileOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </Tooltip>
        </IconButtonStyled>
      </DrawerHeader>
      <DrawerBody>
        {mobileOpen && (
          <FixedSizeList
            height={window.innerHeight - 3 * 16}
            itemSize={46}
            itemCount={100}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </DrawerBody>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      
        <Toolbar>
          {!isBigScreen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            Responsive Drawer
          </Typography>
        </Toolbar>
     
      <Drawer
        variant={isBigScreen ? 'permanent' : 'temporary'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: isBigScreen ? drawerWidth : 'auto',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isBigScreen ? drawerWidth : 'auto',
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          Main content goes here. Resize the window to see the drawer behavior.
        </Typography>
      </Box>
    </Box>
  );
};

export default CategoryDrawer;

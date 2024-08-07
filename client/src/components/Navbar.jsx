import React, { useState } from 'react';
import { AppBar, Toolbar, styled, Box, Button, Avatar, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store_UseContext/Authentication';
import { toast } from 'react-toastify';

const AppStyled = styled(AppBar)`
  margin: auto;
  background: linear-gradient(to left, rgba(51, 8, 103,0.9), rgba(48, 207, 208, 0.9)), url('your-background-image-url');
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  height: 4rem;
`;

const ToolbarStyled = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;

  @media (max-width: 900px) {
    justify-content: space-between;
    align-items: center;
  }
`;

const BoxStyled = styled(Box)`
  display: flex;
  flex-flow: row;
  gap: 2rem;
  @media (max-width: 900px) {
    display: none;
  }
`;

const ButtonStyled = styled(Button)`
  color: white;
  font-size: 1rem;
  font-weight: 300;
  border: 1px solid rgba(255, 255, 255, 0.6);
  height: 2.5rem;
  transition: background-color 0.3s, border-color 0.3s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: white;
  }
`;

const MenuButton = styled(IconButton)`
  display: block;
  color: white;

  &:hover {
    background-color: black;
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

const DrawerStyled = styled(Drawer)`
  .MuiDrawer-paper {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    width: 50vw;
  }
`;

const ListItemStyled = styled(ListItem)`
  &:hover {
    background: linear-gradient(to left, rgba(51, 8, 103, 0.8), rgba(48, 207, 208, 0.8));
  }
`;

const AvatarStyled = styled(Avatar)`
  background-color: rgba(48, 207, 208, 0.7);
  
`;

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isLoggedIn, logout, userData } = useAuth();
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logout Successfully');
    navigate('/');
  };

  const handleDrawerItemClick = (link) => {
    setDrawerOpen(false);
    navigate(link);
  };

  const menuItems = [
    { text: 'Home', link: '/Home' },
    { text: 'Posts', link: '/Posts' },
    { text: 'Create Blog', link: '/CreatePost' },
  ];

  return (
    <>
      <AppStyled position="static">
        <ToolbarStyled>
          <Typography variant="h1" sx={{ fontSize: '2rem' }}>BLOG HAVEN</Typography>
          <MenuButton edge="start" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </MenuButton>
          <DrawerStyled anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List>
              {menuItems.map((item, index) => (
                <ListItemStyled button key={index} onClick={() => handleDrawerItemClick(item.link)}>
                  <ListItemText primary={item.text} />
                </ListItemStyled>
              ))}
            </List>
          </DrawerStyled>
          <BoxStyled>
            {menuItems.map((item, index) => (
              <ButtonStyled key={index} component={NavLink} to={item.link}>{item.text}</ButtonStyled>
            ))}
            {isLoggedIn ? (
              <>
                <ButtonStyled onClick={handleLogout}>Logout</ButtonStyled>
                <AvatarStyled>{userData?.Name?.charAt(0).toUpperCase()}</AvatarStyled>
              </>
            ) : (
              <ButtonStyled component={NavLink} to="/login">Login</ButtonStyled>
            )}
          </BoxStyled>
        </ToolbarStyled>
      </AppStyled>
    </>
  );
};

export default Navbar;

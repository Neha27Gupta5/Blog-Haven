import React, { useEffect, useState } from 'react';
import { SwipeableDrawer, Button, List, ListItem, IconButton, Typography, Box, styled, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

// Sample categories
const initialCategories = ['All']; // Initial categories with a default value

// Styled Button with responsive sizing
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

// Styled ListItem Button with responsive width
const ListItemButtonStyled = styled(Button)(({ theme }) => ({
  color:'black',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '3rem',
  width: '100%',
  '&:hover': {
    background: 'linear-gradient(to left, rgba(51, 8, 103,0.6), rgba(48, 207, 208, 0.6))',
    borderColor: 'white',
  },
}));

const SimpleDrawer = ({ handleSelect }) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]); // Initialize categories state
  const isBigScreen = useMediaQuery('(min-width:600px)');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://blog-haven.onrender.com/blog/fetch/category');
        if (!response.ok) {
          throw new Error('Failed to fetch Categories');
        }
        const data = await response.json();
        setCategories([...initialCategories, ...data]); // Update categories state with fetched data
        console.log('Fetched categories:', data);
      } catch (error) {
        console.error('Error fetching Categories:', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures useEffect runs once on component mount

  return (
    <>
      <ButtonStyled onClick={toggleDrawer} isBigScreen={isBigScreen}>
        <MenuIcon />
        {isBigScreen && 'Category'}
      </ButtonStyled>
      <SwipeableDrawer
        anchor='left'
        open={open}
        onClose={toggleDrawer}
        onOpen={() => setOpen(true)}
        disableScrollLock={true}
        sx={{
          '& .MuiDrawer-paper': {
           
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Set drawer background color
            width: '100%',
            width:'40vw',
            '@media (max-width: 2000px)': {
              width: open ? '20vw' : '2vw',
            },
            '@media (max-width: 1400px)': {
              width: open ? '25vw' : '2vw',
            },
            '@media (max-width: 1200px)': {
              width: open ? '30vw' : '2vw',
            },
            '@media (max-width: 900px)': {
              width: '30vw',
            },
            '@media (max-width: 600px)': {
              width: open ? '40vw' : '10vw',
            },
            '@media (max-width: 500px)': {
              width: open ? '60vw' : '10vw',
            },
          },
        }}
      >
        <Box
          sx={{ width: '100%' }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              // backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              background: 'linear-gradient(to left, rgba(51, 8, 103,0.6), rgba(48, 207, 208, 0.6))',
              borderBottom: '1px solid #ddd',
              textDecoration: 'uppercase',
            }}
          >
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Categories
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {categories.map((category, index) => (
              <ListItem key={index}>
                <ListItemButtonStyled onClick={() => handleSelect(category)}>
                  {category}
                </ListItemButtonStyled>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default SimpleDrawer;

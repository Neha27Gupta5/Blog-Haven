import React from 'react';
import { Container, Box, Typography, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)`
  background-image: linear-gradient(to top, #30cfd0, #330867);
 
  color: white;
  &:hover {
    background-image: linear-gradient(to top, #330867, #30cfd0);
  }
`;

const BlogIntro = () => {
  const navigate = useNavigate();

  return (
    <div
    style={{
      backgroundColor: 'rgba(0,0,0,0.7)',
      display:'flex',
      justifyContent:'center',
    }}>
       <Container maxWidth="lg" style={{
        backgroundColor: 'rgba(0,0,0,0)',
        width:'100%',
        margin: 0,
        
        color: 'white',
        height: '20%',
        display: 'flex',
        marginBottom:'-0 rem',
        borderStyle:'none',
      
    }}>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom color="white">
          Create Post
        </Typography>
        <Typography variant="h6" paragraph style={{ fontWeight: 100 }}>
          Share your story with the world. Create a beautiful, personalized blog that fits your brand. Grow your audience with built-in marketing tools, or transform your passion into revenue by gating access with a paywall.
        </Typography>
        <StyledButton
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
          onClick={() => navigate('/CreatePost')}
        >
          Get Started
        </StyledButton>
      </Box>
    </Container>
    </div>
    
  );
};

export default BlogIntro;

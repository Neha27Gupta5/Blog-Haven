import React from 'react';
import { Box, Grid, Link, Typography, Container, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

// Replace these with your own social media URLs
const socialMediaLinks = {
  facebook: 'https://www.facebook.com/yourprofile',
  twitter: 'https://twitter.com/yourprofile',
  instagram: 'https://instagram.com/yourprofile',
};

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        py: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
        paddingTop: '0',
        background: 'linear-gradient(to left, rgba(51, 8, 103,0.9), rgba(48, 207, 208, 0.9))',
        color: 'rgba(255, 255, 255, 0.8)', // Lighter shade of white for general text
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="space-between" sx={{ p: { xs: 2, md: 3, lg: 4 } }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" gutterBottom>
              Blog Haven
            </Typography>
            <Typography>
              Explore a world of stories, share your own experiences. Your next great read is just a click away!
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="white" gutterBottom>
              NAVIGATION
            </Typography>
            <Link href="/Home" color="inherit" display="block">Home</Link>
            <Link href="/posts" color="inherit" display="block">Posts</Link>
            <Link href="/createPost" color="inherit" display="block">Create Blog</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="white" gutterBottom>
              SOCIAL MEDIA
            </Typography>
            <IconButton aria-label="Facebook" color="inherit" component="a" href={socialMediaLinks.facebook}>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Twitter" color="inherit" component="a" href={socialMediaLinks.twitter}>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="Instagram" color="inherit" component="a" href={socialMediaLinks.instagram}>
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" color="rgba(255, 255, 255, 1)" align="center" sx={{fontSize:'1.1rem',}}>
          Made with 💜
        </Typography>
        <Typography variant="body2" color="rgba(255, 255, 255,1)" align="center">
          © 2024 Blog Haven All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Styled component for centering the content
const CenteredBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 4rem);
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const GradientText = styled(Typography)`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  background-image: linear-gradient(to right, #30cfd0, #330867);
  color: white;
  padding: 0.25rem 2rem;
  font-size: 1rem;
  margin-top: 1rem;
  &:hover {
    background-image: linear-gradient(to top, #330867, #30cfd0);
  }
`;

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <CenteredBox>
      <Box>
        <Typography variant="h1" component="h1" style={{ fontSize: '8rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.7)' }}>
          404
        </Typography>
        <GradientText variant="h4" component="h2" style={{ fontSize: '1.5rem' }}>
          Page Not Found
        </GradientText>
        <StyledButton variant="contained" size="small" onClick={() => navigate('/')}>
          Go to Home
        </StyledButton>
      </Box>
    </CenteredBox>
  );
};

export default ErrorPage;

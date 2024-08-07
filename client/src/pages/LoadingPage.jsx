import React from 'react';
import { styled, keyframes } from '@mui/system';
import { Typography } from '@mui/material';

const Loader = () => {
  return (
    <LoaderOverlay>
      <LoaderContainer>
        <CircleLoader />
        <TextContainer>
          <ShinyText variant="h4">Explore&nbsp;write&nbsp;Share...</ShinyText>
        </TextContainer>
      </LoaderContainer>
    </LoaderOverlay>
  );
};

const LoaderOverlay = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7); 
`;

const LoaderContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 25vw;
  ${'' /* border-radius: 50%; */}
  background-color: rgba(255, 255, 255 ,0); /* Opaque white background */
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const CircleLoader = styled('div')`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid;
  border-image: linear-gradient(to right, #ff6ec4, #7873f5) 1;
  ${'' /* border-radius: 50%; */}
  width: 80px;
  height: 80px;
  animation: ${spinAnimation} 1s linear infinite;
  margin-bottom: 20px;
`;

const shine = keyframes`
  0% {
    background-position: -100%;
  }
  100% {
    background-position: 100%;
  }
`;

const ShinyText = styled(Typography)`
  font-family: 'Pacifico', cursive;
  background: linear-gradient(90deg, #ff6ec4, #7873f5, #ff6ec4);
  background-size: 200%; /* Reduced background size */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shine} 2s linear infinite;
  font-size: 24px; /* Decreased font size */
`;

const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Loader;

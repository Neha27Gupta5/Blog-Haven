import React from 'react';
import { Button, styled } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link if using react-router-dom
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

const StyledButton = styled(Button)`
  background-image: linear-gradient(to top, #30cfd0, #330867);
  color: white;
  &:hover {
    background-image: linear-gradient(to top, #330867, #30cfd0);
  }
`;

function ExampleCarouselImage({ text, backgroundImage }) {
  return (
    <div className='main-box'>
      <div className='text-box'>
        <div className='Category-box'>
          <KeyboardArrowRightRoundedIcon />
          <h4>Categories</h4>
        </div>
        <h1>{text}</h1>
        <div className='button-box'>
          <StyledButton component={Link} to='/CreatePost'>Create</StyledButton>
          <StyledButton component={Link} to='/posts'>Explore</StyledButton>
        </div>
      </div>
      <div className='img-box'>
        <img src={backgroundImage} alt={text} />
      </div>
    </div>
  );
}

export default ExampleCarouselImage;

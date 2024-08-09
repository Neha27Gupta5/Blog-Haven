import React, { useState, useRef } from 'react';
import { Box, TextField, Typography, Button, styled, Link as MuiLink } from '@mui/material';
import image from '/DesignerColor.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../store_UseContext/Authentication';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ScreenBox = styled(Box)`
  background-image: url(${image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const MainBox = styled(Box)`
  background-color: rgba(255, 255, 255, 0.9); 
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  gap: 1rem;
  width: 288px;
  margin: auto;
  border-radius: 10px;
  margin-top: 5vh;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
`;

const InputFieldBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
`;

const HeadingBox = styled(Box)`
  height: 5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px; 
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
`;

const CustomTypography = styled(Typography)`
  font-family: "Acme", sans-serif;
  font-weight: 400;
  font-size: 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  -webkit-text-stroke: 1px black;
`;

const LoginLine = styled(Typography)`
  margin-top: -0.2rem;
  margin-bottom: 1rem;
  color: #757575;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #1E88E5;
`;

const StyledButton = styled(Button)`
  background-image: linear-gradient(to top, #30cfd0, #330867);
  border-radius: 25px;
  color: white;
  &:hover {
    background-image: linear-gradient(to top, #330867, #30cfd0);
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const { storeLsToken } = useAuth();

  const initialDataFormt = {
    Name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [User, setUser] = useState(initialDataFormt);

  const fieldRefs = {
    Name: useRef(null),
    username: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (User.password !== User.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('https://blog-haven.onrender.com/blog/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(User)
      });

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.extraDetails) && data.extraDetails.length > 0) {
          data.extraDetails.forEach((errorMessage) => {
            toast.error(`${data.message}: ${errorMessage}`);
          });
        } else {
          toast.error(data.message); // Display general error message
        }
        return;
      }

      storeLsToken(data.token);

      navigate('/Home');
      toast.success("Registration successful!");

    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key === 'ArrowDown') {
      focusNextField(e.target.name);
    } else if (e.key === 'ArrowUp') {
      focusPreviousField(e.target.name);
    }
  };

  const focusNextField = (fieldName) => {
    const fields = Object.keys(fieldRefs);
    const currentIndex = fields.indexOf(fieldName);
    const nextIndex = (currentIndex + 1) % fields.length;
    fieldRefs[fields[nextIndex]].current.focus();
  };

  const focusPreviousField = (fieldName) => {
    const fields = Object.keys(fieldRefs);
    const currentIndex = fields.indexOf(fieldName);
    const prevIndex = (currentIndex - 1 + fields.length) % fields.length;
    fieldRefs[fields[prevIndex]].current.focus();
  };

  return (
    <ScreenBox>
      <MainBox>
        <HeadingBox>
          <CustomTypography variant="h4">Sign Up</CustomTypography>
        </HeadingBox>
        <InputFieldBox>
          <StyledTextField
            label="Name"
            variant="outlined"
            size="small"
            name="Name"
            inputRef={fieldRefs.Name}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <StyledTextField
            label="Username"
            variant="outlined"
            size="small"
            name="username"
            inputRef={fieldRefs.username}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <StyledTextField
            label="Email"
            variant="outlined"
            size="small"
            name="email"
            inputRef={fieldRefs.email}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <StyledTextField
            label="Password"
            variant="outlined"
            type="password"
            size="small"
            name="password"
            inputRef={fieldRefs.password}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <StyledTextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            size="small"
            name="confirmPassword"
            inputRef={fieldRefs.confirmPassword}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <StyledButton variant="contained" fullWidth onClick={handleSubmit} onKeyDown={handleKeyPress}>
            Sign up
          </StyledButton>
          <LoginLine>
            Already have an account? <StyledLink to="/login">Login</StyledLink>
          </LoginLine>
        </InputFieldBox>
        <Button fullWidth
         style={{
          marginTop:'-2rem',
          color: '#1E88E5',
         }}>
         <StyledLink to='/' styled={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
         }}>
        <KeyboardBackspaceIcon fontSize='small'/> back to home
         </StyledLink>
         </Button>
      </MainBox>
    </ScreenBox>
  );
};

export default SignUp;

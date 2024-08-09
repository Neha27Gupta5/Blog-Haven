import React, { useState, useRef } from 'react';
import { Box, TextField, Typography, Button, styled } from '@mui/material';
import image from '/DesignerColor.png'; // Ensure correct path
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
  margin: auto;
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

const Login = () => {
  const navigate = useNavigate();
  const { storeLsToken } = useAuth();

  const initialValues = {
    email: '',
    password: '',
  };

  const [user, setUser] = useState(initialValues);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email) {
      toast.error('Email is required');
      return;
    }
    
    if (!user.password) {
      toast.error('Password is required');
      return;
    }

    try {
      const response = await fetch('blog-haven-server-e6l76oh7u-neha27gupta5s-projects.vercel.app/blog/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Login Successful');
        storeLsToken(data.token);
        navigate('/Home');
      } else {
        // toast.error('Invalid credentials');
        toast.error(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error logging in. Please try again later.');
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
    if (fieldName === 'email') {
      passwordRef.current.focus();
    }
  };

  const focusPreviousField = (fieldName) => {
    if (fieldName === 'password') {
      emailRef.current.focus();
    }
  };

  return (
    <ScreenBox>
      <MainBox>
        <HeadingBox>
          <CustomTypography variant="h4">Login</CustomTypography>
        </HeadingBox>

        <form onSubmit={handleSubmit}>
          <InputFieldBox>
            <StyledTextField
              label="Email"
              variant="outlined"
              size="small"
              name="email"
              value={user.email}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              placeholder="Enter your email"
              inputRef={emailRef}
            />

            <StyledTextField
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              name="password"
              value={user.password}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              placeholder="Enter your password"
              inputRef={passwordRef}
            />

            <StyledButton 
              variant="contained" 
              type="submit" 
              fullWidth 
              onKeyDown={handleKeyPress}
            >
              Login
            </StyledButton>
            <LoginLine>
              Create an account <StyledLink to="/signup">Sign Up</StyledLink>
            </LoginLine>
          </InputFieldBox>
        </form>
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

export default Login;

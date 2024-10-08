const User = require('../DbSchema/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signupController = async (req, res, next) => {
  
  const { Name, username, email, password, confirmPassword } = req.body;
  console.log(req.body);
  
  try {

    const isUsernameExist = await User.findOne({ username });
    
    if (isUsernameExist) {
      console.log(2);
      const error = new Error('Username already exists');
      error.status = 400;
      error.extraDetails = 'Please choose a different username';
      console.log(0);
      return next(error);
    }
   
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      const error = new Error('Email already exists');
      error.status = 400;
      error.extraDetails = 'User with this email already exists, please login';
      return next(error);
    }

    if (!confirmPassword || password !== confirmPassword) {
        const error = new Error('Passwords do not match');
        error.status = 400;
        error.extraDetails = 'Please enter the same password in both fields';
        return next(error);
      }
      
  
    const userData = { Name, username, email, password };
    const user = await User.create(userData);
    console.log('user data:',user);
    const token=user.createToken();
    console.log('token generated by signup',token);
    res.status(201).json({ msg: 'User created successfully' ,token});

  } catch (error) {
    error.status = 500;
    error.extraDetails = 'Error creating user';
    next(error);
  }

};


const loginController = async (req, res, next) => {
  console.log(0);
  const { email, password } = req.body;
  console.log(0);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('Invalid Credentials');
      error.status = 404;
      error.extraDetails = 'No account found with this email, please sign up';
      return next(error);
    }
    console.log(0);
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      const error = new Error('Invalid Credentials');
      error.status = 400;
      error.extraDetails = 'Incorrect password, please try again';
      return next(error);
    }
     const token=user.createToken();
    console.log('token generated by login',token);
    res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    error.status = 500;
    error.extraDetails = 'Error logging in';
    next(error);
  }
  console.log(0);
};

const user=async(req,res)=>{
  try{
    const userData=req.user;
    res.status(200).json(userData);
  }catch(e){
     console.log(`error from the user route ${e}`);
  }
}

module.exports = { signupController, loginController ,user};

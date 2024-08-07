const jwt = require('jsonwebtoken');
const User = require('../DbSchema/userSchema'); // Adjust the path to your User model

const authMiddleware = async (req, res, next) => {
  console.log('Entering authMiddleware');
  const token = req.header('Authorization');

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: "Unauthorized access, token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  console.log('Token from auth middleware:', jwtToken);

  try {
    console.log(process.env.MY_SECRET_KEY);
    const isVerified = jwt.verify(jwtToken, process.env.MY_SECRET_KEY);
    console.log('JWT verified:', isVerified);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    // console.log(isVerified);

    if (!userData) {
      console.log('User not found');
      return res.status(404).json({ message: "User not found" });
    }
     
    req.token = token;
    req.user = userData;
    req.userID = userData._id;
    next();
  } catch (e) {
    console.error('JWT verification failed:', e);
    return res.status(401).json({ message: "Unauthorized access, invalid token" });
  }
};

module.exports = authMiddleware;

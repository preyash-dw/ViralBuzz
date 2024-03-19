// import necessary modules
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../model/userModel.js';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

// create express router
const router = express.Router();


router.use(session({
  secret: process.env.SECRET, // Change this to a secret key for session encryption
  resave: false,
  saveUninitialized: true
})); 


// register route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // check if email and password are provided
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  // check if user with the same email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send('User with the same email already exists');
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create and save a new user
  const newUser = new User({ email, password: hashedPassword ,isAdmin: false});
  await newUser.save();

  res.status(201).send('User registered successfully');
});

// login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // check if email and password are provided
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  // find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send('User not found');
  }

  // compare provided password with the stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send('Invalid password');
  }

  // authenticate user
  req.session.userId = user._id;
 // Send user data without password field
 const { password: _, ...userData } = user.toObject(); // Exclude password field
 res.json(userData);
});

// export the router
export default router;
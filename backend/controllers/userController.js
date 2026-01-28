import AsyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import generateToken from "../utils/generatetoken.js";
import bcrypt from "bcryptjs";


// @desc    Register a new user
// @route   POST /api/register
// @access  Public
export const registerUser = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) { 
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password
    });
    if (user) { 
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

});

//@desc    Auth user & get token
//@route   POST /api/users/login
//@access  Public
export const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }); 
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(res, user._id); 
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(404);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = AsyncHandler(async (req, res) => {
const user = await User.findById(req.user._id);
if (user) {
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
} else {
    res.status(404);
    throw new Error('User not found');
    }
    
});


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name; // update name if provided in request body  if not keep existing name
        user.email = req.body.email || user.email; // update the new email if provided in request body  if not keep existing email
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
export const logoutUser = AsyncHandler(async (req, res) => {
res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
    res.status(200).json({ message: ' user Logged out successfully' });
    
});


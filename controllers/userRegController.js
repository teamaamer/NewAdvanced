import User from '../models/userModel.js';
import { generateToken } from '../utils/tokenUtils.js';
import bcrypt from 'bcrypt';

export const userRegister = async(req, res) =>{
try{
    const{userName, email, password, confirmPassword,role, profileInfo, profilePic}= req.body;
    
    if(!userName || !email || !password || !confirmPassword || !role || !profileInfo || !profilePic){
        return res.status(400).jason('please fill in all the required fields');
    }
    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long." });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ where: {Email : email} });
    if (existingUser) {
        return res.status(400).json({ error: "email already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 

    const user = await User.create({
         Username:userName,
         Email:email,
         Password: hashedPassword,
         Role:role,
         ProfileInfo:profileInfo,
         ProfilePic: profilePic,
    });
    const token = generateToken(user.UserID, user.Role);

    res.status(200).json({
        userID: user.UserID,
        userName: user.Username,
        token: token
      });
}
catch (error) {
    console.error('User Registration Error:', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Validation error. Please provide valid data' });
    }

    res.status(500).json({ error: 'User Registration Failed' });
  }
};

export const userLogin = async (req, res) => {
    try 
  {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json('Please enter all the details');
    }

    const user = await User.findOne({ where: {Email : email} });

    if (!user) {
      return res.status(400).json('Invalid Email');
    }

    const passwordMatch = await bcrypt.compare(password,user.Password);

    if (!passwordMatch) {
      return res.status(400).json('Invalid Password');
    }

    const token = generateToken(user.UserID, user.Role);
    user.lastActive= new Date();
    await user.save();
    
    res.status(200).json({
        userID: user.UserID,
        userName: user.Username,
        userRole: user.Role,
        token: token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'User login failed' });
  }
  };

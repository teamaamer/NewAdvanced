import Code from '../models/codeModel.js'; 
import User from '../models/userModel.js';
import { sendResetPasswordEmail, generateUniqueCode } from '../utils/emailUtils.js';
import bcrypt from 'bcrypt';


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
    
          const user = await User.findOne({ where: { Email: email } });
    
          if (!user) {
            return res.status(400).json('No User found with this Email');
          }
    
          const resetCode = generateUniqueCode(10);
          const codeHash = await bcrypt.hash(resetCode, 10);
          console.log(resetCode);
          await sendResetPasswordEmail(email, resetCode);
    
          const code = await Code.create({
            userId: user.UserID,
            codeHash: codeHash,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), 
            createdAt: new Date(),
          });
    
          res.status(200).json({
            message: 'Password reset email sent',
            userId: user.UserID, 
          });

      } catch (error) {
        console.error(error);
        res.status(500).json('Password reset request failed');
      }
  };

export const verifyCode = async (req, res) => {
  try {
    const { userId } = req.params; 
    const { providedCode } = req.body;
  
    console.log(`Verifying code for userId: ${userId} with providedCode: ${providedCode}`);
  
    const code = await Code.findOne({
      where: { userId: userId },
      order: [['createdAt', 'DESC']], 
    });

    if (!code) {
      console.log(`No code found for userId: ${userId}`);
      return res.status(401).json({ error: 'Code not found' });
    } else {
      console.log(`Found code: ${code.codeHash}, Expires at: ${code.expiresAt}`);
    }
    
    if (!providedCode) {
      console.log('Provided code does not match');
      return res.status(400).json('Invalid Code');
    }

    const now = new Date();
    if (code.expiresAt < now) {
      console.log('Code has expired');
      return res.status(400).json('Code has expired');
    }

    console.log('Verification Successful');
    res.status(200).json('Verification Successful');
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Invalid Verification Code' });
  }
};

// Reset Password
  export const resetPassword = async (req, res) => {
    try 
    {
      const {userId} =  req.params ; 
  
      const { newPassword, confirmPassword } = req.body;
  
      if (newPassword !== confirmPassword) {
        return res.status(400).json('New Password and Confirm Password does not match');
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      const user = await User.findByPk(userId);

      user.Password = hashedPassword;
      await user.save();
      res.status(200).json('Password Reset Successful');
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Password Reset Failed' });
    }
  };
  
  
  

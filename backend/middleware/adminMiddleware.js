import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Received token:', token);
    
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('Decoded token:', decoded);

    const user = await User.findById(decoded.id);
    console.log('Found user:', user);

    if (!user) {
      console.log('User not found');
      return res.status(403).json({ message: 'User not found' });
    }

    if (user.role !== 'admin') {
      console.log('User is not admin:', user.role);
      return res.status(403).json({ message: 'Not authorized as admin' });
    }

    console.log('Admin access granted');
    req.user = user;
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    return res.status(401).json({ 
      message: 'Not authorized, token failed',
      error: error.message 
    });
  }
};

export default adminMiddleware; 
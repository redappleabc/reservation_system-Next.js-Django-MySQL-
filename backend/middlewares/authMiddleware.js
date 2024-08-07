const jwt = require('jsonwebtoken');

const { db } = require("../database/config/database");

const User = db['User'];

const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findOne({
      where: {
        email: decoded.email
      }
    })
    next();
  } catch (err) {
    return res.status(403).json({
      message: 'Invalid token'
    })
  }
}

// Middleware for admin authentication
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({
    message: 'Forbidden: Admin Only'
  })
}

module.exports = {
  requireAuth,
  requireAdmin
};

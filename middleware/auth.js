const jwt = require('jsonwebtoken');
const User = require('../User/model');

const auth = (allowedRoles = ['customer']) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: decoded.userId });

      if (!user) {
        throw new Error('User not found');
      }

      if (!allowedRoles.includes(user.role)) {
        throw new Error('Not authorized to access this route');
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  }
};

module.exports = auth;

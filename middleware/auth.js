const jwt = require('jsonwebtoken');
const User = require('../User/model');

const auth = (allowedRoles = ['customer']) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userId = decoded.userId;

      let user;

      // MongoDB starts
      user = await User.findOne({ _id: userId });

      if (!user) {
        throw new Error('User not found');
      }

      if (!allowedRoles.includes(user.role)) {
        throw new Error('Not authorized to access this route');
      }
      // MongoDB ends

      // MySQL starts
      const query = `
                SELECT r.role_name FROM user_roles ur
                JOIN roles r ON ur.role_id = r.role_id
                WHERE ur.user_id = ?
            `;

      const [roles] = await promisePool.execute(query, [userId]);

      const userRoles = roles.map(role => role.role_name);

      const hasAllowedRole = userRoles.some(role => allowedRoles.includes(role));

      if (!hasAllowedRole) {
        throw new Error('Not authorized to access this route');
      }

      user = decoded;
      user.roles = userRoles;
      // MySQL ends

      req.user = user;

      next();

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(498).send({ message: '[AUTH] Token expired' });
      }
      else if (error.code === "ETIMEDOUT") {
        return res.status(401).send({ message: '[AUTH] DB Connection failed' });
      }
      else {
        return res.status(401).send({ message: `[AUTH] ${error.message}` });
      }
    }
  }
};

module.exports = auth;

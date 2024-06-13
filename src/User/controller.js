const User = require('./model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUserToken = (user, statusCode, res) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(statusCode).json({ token, userId: user._id, role: user.role });
};

exports.signup = async (req, res) => {
  try {
    const user = new User({ ...req.body, role: 'employee' });
    
    await user.save();
    createUserToken(user, 201, res);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: 'Login failed! Check authentication credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }

    createUserToken(user, 200, res);
  } catch (error) {
    res.status(400).send(error);
  }
};

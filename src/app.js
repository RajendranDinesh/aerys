const express = require('express');
const app = express();

const userRoutes = require('./User');
// Add new routes here

app.use(express.json());
app.use('/user', userRoutes);
// Add app.use statements here

module.exports = app;
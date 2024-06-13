const express = require('express');
const app = express();

const userRoutes = require('./User');
const surveyRoutes = require('./Survey');
// Add new routes here

app.use(express.json());
app.use('/user', userRoutes);
app.use('/survey', surveyRoutes);
// Add app.use statements here

module.exports = app;
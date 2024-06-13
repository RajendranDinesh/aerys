const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  // Define schema fields for survey
});

const Survey = mongoose.model('surveys', SurveySchema);

module.exports = Survey;

const express = require('express');
const surveyController = require('./controller');

const router = express.Router();

router.post('/', surveyController.createSurvey);
router.get('/', surveyController.getSurvey);

module.exports = router;

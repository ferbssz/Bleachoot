const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/enviar', feedbackController.enviarFeedback);

module.exports = router;
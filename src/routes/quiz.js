const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/salvar', quizController.salvarResultado);
router.get('/resultado/:idUsuario', quizController.buscarUltimoResultado);
router.get('/todos/:idUsuario', quizController.buscarTodosResultados);

module.exports = router;

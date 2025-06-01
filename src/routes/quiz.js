const express = require('express');
const router = express.Router();
const database = require('../database/config');
const mysql = require('mysql2'); // necessário para usar escape()

router.post('/salvar', (req, res) => {
    const { idUsuario, pontuacao, totalQuestoes } = req.body;

    if (!pontuacao || !totalQuestoes) {
        return res.status(400).json({ erro: "Dados incompletos" });
    }

    const instrucaoSql = `
        INSERT INTO resultado_quiz (idUsuario, pontuacao, totalQuestoes)
        VALUES (${mysql.escape(idUsuario)}, ${mysql.escape(pontuacao)}, ${mysql.escape(totalQuestoes)});
    `;

    database.executar(instrucaoSql)
        .then(() => {
            res.status(200).json({ mensagem: "Resultado salvo com sucesso" });
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao salvar resultado" });
        });
});

module.exports = router;

router.get('/resultado/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;

    const instrucaoSql = `
        SELECT pontuacao, totalQuestoes, dataRegistro 
        FROM resultado_quiz 
        WHERE idUsuario = ${idUsuario}
        ORDER BY dataRegistro DESC
        LIMIT 1;
    `;

    database.executar(instrucaoSql)
        .then(resultados => {
            if (resultados.length > 0) {
                res.status(200).json(resultados[0]);
            } else {
                res.status(404).json({ erro: "Nenhum resultado encontrado para este usuário." });
            }
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar resultado." });
        });
});
router.get('/todos/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;

    const instrucaoSql = `
        SELECT pontuacao, totalQuestoes, dataRegistro 
        FROM resultado_quiz 
        WHERE idUsuario = ${idUsuario}
        ORDER BY dataRegistro ASC;
    `;

    database.executar(instrucaoSql)
        .then(resultados => {
            if (resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(404).json({ erro: "Nenhum resultado encontrado." });
            }
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar resultados." });
        });
});
router.get('/todos/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;

    const instrucaoSql = `
        SELECT pontuacao, totalQuestoes, dataRegistro 
        FROM resultado_quiz 
        WHERE idUsuario = ${idUsuario}
        ORDER BY dataRegistro ASC;
    `;

    database.executar(instrucaoSql)
        .then(resultados => {
            if (resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(404).json({ erro: "Nenhum resultado encontrado." });
            }
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar resultados." });
        });
});
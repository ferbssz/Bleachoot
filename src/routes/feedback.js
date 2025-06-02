// routes/feedback.js
const express = require('express');
const router = express.Router();
const database = require('../database/config'); // Certifique-se de que o caminho para seu config.js está correto

router.post('/enviar', (req, res) => {
    const { idUsuario, nomeRemetente, emailRemetente, assunto, mensagem } = req.body;

    // Validação básica dos campos obrigatórios
    if (!emailRemetente || !mensagem) {
        return res.status(400).json({ erro: "Email e mensagem são campos obrigatórios." });
    }

    // SQL para inserir o feedback
    // Usamos NULL para idUsuario e nomeRemetente se não forem fornecidos
    const instrucaoSql = `
        INSERT INTO feedback_usuario (idUsuario, nomeRemetente, emailRemetente, assunto, mensagem)
        VALUES (${idUsuario ? idUsuario : 'NULL'}, 
                ${nomeRemetente ? `'${nomeRemetente}'` : 'NULL'}, 
                '${emailRemetente}', 
                ${assunto ? `'${assunto}'` : 'NULL'}, 
                '${mensagem}');
    `;

    console.log("Executando a instrução SQL para feedback:\n" + instrucaoSql);

    database.executar(instrucaoSql)
        .then(() => {
            res.status(201).json({ mensagem: "Feedback enviado com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao registrar feedback:", erro);
            res.status(500).json({ erro: "Erro interno ao enviar feedback." });
        });
});

module.exports = router;
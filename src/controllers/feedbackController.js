const feedbackModel = require('../models/feedbackModel');

function enviarFeedback(req, res) {
    const { idUsuario, nomeRemetente, emailRemetente, assunto, mensagem } = req.body;

    if (!emailRemetente || !mensagem) {
        return res.status(400).json({ erro: "Email e mensagem são campos obrigatórios." });
    }

    feedbackModel.enviar(idUsuario, nomeRemetente, emailRemetente, assunto, mensagem)
        .then(() => {
            res.status(201).json({ mensagem: "Feedback enviado com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao registrar feedback:", erro);
            res.status(500).json({ erro: "Erro interno ao enviar feedback." });
        });
}

module.exports = {
    enviarFeedback
};
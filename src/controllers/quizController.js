const quizModel = require('../models/quizModel');

function salvarResultado(req, res) {
    const { idUsuario, pontuacao, totalQuestoes } = req.body;

    if (!pontuacao || !totalQuestoes) {
        return res.status(400).json({ erro: "Dados incompletos" });
    }

    quizModel.salvarResultado(idUsuario, pontuacao, totalQuestoes)
        .then(() => res.status(200).json({ mensagem: "Resultado salvo com sucesso" }))
        .catch(erro => res.status(500).json({ erro: "Erro ao salvar resultado" }));
}

function buscarUltimoResultado(req, res) {
    const idUsuario = req.params.idUsuario;

    quizModel.buscarUltimoResultado(idUsuario)
        .then(resultados => {
            if (resultados.length > 0) {
                res.status(200).json(resultados[0]);
            } else {
                res.status(404).json({ erro: "Nenhum resultado encontrado para este usuário." });
            }
        })
        .catch(erro => res.status(500).json({ erro: "Erro ao buscar resultado." }));
}

function buscarTodosResultados(req, res) {
    const idUsuario = req.params.idUsuario;

    quizModel.buscarTodosResultados(idUsuario)
        .then(resultados => {
            if (resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(404).json({ erro: "Nenhum resultado encontrado." });
            }
        })
        .catch(erro => res.status(500).json({ erro: "Erro ao buscar resultados." }));
}

module.exports = {
    salvarResultado,
    buscarUltimoResultado,
    buscarTodosResultados
};

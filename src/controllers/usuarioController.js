const usuarioModel = require('../models/usuarioModel');

function cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    usuarioModel.cadastrar(nome, email, senha)
        .then(() => res.json({ mensagem: "Usuário cadastrado com sucesso!" }))
        .catch((erro) => res.status(500).json(erro));
}

function autenticar(req, res) {
    const { email, senha } = req.body;

    usuarioModel.autenticar(email, senha)
        .then((resultado) => {
            if (resultado.length === 1) {
                res.json(resultado[0]);
            } else {
                res.status(403).json({ mensagem: "Usuário ou senha inválido!" });
            }
        })
        .catch((erro) => res.status(500).json(erro));
}

module.exports = {
    cadastrar,
    autenticar
};
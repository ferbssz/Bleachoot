const database = require("../database/config.js");
var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");


router.post("/cadastrar", function (req, res) {
    const { nome, email, senha } = req.body;

    let instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;

    database.executar(instrucaoSql)
        .then(() => res.json({ mensagem: "Usuário cadastrado com sucesso!" }))
        .catch((erro) => res.status(500).json(erro));
});

router.post("/autenticar", function (req, res) {
    const { email, senha } = req.body;

    let instrucaoSql = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;

    database.executar(instrucaoSql)
        .then((resultado) => {
            if (resultado.length == 1) {
                res.json(resultado[0]);
            } else {
                res.status(403).json({ mensagem: "Usuário ou senha inválido!" });
            }
        })
        .catch((erro) => res.status(500).json(erro));
});
module.exports = router;
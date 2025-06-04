const database = require('../database/config');
const mysql = require('mysql2');

function salvarResultado(idUsuario, pontuacao, totalQuestoes) {
    const instrucaoSql = `
        INSERT INTO resultado_quiz (idUsuario, pontuacao, totalQuestoes)
        VALUES (${mysql.escape(idUsuario)}, ${mysql.escape(pontuacao)}, ${mysql.escape(totalQuestoes)});
    `;
    return database.executar(instrucaoSql);
}

function buscarUltimoResultado(idUsuario) {
    const instrucaoSql = `
        SELECT pontuacao, totalQuestoes, dataRegistro 
        FROM resultado_quiz 
        WHERE idUsuario = ${mysql.escape(idUsuario)}
        ORDER BY dataRegistro ASC
        LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

function buscarTodosResultados(idUsuario) {
    const instrucaoSql = `
        SELECT pontuacao, totalQuestoes, dataRegistro 
        FROM resultado_quiz 
        WHERE idUsuario = ${mysql.escape(idUsuario)}
        ORDER BY dataRegistro ASC;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    salvarResultado,
    buscarUltimoResultado,
    buscarTodosResultados
};

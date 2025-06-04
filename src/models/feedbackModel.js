const database = require('../database/config');

function enviar(idUsuario, nomeRemetente, emailRemetente, assunto, mensagem) {
    const instrucaoSql = `
        INSERT INTO feedback_usuario (idUsuario, nomeRemetente, emailRemetente, assunto, mensagem)
        VALUES (${idUsuario ? idUsuario : 'NULL'}, 
                ${nomeRemetente ? `'${nomeRemetente}'` : 'NULL'}, 
                '${emailRemetente}', 
                ${assunto ? `'${assunto}'` : 'NULL'}, 
                '${mensagem}');
    `;

    console.log("Executando a instrução SQL para feedback:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    enviar
};
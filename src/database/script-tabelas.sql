CREATE DATABASE bleachoot;

USE bleachoot;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(45) NOT NULL
);

CREATE TABLE resultado_quiz (
    idResultado INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    pontuacao INT NOT NULL,
    totalQuestoes INT NOT NULL,
    dataRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE feedback_usuario (
    idFeedback INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NULL,
    nomeRemetente VARCHAR(100) NULL,
    emailRemetente VARCHAR(100) NOT NULL,
    assunto VARCHAR(100) NULL,
    mensagem TEXT NOT NULL,
    dataEnvio DATETIME DEFAULT CURRENT_TIMESTAMP,
    statusFeedback VARCHAR(20) DEFAULT 'Pendente',
    CONSTRAINT chk_statusFeedback CHECK (statusFeedback IN ('Pendente', 'Em Análise', 'Resolvido', 'Ignorado')),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);



INSERT INTO resultado_quiz (idUsuario, pontuacao, totalQuestoes, dataRegistro) VALUES
(1, 7, 10, '2025-05-10 10:00:00'),
(1, 9, 10, '2025-05-15 14:30:00'),
(1, 6, 10, '2025-05-20 09:15:00'),
(1, 8, 10, '2025-05-25 11:00:00'),
(1, 10, 10, '2025-06-03 16:45:00');

SELECT * FROM resultado_quiz WHERE idUsuario = 1 ORDER BY dataRegistro ASC;
SELECT * FROM usuario;
select * from resultado_quiz;
select * from feedback_usuario;
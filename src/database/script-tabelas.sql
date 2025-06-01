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

SELECT * FROM usuario;
select * from resultado_quiz;

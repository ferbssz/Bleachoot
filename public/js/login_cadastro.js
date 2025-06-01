const btnControlLogin = document.getElementById('ControlLogin');
const btnControlCadastro = document.getElementById('ControlCadastro');
const formLogin = document.getElementById('formLogin');
const formCadastro = document.getElementById('formCadastro');

function ExibirCadastro() {
    btnControlCadastro.style.backgroundColor = '#f97316';
    btnControlLogin.style.backgroundColor = '#2E2F2F';
    formLogin.classList.add('d-none');
    formCadastro.classList.remove('d-none');
}
btnControlCadastro.addEventListener('click', ExibirCadastro)

function ExibirLogin() {
    btnControlLogin.style.backgroundColor = '#f97316';
    btnControlCadastro.style.backgroundColor = '#2E2F2F';
    formLogin.classList.remove('d-none');
    formCadastro.classList.add('d-none')
}
btnControlLogin.addEventListener('click', ExibirLogin);

function ValidarLogin() {
    var email = document.getElementById("inputEmail").value;
    var senha = document.getElementById("inputSenha").value;

    if (email === "" || senha === "") {
        alert("Preencha todos os campos");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Digite um email válido");
        return;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        }),
    })
    .then(async resposta => {
        if (resposta.ok) {
            const dados = await resposta.json();
            sessionStorage.setItem("idUsuario", dados.idUsuario);
            sessionStorage.setItem("nomeUsuario", dados.nome);
            alert("Login bem-sucedido");
            window.location.href = "poslogin.html"; // Redireciona para a página principal
        } else {
            const erro = await resposta.json();
            alert("Erro ao logar: " + erro.mensagem);
        }
    })
    .catch(erro => {
        console.error("Erro na requisição:", erro);
        alert("Erro de conexão com o servidor.");
    });
}


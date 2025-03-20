document.addEventListener("DOMContentLoaded", function () {
    // Cadastro de usuário
    const cadastroForm = document.getElementById("cadastroForm");
    if (cadastroForm) {
        cadastroForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let nome = document.getElementById("cadastroNome").value;
            let email = document.getElementById("cadastroEmail").value;
            let senha = document.getElementById("cadastroSenha").value;

            if (localStorage.getItem(email)) {
                alert("E-mail já cadastrado!");
                return;
            }

            let usuario = { nome: nome, email: email, senha: senha };
            localStorage.setItem(email, JSON.stringify(usuario));
            localStorage.setItem("usuarioLogado", email); // Salva usuário logado

            alert("Cadastro realizado com sucesso! Agora faça login.");
            window.location.href = "login.html"; // Redireciona para login
        });
    }

    // Login de usuário
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let email = document.getElementById("loginEmail").value;
            let senha = document.getElementById("loginSenha").value;
            let usuario = JSON.parse(localStorage.getItem(email));

            if (usuario && usuario.senha === senha) {
                localStorage.setItem("usuarioLogado", email); // Salva quem está logado
                alert(`Bem-vindo, ${usuario.nome}!`);
                window.location.href = "dashboard.html"; // Redireciona para dashboard
            } else {
                document.getElementById("mensagem").innerText = "E-mail ou senha incorretos.";
            }
        });
    }

    // Dashboard - Exibir usuário logado
    const mensagemUsuario = document.getElementById("mensagemUsuario");
    if (mensagemUsuario) {
        let usuarioLogado = localStorage.getItem("usuarioLogado");
        if (!usuarioLogado) {
            window.location.href = "login.html"; // Redireciona para login se não estiver logado
        } else {
            let usuario = JSON.parse(localStorage.getItem(usuarioLogado));
            mensagemUsuario.innerText = `Olá, ${usuario.nome}! Você está logado.`;
        }
    }

    // Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("usuarioLogado"); // Remove usuário logado
            alert("Você saiu da conta!");
            window.location.href = "login.html"; // Redireciona para login
        });
    }
});

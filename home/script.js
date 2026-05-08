let etapaAtual = 1;

function abrirModal() {
    const cadastroExistente = localStorage.getItem('ultimoPost');
    if (cadastroExistente) {
        const dados = JSON.parse(cadastroExistente);
        const confirmar = confirm(`Olá ${dados.nome}, você já fez um post sobre ${dados.material}. Deseja ir direto para a página de destino?`);
        
        if (confirmar) {
            redirecionarDireto(dados.material);
            return;
        }
    }
    document.getElementById('modalOverlay').style.display = 'flex';
    document.body.classList.add('modal-aberto');
}
function fecharModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.body.classList.remove('modal-aberto');
}
function proximaEtapa() {
    if (etapaAtual === 1) {
        const tipo = document.querySelector('input[name="tipoUsuario"]:checked');
        if (!tipo) {
            alert("Por favor, selecione se você é Doador ou Coletor.");
            return;
        }
        document.getElementById('etapa1').style.display = 'none';
        document.getElementById('etapa2').style.display = 'block';
        document.getElementById('btnVoltar').style.visibility = 'visible';
        etapaAtual = 2;
    } 
    else if (etapaAtual === 2) {
        const nome = document.getElementById('nome').value;
        const cidade = document.getElementById('cidade').value;
        const material = document.getElementById('material').value;
        const desc = document.getElementById('descricao').value;

        if (!nome || !cidade || !material || !desc) {
            alert("Preencha todos os campos obrigatórios (Nome, Cidade, Material e Descrição).");
            return;
        }
        document.getElementById('etapa2').style.display = 'none';
        document.getElementById('etapa3').style.display = 'block';
        document.getElementById('btnContinuar').innerText = "Postar";
        etapaAtual = 3;
    } 
    else if (etapaAtual === 3) {
        finalizarPost();
    }
}
function voltarEtapa() {
    if (etapaAtual === 2) {
        document.getElementById('etapa2').style.display = 'none';
        document.getElementById('etapa1').style.display = 'block';
        document.getElementById('btnVoltar').style.visibility = 'hidden';
        etapaAtual = 1;
    } else if (etapaAtual === 3) {
        document.getElementById('etapa3').style.display = 'none';
        document.getElementById('etapa2').style.display = 'block';
        document.getElementById('btnContinuar').innerText = "Continuar";
        etapaAtual = 2;
    }
}
function finalizarPost() {
    const nome = document.getElementById('nome').value;
    const cidade = document.getElementById('cidade').value;
    const material = document.getElementById('material').value;
    const desc = document.getElementById('descricao').value;
    const whatsappUser = document.getElementById('whatsapp').value;
    const dadosParaSalvar = { nome, material, cidade };
    localStorage.setItem('ultimoPost', JSON.stringify(dadosParaSalvar));
    const seuNumero = "5545999957340";
    const textoMensagem = `*Novo Post no ReciclaTech*\n\n` +
                          `*Nome:* ${nome}\n` +
                          `*Cidade:* ${cidade}\n` +
                          `*Material:* ${material}\n` +
                          `*Descrição:* ${desc}\n` +
                          `*Contato do Doador:* ${whatsappUser}`;
    
    const linkWhatsApp = `https://wa.me/${seuNumero}?text=${encodeURIComponent(textoMensagem)}`;
    alert("Post realizado com sucesso! Abrindo contato via WhatsApp...");
    window.open(linkWhatsApp, '_blank');
    const matMinusculo = material.toLowerCase();
    if (matMinusculo.includes("pilha") || matMinusculo.includes("eletro") || matMinusculo.includes("bateria")) {
        window.location.href = "../Eletronico/Eletronico.html";
    } else {
        window.location.href = "../Reciclavel/Reciclavel.html";
    }
}
function redirecionarDireto(material) {
    const mat = material.toLowerCase();
    if (mat.includes("pilha") || mat.includes("eletro") || mat.includes("bateria")) {
        window.location.href = "../Eletronico/Eletronico.html";
    } else {
        window.location.href = "../Reciclavel/Reciclavel.html";
    }
}
window.onload = function() {
    verificarStatusUsuario();
};
function verificarStatusUsuario() {
    const dadosSaves = localStorage.getItem('ultimoPost');
    const barraStatus = document.getElementById('userStatus');
    const nomeExibicao = document.getElementById('nomeExibicao');
    if (dadosSaves) {
        const dados = JSON.parse(dadosSaves);
        nomeExibicao.innerText = `Logado como: ${dados.nome}`;
        barraStatus.style.display = 'flex';
    } else {
        barraStatus.style.display = 'none';
    }
}
function deslogar() {
    if (confirm("Deseja realmente sair e limpar seus dados?")) {
        localStorage.removeItem('ultimoPost');
        location.reload();
    }
}
function abrirModalParaAlterar() {
    const dadosSaves = localStorage.getItem('ultimoPost');
    if (dadosSaves) {
        const dados = JSON.parse(dadosSaves);
        document.getElementById('nome').value = dados.nome;
        document.getElementById('cidade').value = dados.cidade;
        document.getElementById('material').value = dados.material;
        document.getElementById('modalOverlay').style.display = 'flex';
        document.body.classList.add('modal-aberto');
        document.getElementById('etapa1').style.display = 'none';
        document.getElementById('etapa2').style.display = 'block';
        document.getElementById('btnVoltar').style.visibility = 'visible';
        etapaAtual = 2;
    }
}
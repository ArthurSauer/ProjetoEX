document.addEventListener("DOMContentLoaded", function () {

    atualizarStatusFuncionamento();
    revealOnScroll();

    window.addEventListener("scroll", revealOnScroll);
});

function atualizarStatusFuncionamento() {
    const cards = document.querySelectorAll(".ponto-card");
    const agora = new Date();
    const diaSemana = agora.getDay();
    const horaAtual = agora.getHours();
    const minutoAtual = agora.getMinutes();
    const tempoAtualEmMinutos = horaAtual * 60 + minutoAtual;

    cards.forEach(card => {
        const badge = card.querySelector(".status-badge");
        if (!badge) return;
        
        if (diaSemana === 0) {
            configurarBadgeFechado(badge);
            return;
        }

        let horaAbertura, horaFechamento;

        if (diaSemana === 6) {
            horaAbertura = card.getAttribute("data-sabado");
            horaFechamento = card.getAttribute("data-sabado-fecha");
        } else {
            horaAbertura = card.getAttribute("data-abertura");
            horaFechamento = card.getAttribute("data-fechamento");
        }

        if (!horaAbertura || !horaFechamento) return;

        const [hAbre, mAbre] = horaAbertura.split(":").map(Number);
        const [hFecha, mFecha] = horaFechamento.split(":").map(Number);
        
        const minutosAbertura = hAbre * 60 + mAbre;
        const minutesFechamento = hFecha * 60 + mFecha;

        if (tempoAtualEmMinutos >= minutosAbertura && tempoAtualEmMinutos < minutesFechamento) {
            badge.textContent = "● Aberto agora";
            badge.className = "status-badge aberto";
        } else {
            configurarBadgeFechado(badge);
        }
    });
}

function configurarBadgeFechado(element) {
    element.textContent = "● Fechado";
    element.className = "status-badge fechado";
}


function revealOnScroll() {
    const elementos = document.querySelectorAll(".reveal");
    
    elementos.forEach(elemento => {
        const windowHeight = window.innerHeight;
        const elementTop = elemento.getBoundingClientRect().top;
        const elementVisible = 120;

        if (elementTop < windowHeight - elementVisible) {
            elemento.classList.add("active");
        }
    });
}
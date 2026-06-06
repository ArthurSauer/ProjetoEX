document.addEventListener("DOMContentLoaded", function () {

    window.addEventListener("scroll", revealOnScroll);

    revealOnScroll();
});

function revealOnScroll() {

    const elementos = document.querySelectorAll(".reveal");
    
    elementos.forEach(elemento => {
        const windowHeight = window.innerHeight;
        const elementTop = elemento.getBoundingClientRect().top;

        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            elemento.classList.add("active");
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const popupContainer = document.getElementById("popup-container");
    const btnFechar = document.getElementById("btn-fechar-popup");
    const conteudoCompleto = document.querySelector(".popup-conteudo-completo");
    const conteudoBalao = document.querySelector(".popup-conteudo-balao");


    btnFechar.addEventListener("click", function (e) {
        e.stopPropagation();
        minimizarPopup();
    });


    popupContainer.addEventListener("click", function () {
        if (popupContainer.classList.contains("minimizado")) {
            maximizarPopup();
        }
    });

    function minimizarPopup() {
        conteudoCompleto.classList.add("hidden");
        conteudoBalao.classList.remove("hidden");
        popupContainer.classList.add("minimizado");
    }

    function maximizarPopup() {
        popupContainer.classList.remove("minimizado");
        conteudoBalao.classList.add("hidden");
        conteudoCompleto.classList.remove("hidden");
    }
});
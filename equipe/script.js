document.addEventListener("DOMContentLoaded", function () {
    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);
});

function revealOnScroll() {
    const elementos = document.querySelectorAll(".reveal");
    
    elementos.forEach(elemento => {
        const windowHeight = window.innerHeight;
        const elementTop = elemento.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            elemento.classList.add("active");
        }
    });
}
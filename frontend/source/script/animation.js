/**
 * Apple-style Scroll Reveal System
 */
const setupRevealAnimations = () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Si c'est un conteneur avec stagger, on anime les enfants avec un délai
                if (entry.target.classList.contains('reveal-stagger')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
                
                // On arrête d'observer une fois l'animation lancée (one-shot)
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // On observe les éléments simples et les conteneurs progressifs
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        revealObserver.observe(el);
    });
};

/**
 * Mobile Navigation Logic
 */
const setupMobileMenu = () => {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menu');
    const links = menu.querySelectorAll('a');

    if (!hamburger || !menu) return;

    const toggleMenu = () => {
        const isOpen = menu.classList.toggle('is-open');
        hamburger.textContent = isOpen ? '✕' : '☰';
        document.body.style.overflow = isOpen ? 'hidden' : ''; // Empêche le scroll si ouvert
    };

    hamburger.addEventListener('click', toggleMenu);

    // Ferme le menu lors d'un clic sur un lien
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('is-open')) toggleMenu();
        });
    });
};

// Initialize all
document.addEventListener('DOMContentLoaded', () => {
    setupRevealAnimations();
    setupMobileMenu();
});

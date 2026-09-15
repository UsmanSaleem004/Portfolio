// Theme
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');

function getTheme() {
    const s = localStorage.getItem('theme');
    if (s) return s;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function setTheme(t) {
    html.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
}

setTheme(getTheme());

themeBtn.addEventListener('click', () => {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
});

menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('active');
    });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// 3D Tilt — all cards
const isTouch = 'ontouchstart' in window;

if (!isTouch) {
    const tiltCards = document.querySelectorAll('.stat, .skill, .exp, .proj, .edu, .cert, .c-card, .tilt');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        });
    });
}

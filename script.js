// ============================================================
// Navigation
// ============================================================

const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    backToTopButton.classList.toggle('visible', window.pageYOffset > 300);
    highlightActiveSection();
});

mobileMenuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!navLinksContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinksContainer.classList.remove('active');
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 90;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ============================================================
// Back to Top
// ============================================================

const backToTopButton = document.getElementById('back-to-top');

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// Terminal typewriter effect in hero
// ============================================================

const terminalCmd = document.getElementById('terminal-cmd');
const commands = [
    'connect --user michelfviana',
    'load profile.json',
    'deploy --env production',
    'git push origin main',
    'php artisan serve',
    'docker compose up -d',
];

let cmdIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 100;

function typeTerminal() {
    const current = commands[cmdIndex];

    if (!isDeleting) {
        terminalCmd.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            isDeleting = true;
            typeDelay = 2200;
        } else {
            typeDelay = 80 + Math.random() * 40;
        }
    } else {
        terminalCmd.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            cmdIndex = (cmdIndex + 1) % commands.length;
            typeDelay = 400;
        } else {
            typeDelay = 45;
        }
    }

    setTimeout(typeTerminal, typeDelay);
}

setTimeout(typeTerminal, 1200);

// ============================================================
// Scroll Reveal
// ============================================================

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

function setupReveal(selector, delay = 0) {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${delay + i * 0.08}s`;
        revealObserver.observe(el);
    });
}

setupReveal('.stat-card', 0);
setupReveal('.pillar-card', 0);
setupReveal('.timeline-item', 0);
setupReveal('.skill-group', 0);
setupReveal('.project-card', 0);
setupReveal('.edu-card', 0);
setupReveal('.achievement-card', 0);
setupReveal('.cert-card', 0);
setupReveal('.contact-card', 0);

// ============================================================
// Counter animation for stats
// ============================================================

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            let current = 0;
            const steps = 60;
            const increment = target / steps;
            const timer = setInterval(() => {
                current = Math.min(current + increment, target);
                el.textContent = Math.floor(current);
                if (current >= target) clearInterval(timer);
            }, 25);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value[data-target]').forEach(el => {
    counterObserver.observe(el);
});

// ============================================================
// Certification filter
// ============================================================

const filterBtns = document.querySelectorAll('.cert-filter');
const certCards = document.querySelectorAll('.cert-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        certCards.forEach(card => {
            if (filter === 'all' || card.dataset.cat === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ============================================================
// Ticker pause on hover
// ============================================================

const tickerTrack = document.querySelector('.ticker-track');
if (tickerTrack) {
    tickerTrack.addEventListener('mouseenter', () => {
        tickerTrack.style.animationPlayState = 'paused';
    });
    tickerTrack.addEventListener('mouseleave', () => {
        tickerTrack.style.animationPlayState = 'running';
    });
}

// ============================================================
// Subtle cursor glow effect on project cards
// ============================================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
    });
});

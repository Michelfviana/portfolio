// ============================================================
// Navigation
// ============================================================

const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');
const mobileNavigation = window.matchMedia('(max-width: 1100px)');
const isEnglish = document.documentElement.lang === 'en';
const menuLabels = isEnglish
    ? { open: 'Open menu', close: 'Close menu' }
    : { open: 'Abrir menu', close: 'Fechar menu' };

// Both static pages share section IDs; keep the current section on language changes.
document.querySelectorAll('.language-switch a').forEach(link => {
    link.addEventListener('click', () => {
        const destination = new URL(link.href);
        destination.hash = window.location.hash;
        link.href = destination.href;
    });
});

let scrollScheduled = false;
window.addEventListener('scroll', () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    window.requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        backToTopButton.classList.toggle('visible', window.scrollY > 300);
        highlightActiveSection();
        scrollScheduled = false;
    });
}, { passive: true });

function setMenuOpen(open) {
    navLinksContainer.classList.toggle('active', open);
    navLinksContainer.inert = mobileNavigation.matches && !open;
    mobileMenuBtn.setAttribute('aria-expanded', String(open));
    mobileMenuBtn.setAttribute('aria-label', open ? menuLabels.close : menuLabels.open);
}

setMenuOpen(false);
mobileNavigation.addEventListener('change', () => setMenuOpen(false));

mobileMenuBtn.addEventListener('click', () => {
    setMenuOpen(!navLinksContainer.classList.contains('active'));
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinksContainer.classList.contains('active')) {
        setMenuOpen(false);
        mobileMenuBtn.focus();
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        setMenuOpen(false);
    });
});

document.addEventListener('click', (e) => {
    if (!navLinksContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        setMenuOpen(false);
    }
});

// Native anchors preserve URL fragments, browser history and language-switch destinations.
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
        link.removeAttribute('aria-current');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'location');
        }
    });
}

// ============================================================
// Back to Top
// ============================================================

const backToTopButton = document.getElementById('back-to-top');

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
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

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion) {
    terminalCmd.textContent = commands[0];
} else {
    setTimeout(typeTerminal, 1200);
}

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
        el.style.transitionDelay = `${delay + (i % 4) * 0.08}s`;
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
            if (reducedMotion) {
                el.textContent = target;
                counterObserver.unobserve(el);
                return;
            }
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
// Search and category filters share the same behavior in both languages.
// ============================================================

function normalizeSearch(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function setupCatalog({ cardsSelector, buttonsSelector, inputId, countId, emptyId, categoryKey, textSelector, names }) {
    const cards = [...document.querySelectorAll(cardsSelector)];
    const buttons = [...document.querySelectorAll(buttonsSelector)];
    const input = document.getElementById(inputId);
    const search = input.closest('.catalog-search');
    const reset = search.querySelector('.catalog-reset');
    const count = document.getElementById(countId);
    const empty = document.getElementById(emptyId);
    const entries = cards.map(card => ({
        card,
        categories: card.dataset[categoryKey].split(/\s+/),
        text: normalizeSearch([...card.querySelectorAll(textSelector)].map(el => el.textContent).join(' ')),
    }));
    let category = 'all';

    function update() {
        const terms = normalizeSearch(input.value.trim()).split(/\s+/).filter(Boolean);
        let visible = 0;
        entries.forEach(entry => {
            const matchesCategory = category === 'all' || entry.categories.includes(category);
            const matchesSearch = terms.every(term => entry.text.includes(term));
            entry.card.hidden = !(matchesCategory && matchesSearch);
            if (!entry.card.hidden) visible++;
        });
        buttons.forEach(button => {
            const active = button.dataset.filter === category;
            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', String(active));
        });
        count.textContent = isEnglish
            ? `${visible} of ${cards.length} ${names.en}`
            : `${visible} de ${cards.length} ${names.pt}`;
        empty.hidden = visible !== 0;
    }

    buttons.forEach(button => button.addEventListener('click', () => {
        category = button.dataset.filter;
        update();
    }));
    input.addEventListener('input', update);
    reset.addEventListener('click', () => {
        input.value = '';
        category = 'all';
        update();
        input.focus();
    });
    search.hidden = false;
    buttons[0].parentElement.hidden = false;
    update();
}

setupCatalog({
    cardsSelector: '.project-card', buttonsSelector: '.project-filter',
    inputId: 'project-search', countId: 'projects-count', emptyId: 'projects-empty',
    categoryKey: 'category', textSelector: 'h3, .project-description, .tech-tag',
    names: { en: 'projects', pt: 'projetos' },
});
setupCatalog({
    cardsSelector: '.cert-card', buttonsSelector: '.cert-filter',
    inputId: 'cert-search', countId: 'certs-count', emptyId: 'certs-empty',
    categoryKey: 'cat', textSelector: '.cert-name, .cert-issuer-badge',
    names: { en: 'certificates', pt: 'certificados' },
});
highlightActiveSection();

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

// Desktop Linux visitors go straight to the web client; other devices keep click-to-chat.
const isLinuxDesktop = /Linux/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent);
if (isLinuxDesktop) {
    document.querySelectorAll('[data-whatsapp-phone]').forEach(link => {
        const destination = new URL('https://web.whatsapp.com/send');
        destination.searchParams.set('phone', link.dataset.whatsappPhone);
        link.href = destination.href;
        link.setAttribute('aria-label', isEnglish
            ? 'Chat with Michel Ferreira on WhatsApp Web'
            : 'Conversar com Michel Ferreira no WhatsApp Web');
        link.querySelector('.contact-label').textContent = 'WhatsApp Web';
    });
}

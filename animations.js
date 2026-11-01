// Motion adapted from the TopDarkFlames reference; the palette comes from styles.css.
(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
    const compactViewport = matchMedia('(max-height: 600px)');
    const palette = getComputedStyle(document.documentElement);
    const green = palette.getPropertyValue('--green').trim();
    const cyan = palette.getPropertyValue('--cyan').trim();
    const hero = document.querySelector('.hero');
    const panel = document.querySelector('.hero-visual');
    const signature = document.querySelector('.signature-scroll');
    const signatureCard = signature?.querySelector('.signature-card');
    const signatureCopy = signature?.querySelector('.signature-copy');

    // A light writes the name, then the name travels toward the navigation logo.
    // Decorative and skippable: it never captures focus or blocks a link.
    function playIntro() {
        if (preference.matches || location.hash || scrollY > 80) return;
        try {
            if (sessionStorage.getItem('mf-motion-intro')) return;
            sessionStorage.setItem('mf-motion-intro', '1');
        } catch (_) { /* Still play once on this page if storage is unavailable. */ }
        const intro = document.createElement('div');
        intro.className = 'motion-intro';
        intro.setAttribute('aria-hidden', 'true');
        intro.innerHTML = '<div class="motion-intro-name">Michel <em>Ferreira</em></div><div class="motion-intro-line"></div><div class="motion-intro-hint"></div>';
        intro.querySelector('.motion-intro-hint').textContent = document.documentElement.lang === 'en'
            ? 'click, scroll or press any key to skip' : 'clique, role ou pressione uma tecla para pular';
        document.body.append(intro);
        let done = false;
        const events = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
        function finish() {
            if (done) return;
            done = true;
            clearTimeout(timer);
            events.forEach(event => window.removeEventListener(event, finish));
            preference.removeEventListener('change', finish);
            const name = intro.querySelector('.motion-intro-name');
            const from = name.getBoundingClientRect();
            const to = document.querySelector('nav .logo')?.getBoundingClientRect();
            intro.classList.add('leaving');
            if (to && from.width && !preference.matches) {
                name.style.transform = `translate(${to.left - from.left}px,${to.top - from.top}px) scale(${to.width / from.width})`;
                name.style.opacity = '0';
            }
            setTimeout(() => intro.remove(), preference.matches ? 0 : 900);
        }
        const timer = setTimeout(finish, 2400);
        events.forEach(event => window.addEventListener(event, finish, { passive: true }));
        preference.addEventListener('change', finish);
        setTimeout(() => { if (intro.isConnected) { finish(); intro.remove(); } }, 5000);
    }
    playIntro();

    // Draw only the viewport. No canvas spans the full certificate catalogue.
    const canvas = document.createElement('canvas');
    canvas.className = 'motion-fibres';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
    const context = canvas.getContext('2d');
    const pointer = { x: -1000, y: -1000, strength: 0 };
    let width = 0, height = 0, frame = 0, previousTime = 0, smoothScroll = scrollY;
    let signatureDirty = true;
    const strands = Array.from({ length: 48 }, (_, i) => ({
        offset: i / 47 - .5,
        phase: i * 2.39996,
        color: i % 3 === 0 ? cyan : green,
        alpha: i % 9 === 0 ? .6 : .12 + (i % 5) * .035,
    }));
    function resize() {
        width = innerWidth; height = innerHeight;
        signatureDirty = true;
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
        context?.setTransform(dpr, 0, 0, dpr, 0, 0);
        requestFrame();
    }
    function drawFibres(time) {
        if (!context || preference.matches) return;
        context.clearRect(0, 0, width, height);
        const t = time / 1000;
        const scrollPhase = smoothScroll / Math.max(height, 1);
        const apexX = width * (.52 + .16 * Math.sin(scrollPhase * .55));
        const apexY = height * .57;
        const small = width < 700;
        const glow = context.createRadialGradient(apexX, apexY, 0, apexX, apexY, width * .55);
        glow.addColorStop(0, green + '22'); glow.addColorStop(.35, cyan + '0b'); glow.addColorStop(1, green + '00');
        context.fillStyle = glow; context.fillRect(0, 0, width, height);
        for (const strand of strands) {
            if (small && strand.phase % 3 > 1.5) continue;
            context.beginPath();
            for (let j = 0; j <= 72; j++) {
                const u = j / 72;
                const y = -height * .15 + height * 1.35 * u;
                const pinch = Math.abs(y - apexY) / height;
                const spread = 10 + pinch * pinch * width * 1.8;
                let x = apexX + Math.pow((y - apexY) / height, 2) * width * 1.8 + strand.offset * spread;
                x += Math.sin(u * 9 + strand.phase + t * 1.4) * pinch * 9;
                const dx = x - pointer.x, dy = y - pointer.y;
                const distance = Math.hypot(dx, dy);
                x += dx / (distance || 1) * Math.exp(-distance * distance / 26000) * pointer.strength * 25;
                if (j === 0) context.moveTo(x, y); else context.lineTo(x, y);
            }
            context.strokeStyle = strand.color;
            context.globalAlpha = strand.alpha * (small ? .6 : .8);
            context.lineWidth = .7;
            context.stroke();
            context.globalAlpha = .85;
            context.setLineDash([35 + strand.offset * 20, height * 1.2]);
            context.lineDashOffset = -t * (130 + strand.offset * 70) - strand.phase * 100;
            context.stroke();
            context.setLineDash([]);
        }
        // Small drifting particles around the fibre bundle.
        context.globalAlpha = .4;
        for (let i = 0; i < 18; i++) {
            const y = ((i * 137 - t * (12 + i % 6)) % height + height) % height;
            const x = apexX + Math.sin(i * 5.7 + t * .18) * width * .3;
            context.fillStyle = i % 2 ? green : cyan;
            context.beginPath(); context.arc(x, y, i % 4 === 0 ? 1.4 : .7, 0, Math.PI * 2); context.fill();
        }
        context.globalAlpha = 1;
    }
    if (signatureCopy) signatureCopy.inert = !preference.matches && !compactViewport.matches;

    function updateSignature() {
        if (!signatureCard) return;
        if (preference.matches || compactViewport.matches) {
            signature.classList.remove('motion-ready');
            signatureCard.style.removeProperty('width');
            signatureCard.style.removeProperty('height');
            signatureCopy.style.removeProperty('opacity');
            signatureCopy.style.removeProperty('transform');
            signatureCopy.inert = false;
            return;
        }
        signature.classList.add('motion-ready');
        const rect = signature.getBoundingClientRect();
        if (rect.top > height || rect.bottom < 0) return;
        const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, signature.offsetHeight - height)));
        const eased = progress * progress * (3 - 2 * progress);
        signatureCard.style.width = `${84 + (Math.min(width - 48, 1100) - 84) * eased}px`;
        signatureCard.style.height = `${84 + (Math.min(height * .76, 620) - 84) * eased}px`;
        signatureCopy.style.opacity = String(Math.max(0, (progress - .35) / .65));
        signatureCopy.style.transform = `translateY(${(1 - eased) * 35}px)`;
        // Prevent invisible links from receiving focus while the card is collapsed.
        signatureCopy.inert = progress < .6;
    }
    function tick(time) {
        frame = 0;
        if (document.hidden || preference.matches) return;
        // Limit the decorative canvas to 30 fps, including on high-refresh displays.
        if (time - previousTime >= 32) {
            previousTime = time;
            smoothScroll += (scrollY - smoothScroll) * .12;
            drawFibres(time);
            if (signatureDirty) {
                signatureDirty = false;
                updateSignature();
            }
        }
        requestFrame();
    }
    function requestFrame() {
        if (!frame && !preference.matches && !document.hidden) frame = requestAnimationFrame(tick);
    }
    function syncMotion() {
        cancelAnimationFrame(frame); frame = 0;
        if (preference.matches) {
            context?.clearRect(0, 0, width, height);
            resetSurfaces();
            if (signatureCopy) signatureCopy.inert = false;
        }
        if (signatureCopy) signatureCopy.inert = !preference.matches && !compactViewport.matches;
        updateSignature(); requestFrame();
    }
    addEventListener('resize', resize, { passive: true });
    addEventListener('scroll', () => { signatureDirty = true; }, { passive: true });
    compactViewport.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncMotion);
    preference.addEventListener('change', syncMotion);
    resize(); syncMotion();

    // Glass spotlights, card tilt, hero parallax and magnetic buttons.
    const surfaces = [...document.querySelectorAll('.project-card,.pillar-card,.skill-group,.contact-card,.code-window,.edu-card,.achievement-card')];
    surfaces.forEach(surface => surface.classList.add('motion-surface'));
    const buttons = [...document.querySelectorAll('.cta-btn')];
    function resetSurface(surface) {
        surface.classList.remove('motion-tilting');
        surface.classList.add('motion-resting');
        surface.style.setProperty('--spot-opacity', '0');
    }
    function resetSurfaces() {
        document.querySelectorAll('.motion-surface').forEach(resetSurface);
        document.querySelectorAll('.motion-magnetic').forEach(button => button.classList.remove('motion-magnetic'));
        panel?.classList.remove('motion-parallax');
    }
    surfaces.forEach(surface => {
        surface.addEventListener('pointermove', event => {
            if (preference.matches || !finePointer.matches || event.pointerType === 'touch') return;
            const rect = surface.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width, y = (event.clientY - rect.top) / rect.height;
            surface.style.setProperty('--spot-x', `${x * 100}%`);
            surface.style.setProperty('--spot-y', `${y * 100}%`);
            surface.style.setProperty('--spot-opacity', '1');
            if (!surface.closest('.hero')) {
                surface.classList.add('motion-tilting');
                surface.classList.remove('motion-resting');
                surface.style.setProperty('--tilt-x', `${(.5 - y) * 7}deg`);
                surface.style.setProperty('--tilt-y', `${(x - .5) * 9}deg`);
            }
        }, { passive: true });
        surface.addEventListener('pointerleave', () => resetSurface(surface));
        surface.addEventListener('pointercancel', () => resetSurface(surface));
    });
    buttons.forEach(button => {
        button.addEventListener('pointermove', event => {
            if (preference.matches || !finePointer.matches || event.pointerType === 'touch') return;
            const rect = button.getBoundingClientRect();
            button.classList.add('motion-magnetic'); button.classList.remove('motion-resting');
            button.style.setProperty('--magnet-x', `${(event.clientX - rect.left - rect.width / 2) * .22}px`);
            button.style.setProperty('--magnet-y', `${(event.clientY - rect.top - rect.height / 2) * .32}px`);
        }, { passive: true });
        button.addEventListener('pointerleave', () => {
            button.classList.remove('motion-magnetic'); button.classList.add('motion-resting');
        });
    });
    hero?.addEventListener('pointermove', event => {
        if (!panel || preference.matches || !finePointer.matches) return;
        const rect = hero.getBoundingClientRect();
        panel.classList.add('motion-settled', 'motion-parallax');
        panel.style.setProperty('--hero-x', `${(.5 - (event.clientY - rect.top) / rect.height) * 5}deg`);
        panel.style.setProperty('--hero-y', `${((event.clientX - rect.left) / rect.width - .5) * 7}deg`);
    }, { passive: true });
    hero?.addEventListener('pointerleave', () => panel?.classList.remove('motion-parallax'));
    document.documentElement.addEventListener('pointerleave', () => { pointer.strength = 0; });
    addEventListener('pointermove', event => {
        if (!finePointer.matches || preference.matches) return;
        pointer.x = event.clientX; pointer.y = event.clientY; pointer.strength = 1;
    }, { passive: true });
    finePointer.addEventListener('change', resetSurfaces);
})();

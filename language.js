// Choose a language before rendering; explicit visitor choices take priority.
(() => {
    const preferenceKey = 'portfolio-language';
    const isSupported = value => value === 'pt' || value === 'en';
    const current = new URL(window.location.href);

    function readPreference() {
        for (const storageName of ['localStorage', 'sessionStorage']) {
            try {
                const value = window[storageName].getItem(preferenceKey);
                if (isSupported(value)) return value;
            } catch (_) { /* Storage may be blocked by browser privacy settings. */ }
        }
        return null;
    }

    function savePreference(language) {
        let saved = false;
        for (const storageName of ['localStorage', 'sessionStorage']) {
            try {
                window[storageName].setItem(preferenceKey, language);
                saved = true;
            } catch (_) { /* The URL fallback keeps manual switching usable. */ }
        }
        return saved;
    }

    const requested = current.searchParams.get('lang');
    const browserLanguage = navigator.languages?.[0] || navigator.language || 'pt';
    const language = (isSupported(requested) && requested) || readPreference()
        || (/^pt(?:-|$)/i.test(browserLanguage) ? 'pt' : 'en');
    savePreference(language);

    const destination = new URL(language === 'pt' ? 'index.html' : 'en.html', current);
    destination.search = current.search;
    destination.hash = current.hash;
    const currentLanguage = document.documentElement.lang.toLowerCase().startsWith('pt') ? 'pt' : 'en';
    if (language !== currentLanguage) {
        window.location.replace(destination.href);
        return;
    }

    // Capture before script.js preserves scroll position and follows the link.
    document.addEventListener('click', event => {
        const link = event.target.closest?.('.language-switch a');
        if (!link || event.defaultPrevented) return;
        const chosen = link.lang.toLowerCase().startsWith('pt') ? 'pt' : 'en';
        const target = new URL(link.href, current);
        if (!savePreference(chosen)) target.searchParams.set('lang', chosen);
        link.href = target.href;
    }, true);
})();

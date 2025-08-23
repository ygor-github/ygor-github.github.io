let translations = {};

document.addEventListener('DOMContentLoaded', () => {
    // Fetch translations
    fetch('data/translations.json')
        .then(response => response.json())
        .then(data => {
            translations = data;
            // Set initial language
            const initialLang = navigator.language.split('-')[0] || 'es';
            changeLanguage(initialLang);
        })
        .catch(error => console.error('Error loading translations:', error));
});

function changeLanguage(lang) {
    if (translations[lang]) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
    } else {
        console.warn(`Language '${lang}' not found. Defaulting to 'es'.`);
        if (lang !== 'es') {
            changeLanguage('es');
        }
    }
}

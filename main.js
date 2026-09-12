/**
 * Pulse.ai - Main JavaScript Interactive Logic
 * Built for ThemeForest HTML5 templates
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Pulse.ai Template Initialized Successfully (Dark Mode Active).');

    // Smooth scrolling enhancement for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple form submission feedback handler for contact & auth inputs
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            // Let default actions or redirects happen if specified, 
            // otherwise show a clean interactive confirmation log.
            console.log('Form submission intercepted successfully.');
        });
    });
});

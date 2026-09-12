document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Switcher (Dark / Light)
    const currentTheme = localStorage.getItem('pulse-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const active = document.documentElement.getAttribute('data-theme');
            const target = active === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem('pulse-theme', target);
            updateThemeIcon(target);
        });
    });

    function updateThemeIcon(theme) {
        document.querySelectorAll('.theme-icon').forEach(icon => {
            icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
        });
        if (window.lucide) lucide.createIcons();
    }

    // 2. RTL Direction Switcher
    const currentDir = localStorage.getItem('pulse-dir') || 'ltr';
    document.documentElement.setAttribute('dir', currentDir);
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const active = document.documentElement.getAttribute('dir');
            const target = active === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', target);
            localStorage.setItem('pulse-dir', target);
        });
    });

    // 3. Mobile Navigation Drawer
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.add('hidden')));
    }

    // 4. Billing Switcher (Monthly / Annual)
    const billingToggle = document.getElementById('billing-toggle');
    const priceAmounts = document.querySelectorAll('.price-amount');
    const billingPeriods = document.querySelectorAll('.billing-period');

    if (billingToggle) {
        billingToggle.addEventListener('change', () => {
            const isAnnual = billingToggle.checked;
            priceAmounts.forEach(el => {
                const monthly = el.getAttribute('data-monthly');
                const annual = el.getAttribute('data-annual');
                el.textContent = isAnnual ? annual : monthly;
            });
            billingPeriods.forEach(el => {
                el.textContent = isAnnual ? '/mo (billed annually)' : '/month';
            });
        });
    }

    // 5. Live ROI Calculator
    const teamRange = document.getElementById('team-range');
    const reqRange = document.getElementById('req-range');
    const teamValue = document.getElementById('team-value');
    const reqValue = document.getElementById('req-value');
    const hoursSaved = document.getElementById('calc-hours-saved');
    const dollarsSaved = document.getElementById('calc-dollars-saved');

    function updateCalculator() {
        if (!teamRange || !reqRange) return;
        const engineers = parseInt(teamRange.value, 10);
        const millions = parseFloat(reqRange.value);

        if (teamValue) teamValue.textContent = engineers + ' Engineers';
        if (reqValue) reqValue.textContent = millions + 'M Inferences';

        const computedHours = Math.round((engineers * 28) + (millions * 22));
        const estimatedDollars = Math.round(computedHours * 85);

        if (hoursSaved) hoursSaved.textContent = computedHours.toLocaleString() + ' hrs';
        if (dollarsSaved) dollarsSaved.textContent = '$' + estimatedDollars.toLocaleString();
    }

    if (teamRange && reqRange) {
        teamRange.addEventListener('input', updateCalculator);
        reqRange.addEventListener('input', updateCalculator);
        updateCalculator();
    }

    // 6. Integrations Filter & Search
    const filterBtns = document.querySelectorAll('.filter-btn');
    const integrationCards = document.querySelectorAll('.integration-card');
    const searchInput = document.getElementById('integration-search');

    function filterIntegrations() {
        const activeCategory = document.querySelector('.filter-btn.active')?.getAttribute('data-category') || 'all';
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

        integrationCards.forEach(card => {
            const cat = card.getAttribute('data-category');
            const name = card.getAttribute('data-name')?.toLowerCase() || '';
            const matchCategory = (activeCategory === 'all' || cat === activeCategory);
            const matchQuery = (!query || name.includes(query));

            if (matchCategory && matchQuery) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterIntegrations();
        });
    });

    if (searchInput) searchInput.addEventListener('input', filterIntegrations);

    // 7. Interactive Tab Switcher
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabPanes.forEach(p => {
                if (p.id === target) {
                    p.classList.remove('hidden');
                } else {
                    p.classList.add('hidden');
                }
            });
        });
    });

    // 8. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        if (header && content) {
            header.addEventListener('click', () => {
                const isOpen = !content.classList.contains('hidden');
                document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
                document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

                if (!isOpen) {
                    content.classList.remove('hidden');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });

    // 9. Back to Top Button
    const btt = document.getElementById('back-to-top');
    if (btt) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                btt.classList.remove('hidden-btn');
            } else {
                btt.classList.add('hidden-btn');
            }
        });
        btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // 10. Command Palette Modal (Ctrl/Cmd + K)
    const cmdModal = document.getElementById('command-palette');
    const cmdTrigger = document.getElementById('cmd-palette-btn');
    const cmdClose = document.getElementById('cmd-palette-close');

    function toggleCmd() {
        if (cmdModal) cmdModal.classList.toggle('hidden');
    }

    if (cmdTrigger) cmdTrigger.addEventListener('click', toggleCmd);
    if (cmdClose) cmdClose.addEventListener('click', toggleCmd);

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            toggleCmd();
        }
        if (e.key === 'Escape' && cmdModal && !cmdModal.classList.contains('hidden')) {
            toggleCmd();
        }
    });

    // 11. Cookie Consent Banner
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    if (cookieBanner && !localStorage.getItem('pulse-cookie-consent')) {
        cookieBanner.classList.remove('hidden');
    }
    if (cookieAccept && cookieBanner) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('pulse-cookie-consent', 'accepted');
            cookieBanner.classList.add('hidden');
        });
    }

    // 12. Code Clipboard Copier
    document.querySelectorAll('.copy-code-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                navigator.clipboard.writeText(targetEl.textContent.trim()).then(() => {
                    const original = btn.innerHTML;
                    btn.innerHTML = '<span class="text-emerald-400">Copied!</span>';
                    setTimeout(() => btn.innerHTML = original, 2000);
                });
            }
        });
    });

    // 13. Form Submission Interceptor
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            if (!btn) return;
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span>Processing Request...</span>';

            setTimeout(() => {
                btn.innerHTML = '<span>✓ Operation Successful</span>';
                btn.classList.add('bg-emerald-600');
                form.reset();
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                    btn.classList.remove('bg-emerald-600');
                }, 2800);
            }, 850);
        });
    });

    // 14. Lucide Init
    if (window.lucide) lucide.createIcons();
});

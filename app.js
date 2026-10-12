/* ============================================================
   İSMAİL ÖKSÜZ — ORTAK SCRIPT
   ============================================================ */

/* ===== YÜKLEME EKRANI ===== */
(function () {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;
    let closed = false, minTimePassed = false, resourcesReady = false;

    function tryHide() {
        if (closed || !minTimePassed || !resourcesReady) return;
        closed = true;
        loader.classList.add('is-hidden');
        document.body.classList.remove('loading');
        setTimeout(() => loader.remove(), 800);
    }

    setTimeout(() => { minTimePassed = true; tryHide(); }, 700);
    function onReady() { resourcesReady = true; tryHide(); }
    if (document.readyState === 'complete') onReady();
    else window.addEventListener('load', onReady);
    setTimeout(() => { minTimePassed = true; resourcesReady = true; tryHide(); }, 4500);
})();

/* ===== DİNAMİK HEADER ===== */
(function () {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const sections = document.querySelectorAll('.snap-section');

    function updateNavTheme() {
        const probeY = window.scrollY + window.innerHeight * 0.5;
        let theme = 'light';
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (probeY >= top && probeY < bottom) {
                theme = section.dataset.theme || 'light';
            }
        });
        nav.classList.toggle('theme-dark', theme === 'dark');
        nav.classList.toggle('theme-light', theme !== 'dark');
    }
    window.addEventListener('scroll', updateNavTheme, { passive: true });
    window.addEventListener('resize', updateNavTheme);
    updateNavTheme();
})();

/* ===== REVEAL ===== */
(function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
            } else {
                entry.target.querySelectorAll('.reveal').forEach(el => el.classList.remove('visible'));
            }
        });
    }, { threshold: 0.4 });
    document.querySelectorAll('.snap-section').forEach(s => observer.observe(s));
})();

/* ===== MOBİL MENÜ ===== */
(function () {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!menuToggle || !mobileMenu) return;
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-xmark');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-xmark');
        });
    });
})();

/* ===== SHOWCASE (YATAY NAVİGASYON) — çoklu ===== */
(function () {
    const showcases = document.querySelectorAll('[data-showcase]');
    if (!showcases.length) return;

    function setupShowcase(showcase) {
        const track = showcase.querySelector('[data-track]');
        if (!track) return;
        const allChapters = track.querySelectorAll('.chapter');
        const projectChapters = track.querySelectorAll('.chapter:not(.chapter-final)');
        const currentNum = showcase.querySelector('[data-current]');
        const totalNum = showcase.querySelector('[data-total]');
        const progressFill = showcase.querySelector('[data-progress]');
        const prevBtn = showcase.querySelector('[data-prev]');
        const nextBtn = showcase.querySelector('[data-next]');

        const total = allChapters.length;
        const projectTotal = projectChapters.length;

        let idx = 0;
        let isActive = false;
        let locked = false;

        if (totalNum) totalNum.textContent = String(projectTotal).padStart(2, '0');

        function update() {
            if (window.matchMedia('(max-width: 767px)').matches) return;
            track.style.transform = `translateX(-${idx * 100}%)`;
            if (currentNum) {
                if (idx < projectTotal) {
                    currentNum.textContent = String(idx + 1).padStart(2, '0');
                } else {
                    currentNum.textContent = '→';
                }
            }
            if (progressFill) progressFill.style.width = ((idx + 1) / total * 100) + '%';
            if (prevBtn) prevBtn.disabled = idx === 0;
            if (nextBtn) nextBtn.disabled = idx === total - 1;
        }

        function goTo(i) {
            idx = Math.max(0, Math.min(total - 1, i));
            update();
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(idx - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(idx + 1));

        showcase.addEventListener('wheel', (e) => {
            if (window.matchMedia('(max-width: 767px)').matches) return;
            if (!isActive) return;
            const goingDown = e.deltaY > 0;
            const goingUp = e.deltaY < 0;
            if (goingDown && idx === total - 1) return;
            if (goingUp && idx === 0) return;
            e.preventDefault();
            if (locked) return;
            locked = true;
            setTimeout(() => locked = false, 850);
            if (goingDown) goTo(idx + 1);
            else goTo(idx - 1);
        }, { passive: false });

        document.addEventListener('keydown', (e) => {
            if (window.matchMedia('(max-width: 767px)').matches) return;
            if (!isActive) return;
            if (e.key === 'ArrowRight') { e.preventDefault(); goTo(idx + 1); }
            if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(idx - 1); }
        });

        let tx = 0, ty = 0;
        showcase.addEventListener('touchstart', (e) => {
            if (window.matchMedia('(max-width: 767px)').matches) return;
            tx = e.touches[0].clientX;
            ty = e.touches[0].clientY;
        }, { passive: true });
        showcase.addEventListener('touchend', (e) => {
            if (window.matchMedia('(max-width: 767px)').matches) return;
            const dx = e.changedTouches[0].clientX - tx;
            const dy = e.changedTouches[0].clientY - ty;
            if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
                if (dx < 0) goTo(idx + 1);
                else goTo(idx - 1);
            }
        }, { passive: true });

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(en => {
                isActive = en.isIntersecting && en.intersectionRatio > 0.5;
            });
        }, { threshold: [0, 0.5, 1] });
        obs.observe(showcase);

        update();
    }

    showcases.forEach(setupShowcase);
})();

/* ===== PDF ÖNİZLEMELERİ ===== */
(function () {
    if (typeof pdfjsLib === 'undefined') return;
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    function renderPdfCanvas(canvas) {
        const url = canvas.dataset.pdf;
        pdfjsLib.getDocument(url).promise
            .then(pdf => pdf.getPage(1))
            .then(page => {
                const container = canvas.parentElement;
                const cw = container.clientWidth;
                const ch = container.clientHeight;
                if (cw === 0 || ch === 0) return;

                const base = page.getViewport({ scale: 1 });
                const scale = Math.max(cw / base.width, ch / base.height);
                const viewport = page.getViewport({ scale });
                canvas.width = cw;
                canvas.height = ch;
                canvas.style.width = '100%';
                canvas.style.height = '100%';

                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, cw, ch);
                ctx.translate((cw - viewport.width) / 2, (ch - viewport.height) / 2);
                return page.render({ canvasContext: ctx, viewport }).promise;
            })
            .then(() => {
                const spinner = canvas.parentElement.querySelector('.media-spinner');
                if (spinner) spinner.classList.add('is-hidden');
            })
            .catch(err => {
                console.warn('PDF önizleme yüklenemedi:', url, err);
                const p = canvas.parentElement;
                p.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-red-400">
                    <i class="fas fa-file-pdf text-4xl mb-2"></i>
                    <span class="text-[10px] uppercase tracking-widest">PDF</span>
                </div>`;
            });
    }

    const pdfObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.rendered) {
                entry.target.dataset.rendered = '1';
                renderPdfCanvas(entry.target);
                pdfObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('canvas[data-pdf]').forEach(c => pdfObserver.observe(c));

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.querySelectorAll('canvas[data-pdf]').forEach(c => {
                c.dataset.rendered = '1';
                renderPdfCanvas(c);
            });
        }, 250);
    });
})();

/* ===== KART İÇİ YÜKLEME ===== */
(function () {
    document.querySelectorAll('img, canvas[data-pdf]').forEach(el => {
        const parent = el.parentElement;
        if (!parent || parent.querySelector('.media-spinner')) return;
        parent.classList.add('media-wrap');
        if (parent.closest('[data-theme="dark"]') || parent.closest('.bg-black')) {
            parent.classList.add('dark-media');
        }
        const spinner = document.createElement('div');
        spinner.className = 'media-spinner';
        spinner.innerHTML = '<div class="spinner-ring"></div>';
        parent.appendChild(spinner);
    });

    document.querySelectorAll('img').forEach(img => {
        function reveal() {
            const spinner = img.parentElement.querySelector('.media-spinner');
            if (spinner) spinner.classList.add('is-hidden');
        }
        if (img.complete && img.naturalWidth > 0) reveal();
        else {
            img.addEventListener('load', reveal);
            img.addEventListener('error', reveal);
        }
    });
})();
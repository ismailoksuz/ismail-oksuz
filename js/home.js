(function () {
    const track = document.getElementById('certMarqueeTrack');
    if (!track || typeof CERTIFICATES === 'undefined') return;
    const visualCerts = CERTIFICATES;
    function shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    function buildItem(c) {
        const href = c.url || c.img;
        return `<a href="${href}" target="_blank" rel="noopener" class="cert-marquee-item">
            <img src="${c.img}"
                 alt="${c.name || 'Sertifika'}"
                 decoding="async"
                 referrerpolicy="no-referrer">
        </a>`;
    }
    const shuffled = shuffle(visualCerts);
    const oneSet = shuffled.map(buildItem).join('');
    track.innerHTML = oneSet + oneSet;
    track.querySelectorAll('.cert-marquee-item img').forEach(img => {
        if (img.complete && img.naturalWidth > 0) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
            img.addEventListener('error', () => img.classList.add('loaded'));
        }
    });
    const durationSec = 240;
    track.style.animationDelay = -(Math.random() * durationSec) + 's';
})();
(function () {
    const gallery = document.getElementById('gallery');
    if (!gallery || typeof CERTIFICATES === 'undefined') return;
    const totalCount = document.getElementById('totalCount');
    if (totalCount) totalCount.textContent = CERTIFICATES.length;
    function esc(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }
    gallery.innerHTML = CERTIFICATES.map(c => {
        const href = c.url || c.img;
        const media = `<img src="${c.img}" alt="${esc(c.name)}" loading="lazy" class="w-full h-auto block">`;
        const metaLine = c.date
            ? `<p class="text-xs text-gray-500">${c.date} · ${esc(c.company)}</p>`
            : `<p class="text-xs text-gray-500">${esc(c.company)}</p>`;
        const credentialLine = c.credential
            ? `<p class="text-[11px] text-gray-400 font-mono mt-1.5 break-all">ID: ${c.credential}</p>`
            : '';
        return `
            <a href="${href}" target="_blank" rel="noopener"
               class="cert-item group block bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div class="bg-white overflow-hidden">
                    ${media}
                </div>
                <div class="px-4 py-4 border-t border-gray-100">
                    <h3 class="text-sm font-semibold text-gray-900 leading-snug group-hover:text-[#0077B6] transition mb-1">
                        ${esc(c.name)}
                    </h3>
                    ${metaLine}
                    ${credentialLine}
                </div>
            </a>
        `;
    }).join('');
})();
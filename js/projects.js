(function () {
    const list = document.getElementById('projList');
    if (!list || typeof PROJECTS === 'undefined') return;
    const totalCount = document.getElementById('totalCount');
    if (totalCount) totalCount.textContent = PROJECTS.length;
    function esc(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }
    function renderRow(p) {
        const tagsHtml = p.tags.slice(0, 3).map(t =>
            `<span class="text-[10px] uppercase tracking-wider text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">${esc(t)}</span>`
        ).join('');
        const linkHtml = p.url
            ? `<span class="shrink-0 ml-4 text-gray-300 group-hover:text-[#0077B6] transition">
                   <i class="fas fa-arrow-up-right-from-square text-sm"></i>
               </span>`
            : `<span class="shrink-0 ml-4 text-gray-300"><i class="fas fa-lock text-xs"></i></span>`;
        const wrapper = p.url ? 'a' : 'div';
        const hrefAttr = p.url ? `href="${esc(p.url)}" target="_blank" rel="noopener"` : '';
        const star = p.starred
            ? `<span class="shrink-0 text-[#0077B6] mr-3" title="Öne çıkan"><i class="fas fa-star text-xs"></i></span>`
            : '';
        return `
            <${wrapper} ${hrefAttr}
               class="proj-row group flex items-center justify-between gap-4 py-5 border-b border-gray-200 ${p.url ? 'cursor-pointer' : 'cursor-default'}">
                <div class="flex items-start min-w-0 flex-1">
                    ${star}
                    <div class="min-w-0 flex-1">
                        <h3 class="text-base font-semibold text-gray-900 leading-snug ${p.url ? 'group-hover:text-[#0077B6] transition' : ''} mb-1">
                            ${esc(p.name)}
                        </h3>
                        <p class="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-2">
                            ${esc(p.desc)}
                        </p>
                        <div class="flex flex-wrap gap-1.5">
                            ${tagsHtml}
                        </div>
                    </div>
                </div>
                ${linkHtml}
            </${wrapper}>
        `;
    }
    list.innerHTML = PROJECTS.map(renderRow).join('');
})();
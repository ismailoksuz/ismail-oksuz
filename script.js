function toggleDrawer() {
    const drawer = document.getElementById('drawer');
    const backdrop = document.getElementById('backdrop');
    drawer.classList.toggle('open');
    backdrop.classList.toggle('open');
}

function closeDrawer() {
    const drawer = document.getElementById('drawer');
    const backdrop = document.getElementById('backdrop');
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
}

// Tüm menü bağlantılarını dinle ve kaydırma işlemini düzelt
document.querySelectorAll('#drawer .menu-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Tarayıcının varsayılan hareketini (sayfanın başına atlamayı) engelle
        e.preventDefault(); 
        
        closeDrawer();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Hedef bölüme akıcı bir şekilde kaydır
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Sayfa kaydırmaya başlanacak konum (yukarıda)
            });
        }
    });
});

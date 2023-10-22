// Bölüm numaralarını başlat
var currentSection = 1;

// Sayfa yüklenirken çalışacak fonksiyon
window.onload = function() {
    window.addEventListener('scroll', function() {
        // Kullanıcı aşağı kaydıysa
        if (window.scrollY > 0) {
            currentSection++;
            if (currentSection > 4) {
                currentSection = 4;
            }
            scrollToSection(currentSection);
        }
    });
}

// Belirli bir bölüme kaydırmak için bir fonksiyon
function scrollToSection(section) {
    window.location.hash = "bolum" + section;
}


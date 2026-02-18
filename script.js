/**
 * SKRIPTA - Animacije
 * Ovaj JavaScript se povezuje s index.html pomoću <script src="script.js"></script>
 */

// ========== 1. BILJEŠKE SA PREDAVANJA - skrola do dna, pa natrag na prvu lekciju ==========
document.getElementById('biljeske-link').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  setTimeout(function() {
    document.getElementById('css-html').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 1500);
});

// ========== 2. SMOOTH SCROLL - glatko skrolanje kad klikneš link u sidebaru ==========
document.querySelectorAll('.list-group-item a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    var cilj = document.querySelector(this.getAttribute('href'));
    if (cilj) {
      cilj.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========== 3. FADE-IN ANIMACIJA - kartice se pojavljuju kad dođu u view ==========
// Dodajemo klasu za sakrivanje kartica na početku
var kartice = document.querySelectorAll('main .card');
kartice.forEach(function(kartica) {
  kartica.style.opacity = '0';
  kartica.style.transform = 'translateY(30px)';
  kartica.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Funkcija koja provjerava je li element vidljiv na ekranu
function jeVidljivo(element) {
  var rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight - 100;
}

// Funkcija koja animira kartice kad uđu u view
function animirajKartice() {
  kartice.forEach(function(kartica, index) {
    if (jeVidljivo(kartica)) {
      setTimeout(function() {
        kartica.style.opacity = '1';
        kartica.style.transform = 'translateY(0)';
      }, index * 80); // mala odgoda između svake kartice
    }
  });
}

// Pokreni kad se stranica učita i kad korisnik skrola
animirajKartice();
window.addEventListener('scroll', animirajKartice);

// ========== 4. NAVBAR - mijenja se na skrol ==========
var navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('shadow'); // dodaje sjenku navbaru
  } else {
    navbar.classList.remove('shadow');
  }
});

// ========== 5. HOVER NA KARTICAMA - malo se povećaju kad pređeš mišem ==========
kartice.forEach(function(kartica) {
  kartica.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(0) scale(1.02)';
    this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  });
  kartica.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '';
  });
});

// ========== 6. OZNAČI AKTIVNU SEKCIJU U SIDEBARU ==========
var sidebarLinkovi = document.querySelectorAll('.list-group-item a');
window.addEventListener('scroll', function() {
  var trenutnaSekcija = '';
  var sekcije = document.querySelectorAll('section[id]');
  
  sekcije.forEach(function(sekcija) {
    var rect = sekcija.getBoundingClientRect();
    if (rect.top <= 150) {
      trenutnaSekcija = sekcija.getAttribute('id');
    }
  });
  
  sidebarLinkovi.forEach(function(link) {
    link.style.fontWeight = 'normal';
    link.style.color = '#a5b4fc';
    if (link.getAttribute('href') === '#' + trenutnaSekcija) {
      link.style.fontWeight = 'bold';
      link.style.color = '#c4b5fd';
    }
  });
});

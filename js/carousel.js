const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;

function updateCarousel() {
  const width = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * width}px)`;
}

// Só ativa botões no desktop
function enableDesktopNav() {
  if (window.innerWidth >= 768) {
    nextBtn.style.display = "flex";
    prevBtn.style.display = "flex";

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  } else {
    // Mobile: remove transform, deixa scroll natural
    track.style.transform = "none";
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
  }
}

enableDesktopNav();
window.addEventListener("resize", enableDesktopNav);

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;

function updateCarousel() {
  const width = slides[0].offsetWidth;
  track.style.transform = `translateX(-${currentIndex * width}px)`;
}

function enableDesktopNav() {
  const isDesktop = window.innerWidth >= 1200;

  if (isDesktop) {
    nextBtn.style.display = "flex";
    prevBtn.style.display = "flex";

    nextBtn.onclick = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    };

    prevBtn.onclick = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    };

    updateCarousel();

  } else {
    track.style.transform = "none";
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
  }
}

enableDesktopNav();
window.addEventListener("resize", enableDesktopNav);

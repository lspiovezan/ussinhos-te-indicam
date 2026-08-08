const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;

/* ============================
   MOVE PARA O SLIDE CORRETO
============================ */
function updateCarousel() {
  const width = slides[0].offsetWidth;
  track.style.transform = `translateX(-${currentIndex * width}px)`;
  updateThumbs();
}

/* ============================
   MINIATURAS NO DESKTOP
============================ */
function createThumbnails() {
  const isDesktop = window.innerWidth >= 1200;
  if (!isDesktop) return;

  // Se já existe, não recria
  if (document.querySelector('.carousel-thumbs')) return;

  const thumbsContainer = document.createElement('div');
  thumbsContainer.className = 'carousel-thumbs';

  slides.forEach((slide, index) => {
    const thumb = document.createElement('img');
    thumb.src = slide.src;
    thumb.className = 'carousel-thumb';
    thumb.onclick = () => {
      currentIndex = index;
      updateCarousel();
    };
    thumbsContainer.appendChild(thumb);
  });

  track.parentElement.appendChild(thumbsContainer);
  updateThumbs();
}

function updateThumbs() {
  const thumbs = document.querySelectorAll('.carousel-thumb');
  thumbs.forEach((thumb, index) => {
    thumb.classList.toggle('active', index === currentIndex);
  });
}

/* ============================
   BOTÕES (somente mobile/tablet)
============================ */
function enableDesktopNav() {
  const isDesktop = window.innerWidth >= 1200;

  if (isDesktop) {
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
    createThumbnails();
    updateCarousel();

  } else {
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

    track.style.transform = "none";
  }
}

enableDesktopNav();
window.addEventListener("resize", enableDesktopNav);

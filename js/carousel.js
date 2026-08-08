const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;

/* ============================================================
   MODO MOBILE/TABLET — SEM TRANSFORM
============================================================ */
function enableMobileMode() {
  track.style.transform = "none";
  track.style.overflowX = "auto";

  nextBtn.style.display = "none";
  prevBtn.style.display = "none";

  // remove miniaturas se existirem
  const thumbs = document.querySelector('.carousel-thumbs');
  if (thumbs) thumbs.remove();
}

/* ============================================================
   MODO DESKTOP — TRANSFORM + MINIATURAS
============================================================ */
function enableDesktopMode() {
  track.style.overflowX = "hidden";

  nextBtn.style.display = "none";
  prevBtn.style.display = "none";

  createThumbnails();
  updateCarousel();
}

/* ============================================================
   MINIATURAS
============================================================ */
function createThumbnails() {
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

/* ============================================================
   ATUALIZA SLIDE NO DESKTOP
============================================================ */
function updateCarousel() {
  const width = track.offsetWidth; // largura REAL do carrossel
  track.style.transform = `translateX(-${currentIndex * width}px)`;
  updateThumbs();
}

/* ============================================================
   TROCA AUTOMÁTICA ENTRE MODOS
============================================================ */
function updateMode() {
  const isDesktop = window.innerWidth >= 1200;

  if (isDesktop) {
    enableDesktopMode();
  } else {
    enableMobileMode();
  }
}

/* ============================================================
   OBSERVA MUDANÇAS DE TAMANHO
============================================================ */
const resizeObserver = new ResizeObserver(() => {
  const isDesktop = window.innerWidth >= 1200;
  if (isDesktop) updateCarousel();
});

resizeObserver.observe(track);

/* ============================================================
   INICIALIZAÇÃO
============================================================ */
updateMode();
window.addEventListener("resize", updateMode);

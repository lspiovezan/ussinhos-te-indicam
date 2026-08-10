/* ============================================================
   SUPORTE A MÚLTIPLOS CARROSSEIS
============================================================ */

document.querySelectorAll('.carousel').forEach(carousel => {

  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  let currentIndex = 0;

  /* ============================================================
     MOVE PARA O SLIDE CORRETO (DESKTOP)
  ============================================================ */
  function updateCarousel() {
    const width = track.clientWidth;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
    updateThumbs?.();
  }

  /* ============================================================
     MOBILE/TABLET — SCROLL NATURAL
  ============================================================ */
  function enableMobileMode() {
    track.style.transform = "none";
    track.style.overflowX = "auto";

    const thumbs = carousel.querySelector('.carousel-thumbs');
    if (thumbs) thumbs.remove();

    const preview = carousel.querySelector(".carousel-preview");
    if (preview) preview.remove();

    slides.forEach(img => img.style.display = "block");
  }

  /* ============================================================
     DESKTOP — MINIATURAS + PREVIEW
  ============================================================ */
  function enableDesktopMode() {
    track.style.overflowX = "hidden";

    slides.forEach(img => img.style.display = "none");

    createThumbnails();
    createPreviewContainer();

    showImageAboveThumbnails(slides[0].src);

    updateCarousel();
  }

  /* ============================================================
     CRIA O CONTAINER PARA A IMAGEM GRANDE
  ============================================================ */
  function createPreviewContainer() {
    if (carousel.querySelector(".carousel-preview")) return;

    const preview = document.createElement("div");
    preview.className = "carousel-preview";
    preview.style.width = "100%";
    preview.style.textAlign = "center";
    preview.style.margin = "20px 0";
    preview.style.display = "block";

    carousel.insertBefore(preview, carousel.querySelector(".carousel-thumbs"));
  }

  /* ============================================================
     MOSTRA A IMAGEM CLICADA ACIMA DAS MINIATURAS
  ============================================================ */
  function showImageAboveThumbnails(src) {
    const preview = carousel.querySelector(".carousel-preview");
    if (!preview) return;

    preview.innerHTML = `
      <img src="${src}"
           style="
             height: 80vh;
             width: auto;
             max-width: 95%;
             object-fit: contain;
             border-radius: 12px;
             box-shadow: 0 4px 12px rgba(0,0,0,0.25);
           "
      />
    `;
  }

  /* ============================================================
     MINIATURAS
  ============================================================ */
  function createThumbnails() {
    if (carousel.querySelector('.carousel-thumbs')) return;

    const thumbsContainer = document.createElement('div');
    thumbsContainer.className = 'carousel-thumbs';

    slides.forEach((slide, index) => {
      const thumb = document.createElement('img');
      thumb.src = slide.src;
      thumb.className = 'carousel-thumb';

      thumb.onclick = () => {
        currentIndex = index;
        updateCarousel();
        showImageAboveThumbnails(slide.src);
      };

      thumbsContainer.appendChild(thumb);
    });

    carousel.appendChild(thumbsContainer);
    updateThumbs();
  }

  function updateThumbs() {
    const thumbs = carousel.querySelectorAll('.carousel-thumb');
    thumbs.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === currentIndex);
    });
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

});

document.addEventListener("DOMContentLoaded", () => {
  const insideHtml = window.location.pathname.includes("/html/");
  const headerPath = insideHtml ? "header-pages.html" : "header-index.html";

  fetch(headerPath)
    .then(r => r.text())
    .then(html => {
      document.body.insertAdjacentHTML("afterbegin", html);

      const menuToggle = document.querySelector(".menu-toggle");
      const menu = document.querySelector(".menu");

      // Overlay invisível para mobile
      const overlay = document.createElement("div");
      overlay.classList.add("menu-overlay");
      document.body.appendChild(overlay);

      if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
          const isOpen = menu.classList.toggle("show");
          document.body.classList.toggle("menu-open", isOpen);
          overlay.classList.toggle("show", isOpen);
        });

        overlay.addEventListener("click", () => {
          menu.classList.remove("show");
          document.body.classList.remove("menu-open");
          overlay.classList.remove("show");
        });
      }

      // Submenus no mobile
      document.querySelectorAll(".menu-item.has-submenu > a").forEach(link => {
        link.addEventListener("click", e => {
          if (window.innerWidth < 700) {
            e.preventDefault();
            const parent = link.parentElement;
            document.querySelectorAll(".menu-item.has-submenu").forEach(item => {
              if (item !== parent) item.classList.remove("open");
            });
            parent.classList.toggle("open");
          }
        });
      });

      // Submenus no desktop (abrir/fechar level2 com setas)
      document.querySelectorAll(".submenu-item.has-submenu > a").forEach(link => {
        link.addEventListener("click", e => {
          if (window.innerWidth >= 701) {
            e.preventDefault();
            const parent = link.parentElement;
            parent.classList.toggle("open");
          } else {
            e.preventDefault();
            const parent = link.parentElement;
            document.querySelectorAll(".submenu-item.has-submenu").forEach(item => {
              if (item !== parent) item.classList.remove("open");
            });
            parent.classList.toggle("open");
          }
        });
      });
    })
    .catch(err => console.error("Erro ao carregar header:", err));
});

document.addEventListener("DOMContentLoaded", () => {
  const insideHtml = window.location.pathname.includes("/html/");
  const headerPath = insideHtml ? "header-pages.html" : "header-index.html";

  fetch(headerPath)
    .then(r => r.text())
    .then(html => {
      document.body.insertAdjacentHTML("afterbegin", html);

      const menuToggle = document.querySelector(".menu-toggle");
      const menu = document.querySelector(".menu");

      const overlay = document.createElement("div");
      overlay.classList.add("menu-overlay");
      document.body.appendChild(overlay);

      if (menuToggle && menu) {

        /* garante que o menu começa fechado */
        menu.classList.remove("show");

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

        menu.querySelectorAll("a").forEach(link => {
          link.addEventListener("click", () => {
            menu.classList.remove("show");
            document.body.classList.remove("menu-open");
            overlay.classList.remove("show");
          });
        });
      }
    })
    .catch(err => console.error("Erro ao carregar header:", err));
});

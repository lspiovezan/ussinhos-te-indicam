document.addEventListener("DOMContentLoaded", () => {
  const insideHtml = window.location.pathname.includes("/html/");
  const headerPath = insideHtml ? "header-pages.html" : "header-index.html";

  fetch(headerPath)
    .then(r => r.text())
    .then(html => {
      document.body.insertAdjacentHTML("afterbegin", html);

      const menu = document.querySelector(".menu");
      const menuToggle = document.querySelector(".menu-toggle");

      /* 🔥 CORREÇÃO DEFINITIVA: menu nasce invisível */
      menu.style.display = "none";
      menu.classList.remove("show");

      const overlay = document.createElement("div");
      overlay.classList.add("menu-overlay");
      document.body.appendChild(overlay);

      if (menuToggle && menu) {

        menuToggle.addEventListener("click", () => {
          const isOpen = menu.classList.toggle("show");
          document.body.classList.toggle("menu-open", isOpen);
          overlay.classList.toggle("show", isOpen);

          menu.style.display = isOpen ? "flex" : "none";
        });

        overlay.addEventListener("click", () => {
          menu.classList.remove("show");
          document.body.classList.remove("menu-open");
          overlay.classList.remove("show");
          menu.style.display = "none";
        });

        menu.querySelectorAll("a").forEach(link => {
          link.addEventListener("click", () => {
            menu.classList.remove("show");
            document.body.classList.remove("menu-open");
            overlay.classList.remove("show");
            menu.style.display = "none";
          });
        });
      }
    })
    .catch(err => console.error("Erro ao carregar header:", err));
});

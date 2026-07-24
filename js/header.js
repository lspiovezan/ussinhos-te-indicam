document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const insideHtml = path.includes("/html/");

  let depth = 0;
  if (insideHtml) {
    const afterHtml = path.split("/html/")[1];
    depth = afterHtml.split("/").length - 1;
  }

  const prefix = insideHtml ? "../".repeat(depth + 1) : "";
  const headerPath = `${prefix}header.html`;

  fetch(headerPath)
    .then(r => {
      if (!r.ok) throw new Error(`Header não encontrado: ${headerPath}`);
      return r.text();
    })
    .then(html => {
      document.body.insertAdjacentHTML("afterbegin", html);

      // Ajusta links conforme a pasta atual
      document.querySelectorAll("header a").forEach(a => {
        const href = a.getAttribute("href");
        if (!href) return;

        if (insideHtml) {
          // Estamos dentro de /html
          if (href.startsWith("html/")) {
            // Já aponta para dentro de /html, não mexe
            a.href = href;
          } else {
            // Link para fora (ex.: index.html), volta uma pasta
            a.href = `../${href}`;
          }
        } else {
          // Estamos na raiz
          if (href.startsWith("html/")) {
            // Já começa com html/, mantém
            a.href = href;
          } else {
            // Se não começa com html/, adiciona prefixo html/
            a.href = href === "" ? "index.html" : `html/${href}`;
          }
        }
      });

      // ============================
      // LÓGICA DO MENU
      // ============================

      const menuToggle = document.querySelector(".menu-toggle");
      const menu = document.querySelector(".menu");

      if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
          menu.classList.toggle("show");
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

      document.querySelectorAll(".submenu-item.has-submenu > a").forEach(link => {
        link.addEventListener("click", e => {
          if (window.innerWidth < 700) {
            e.preventDefault();
            const parent = link.parentElement;
            document.querySelectorAll(".submenu-item.has-submenu").forEach(item => {
              if (item !== parent) item.classList.remove("open");
            });
            parent.classList.toggle("open");
          }
        });
      });

      // Submenus no desktop
      document.querySelectorAll(".menu-item.has-submenu > a").forEach(link => {
        link.addEventListener("click", e => {
          if (window.innerWidth >= 700) {
            e.preventDefault();
            link.parentElement.classList.toggle("open");
          }
        });
      });

      document.querySelectorAll(".submenu-item.has-submenu > a").forEach(link => {
        link.addEventListener("click", e => {
          if (window.innerWidth >= 700) {
            e.preventDefault();
            link.parentElement.classList.toggle("open");
          }
        });
      });
    })
    .catch(err => console.error("Erro ao carregar header:", err));
});

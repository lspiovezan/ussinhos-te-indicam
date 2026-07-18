document.addEventListener("DOMContentLoaded", () => {

  /* ============================
     1) Detecta caminho da página
     ============================ */
  const path = window.location.pathname;
  const insideHtml = path.includes("/html/");

  let depth = 0;
  if (insideHtml) {
    const afterHtml = path.split("/html/")[1];
    depth = afterHtml.split("/").length - 1;
  }

  const prefix = insideHtml ? "../".repeat(depth) : "";

  const headerPath = `${prefix}header.html`;
  const menuPath = `${prefix}js/menu.js`;


  /* ============================
     2) Carrega o header
     ============================ */
  fetch(headerPath)
    .then(r => {
      if (!r.ok) throw new Error(`Header não encontrado: ${headerPath}`);
      return r.text();
    })
    .then(html => {

      // Insere o header no topo
      document.body.insertAdjacentHTML("afterbegin", html);


      /* ============================
         3) Corrige links do header
         ============================ */
      document.querySelectorAll("header a").forEach(a => {
        const href = a.getAttribute("href");
        if (!href) return;

        if (insideHtml) {
          a.href = href === "" ? `${prefix}index.html` : `${href}`;
        } else {
          a.href = href === "" ? "index.html" : `html/${href}`;
        }
      });


      /* ============================
         4) Ativa menu mobile
         ============================ */
      const toggle = document.querySelector(".menu-toggle");
      const menu = document.querySelector(".menu");

      if (toggle && menu) {
        toggle.addEventListener("click", () => {
          menu.classList.toggle("show");
        });
      }


      /* ============================
         5) Carrega menu.js
         ============================ */
      const script = document.createElement("script");
      script.src = menuPath;
      document.body.appendChild(script);
    })
    .catch(err => console.error("Erro ao carregar header:", err));
});

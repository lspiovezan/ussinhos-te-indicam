document.addEventListener("DOMContentLoaded", () => {

  const path = window.location.pathname;
  const insideHtml = path.includes("/html/");

  let depth = 0;
  if (insideHtml) {
    const afterHtml = path.split("/html/")[1];
    depth = afterHtml.split("/").length - 1;
  }

  // CORREÇÃO: sempre sobe +1 nível além do depth
  const prefix = insideHtml ? "../".repeat(depth + 1) : "";

  const headerPath = `${prefix}header.html`;
  const menuPath = `${prefix}js/menu.js`;

  fetch(headerPath)
    .then(r => {
      if (!r.ok) throw new Error(`Header não encontrado: ${headerPath}`);
      return r.text();
    })
    .then(html => {

      document.body.insertAdjacentHTML("afterbegin", html);

      document.querySelectorAll("header a").forEach(a => {
        const href = a.getAttribute("href");
        if (!href) return;

        if (insideHtml) {
          a.href = href === "" ? `${prefix}index.html` : `${href}`;
        } else {
          a.href = href === "" ? "index.html" : `html/${href}`;
        }
      });

      const toggle = document.querySelector(".menu-toggle");
      const menu = document.querySelector(".menu");

      if (toggle && menu) {
        toggle.addEventListener("click", () => {
          menu.classList.toggle("show");
        });
      }

      const script = document.createElement("script");
      script.src = menuPath;
      document.body.appendChild(script);
    })
    .catch(err => console.error("Erro ao carregar header:", err));
});

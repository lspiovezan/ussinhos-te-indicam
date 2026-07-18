document.addEventListener("DOMContentLoaded", () => {

  const path = window.location.pathname;

  // Detecta se está dentro da pasta /html
  const insideHtml = path.includes("/html/");

  // Calcula quantos níveis acima precisa subir
  let depth = 0;
  if (insideHtml) {
    const afterHtml = path.split("/html/")[1]; 
    depth = afterHtml.split("/").length - 1;
  }

  // CORREÇÃO IMPORTANTE:
  // prefix = "../".repeat(depth)
  const prefix = insideHtml ? "../".repeat(depth) : "";

  // Caminhos corretos
  const headerPath = `${prefix}header.html`;
  const menuPath = `${prefix}js/menu.js`;

  fetch(headerPath)
    .then(r => r.text())
    .then(html => {

      document.body.insertAdjacentHTML("afterbegin", html);

      // Corrige links automaticamente
      document.querySelectorAll("header a").forEach(a => {
        const href = a.getAttribute("href");
        if (!href) return;

        if (insideHtml) {
          if (href === "") {
            a.href = `${prefix}index.html`;
          } else {
            a.href = `${href}`;
          }
        } else {
          if (href === "") {
            a.href = "index.html";
          } else {
            a.href = `html/${href}`;
          }
        }
      });

      // Carrega menu.js depois do header existir
      const script = document.createElement("script");
      script.src = menuPath;
      document.body.appendChild(script);
    });
});

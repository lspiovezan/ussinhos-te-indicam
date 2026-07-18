document.addEventListener("DOMContentLoaded", () => {

  // Caminho real da página no servidor
  const path = window.location.pathname;

  // Detecta se está dentro da pasta /html
  const insideHtml = path.includes("/html/");

  // Calcula quantos níveis acima precisa subir
  let depth = 0;
  if (insideHtml) {
    const afterHtml = path.split("/html/")[1];
    depth = afterHtml.split("/").length - 1;
  }

  // Prefixo correto para qualquer profundidade
  const prefix = insideHtml ? "../".repeat(depth) : "";

  // Caminho do header
  const headerPath = `${prefix}header.html`;
  const menuPath = `${prefix}js/menu.js`;

  // Carrega o header
  fetch(headerPath)
    .then(r => {
      if (!r.ok) throw new Error(`Header não encontrado: ${headerPath}`);
      return r.text();
    })
    .then(html => {

      // Insere o header diretamente no body
      document.body.insertAdjacentHTML("afterbegin", html);

      // Corrige links automaticamente
      document.querySelectorAll("header a").forEach(a => {
        const href = a.getAttribute("href");
        if (!href) return;

        if (insideHtml) {
          a.href = href === "" ? `${prefix}index.html` : `${href}`;
        } else {
          a.href = href === "" ? "index.html" : `html/${href}`;
        }
      });

      // Carrega o menu.js
      const script = document.createElement("script");
      script.src = menuPath;
      document.body.appendChild(script);
    })
    .catch(err => console.error("Erro ao carregar header:", err));
});

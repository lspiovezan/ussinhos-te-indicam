document.addEventListener("DOMContentLoaded", () => {
  // Detecta se está dentro da pasta /html
  const insideHtml = window.location.pathname.includes("/html/");

  // Caminhos absolutos a partir da raiz do site (funciona no GitHub Pages)
  const footerPath = insideHtml
    ? "/html/footer-pages.html"
    : "/footer-index.html";

  // Evita duplicação: só carrega se ainda não existe footer
  if (!document.querySelector("footer")) {
    fetch(footerPath)
      .then(r => {
        if (!r.ok) throw new Error("Arquivo não encontrado: " + footerPath);
        return r.text();
      })
      .then(html => {
        document.body.insertAdjacentHTML("beforeend", html);
      })
      .catch(err => console.error("Erro ao carregar footer:", err));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Detecta se está dentro da pasta /html
  const insideHtml = window.location.pathname.includes("/html/");

  // Caminhos relativos ao local do JS (que está em /js)
  const footerPath = insideHtml
    ? "../html/footer-pages.html"   // sobe de /js para raiz, entra em /html
    : "../footer-index.html";       // sobe de /js para raiz e pega footer-index

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

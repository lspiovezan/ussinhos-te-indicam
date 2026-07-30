document.addEventListener("DOMContentLoaded", () => {

  // Detecta se está dentro da pasta /html
  const insideHtml = window.location.pathname.includes("/html/");

  // Escolhe o footer correto
  const footerPath = insideHtml
    ? "../html/footer-pages.html"
    : "../footer-index.html";

  // Evita duplicação: só carrega se ainda não existe footer
  if (!document.querySelector("footer")) {
    fetch(footerPath)
      .then(r => r.text())
      .then(html => {
        document.body.insertAdjacentHTML("beforeend", html);
      })
      .catch(err => console.error("Erro ao carregar footer:", err));
  }
});

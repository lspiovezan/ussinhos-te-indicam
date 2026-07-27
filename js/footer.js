document.addEventListener("DOMContentLoaded", () => {

  // Detecta se a página está dentro da pasta /html
  const insideHtml = window.location.pathname.includes("/html/");

  // Escolhe automaticamente o footer correto
  const footerPath = insideHtml
    ? "../html/footer-pages.html"
    : "footer-index.html";

  fetch(footerPath)
    .then(r => r.text())
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);

      // Botão de sair
      const logoutBtn = document.getElementById("logout-btn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("ursinhosAuth");
          location.reload();
        });
      }
    })
    .catch(err => console.error("Erro ao carregar footer:", err));
});
document.addEventListener("DOMContentLoaded", () => {

  // Detecta se a página está dentro da pasta /html
  const insideHtml = window.location.pathname.includes("/html/");

  // Escolhe automaticamente o footer correto
  const footerPath = insideHtml
    ? "../html/footer-pages.html"
    : "footer-index.html";

  fetch(footerPath)
    .then(r => r.text())
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);
    })
    .catch(err => console.error("Erro ao carregar footer:", err));
});

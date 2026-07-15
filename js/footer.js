document.addEventListener("DOMContentLoaded", () => {
    fetch("../footer.html")
      .then(r => r.text())
      .then(html => {
        document.body.insertAdjacentHTML("beforeend", html);
  
        // Botão de sair
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("ursinhosAuth");
            location.reload(); // força pedir senha de novo
          });
        }
      });
  });
  
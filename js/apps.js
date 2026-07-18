document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".category-btn");
  const cards = document.querySelectorAll(".app-card");

  // 👉 1) Ao carregar a página, mostrar TODOS os apps
  cards.forEach(card => {
    card.style.display = "block";
  });

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {

      // remove active de todos
      buttons.forEach(b => b.classList.remove("active"));

      // ativa o clicado
      btn.classList.add("active");

      const category = btn.dataset.category;

      // 👉 2) Se clicou em uma categoria, filtra
      cards.forEach(card => {
        card.style.display =
          card.dataset.category === category ? "block" : "none";
      });
    });
  });

});

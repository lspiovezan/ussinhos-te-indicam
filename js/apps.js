document.addEventListener("DOMContentLoaded", () => {

  const apps = [
    {
      nome: "The Fork",
      categoria: "Alimentação",
      descricao: "App perfeito para realizar reservas em restaurantes na Itália e Europa, com avaliações de usuários. E o melhor de tudo, tem muitos descontos disponíveis para você aproveitar!",
      android: "https://play.google.com/store/apps/details?id=com.lafourchette.lafourchette",
      iphone: "https://apps.apple.com/it/app/thefork-ristoranti-e-offerte/id424850908",
      imagem: "../img/apps/the-fork-logo.jpg"
    },
    {
      nome: "Trainline",
      categoria: "Transporte",
      descricao: "Compra de passagens de trem na Itália e Europa com preços atualizados.",
      android: "https://play.google.com/store/apps/details?id=com.trainline",
      iphone: "https://apps.apple.com/app/trainline/id698600130",
      imagem: "../img/apps/trainline.png"
    },
    {
      nome: "ATM Milano",
      categoria: "Transporte",
      descricao: "App oficial para metrô, ônibus e tram de Milão.",
      android: "https://play.google.com/store/apps/details?id=it.atm.milano",
      iphone: "https://apps.apple.com/app/atm-milano/id123456789",
      imagem: "../img/apps/atm.png"
    }
  ];

  const container = document.querySelector(".apps-container");

  // Gera os cards
  apps.forEach(app => {
    const card = document.createElement("div");
    card.classList.add("app-card");

    card.innerHTML = `
      <div class="app-image">
        <img src="${app.imagem}" alt="${app.nome}">
      </div>

      <h3 class="app-title">${app.nome}</h3>

      <p class="app-category">
        Categoria: <strong>${app.categoria}</strong>
      </p>

      <p class="app-desc">
        ${app.descricao}
      </p>

        <div class="app-buttons">
        <a class="store-btn" href="${app.android}" target="_blank">
            <img src="../img/icons/android.png" alt="Android">
        </a>
        <a class="store-btn" href="${app.iphone}" target="_blank">
            <img src="../img/icons/iphone.svg" alt="iPhone">
        </a>
        </div>
    `;

    container.appendChild(card);
  });

  /* ============================
     FILTRO POR CATEGORIA
  ============================ */

  const buttons = document.querySelectorAll(".category-btn");
  const cards = document.querySelectorAll(".app-card");
  const categoriaAtual = document.getElementById("categoria-atual");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {

      // Remove seleção anterior
      buttons.forEach(b => b.classList.remove("active"));

      // Ativa o botão clicado
      btn.classList.add("active");

      const categoria = btn.dataset.category;

      // Atualiza título da categoria
      categoriaAtual.textContent = `Categoria: ${categoria}`;

      // Filtra os cards
      cards.forEach(card => {
        const cat = card.querySelector(".app-category strong").textContent;
        card.style.display = (cat === categoria) ? "block" : "none";
      });
    });
  });

  

  /* ============================
     MOSTRAR TUDO AO INICIAR
  ============================ */
  categoriaAtual.textContent = "Todos os apps";
  cards.forEach(card => card.style.display = "block");

});

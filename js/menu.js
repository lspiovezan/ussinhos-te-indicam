const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

// Abre/fecha o menu sanduíche
menuToggle.addEventListener("click", () => {
  const isOpen = menu.style.display === "flex";
  menu.style.display = isOpen ? "none" : "flex";
});

/* BLOQUEAR CLIQUE EM ITENS COM SUBITENS */
document.querySelectorAll(".menu-item").forEach(item => {
  const hasSubmenu = item.querySelector(".submenu");

  if (hasSubmenu) {
    const link = item.querySelector(":scope > a");
    link.addEventListener("click", e => {
      if (window.innerWidth < 700) {
        e.preventDefault();
      }
    });
  }
});

document.querySelectorAll(".submenu-item").forEach(item => {
  const hasSubmenu2 = item.querySelector(".submenu-level2");

  if (hasSubmenu2) {
    const link = item.querySelector(":scope > a");
    link.addEventListener("click", e => {
      if (window.innerWidth < 700) {
        e.preventDefault();
      }
    });
  }
});

/* ABRIR SOMENTE O SUBMENU CLICADO (NÍVEL 1) */
document.querySelectorAll(".menu-item").forEach(item => {
  item.addEventListener("click", e => {
    if (window.innerWidth >= 700) return;

    const hasSubmenu = item.querySelector(".submenu");
    if (!hasSubmenu) return;

    document.querySelectorAll(".menu-item").forEach(i => {
      if (i !== item) i.classList.remove("open");
    });

    item.classList.toggle("open");
    e.stopPropagation();
  });
});

/* ABRIR SOMENTE O SUB-SUBMENU CLICADO (NÍVEL 2) */
document.querySelectorAll(".submenu-item").forEach(sub => {
  sub.addEventListener("click", e => {
    if (window.innerWidth >= 700) return;

    const hasSubmenu2 = sub.querySelector(".submenu-level2");
    if (!hasSubmenu2) return;

    document.querySelectorAll(".submenu-item").forEach(s => {
      if (s !== sub) s.classList.remove("open");
    });

    sub.classList.toggle("open");
    e.stopPropagation();
  });
});

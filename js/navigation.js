const sections = document.querySelectorAll(".section");
const navButtons = document.querySelectorAll("[data-section]");
const panelMain = document.getElementById("panel-main");

function showSection(name) {
  sections.forEach(sec => {
    sec.style.display = sec.dataset.section === name ? "block" : "none";
  });
  panelMain.scrollIntoView({ behavior: "smooth" });
}

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    showSection(btn.dataset.section);
  });
});

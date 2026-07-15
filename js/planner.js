const btnGerar = document.getElementById("btn-gerar-roteiro");
const plannerForm = document.getElementById("planner-form");
const plannerOutput = document.getElementById("planner-output");

btnGerar.addEventListener("click", () => {
  const formData = new FormData(plannerForm);

  const periodo = formData.get("periodo");
  const cidades = formData.get("cidades");
  const dias = formData.get("dias");

  const estilos = Array.from(
    plannerTags.querySelectorAll(".planner-tag.active")
  ).map(t => t.textContent);

  plannerOutput.textContent =
    `Roteiro sugerido:\n\n` +
    `• Período: ${periodo}\n` +
    `• Cidades: ${cidades}\n` +
    `• Dias: ${dias}\n` +
    `• Estilo: ${estilos.join(", ") || "não informado"}\n\n` +
    `Sugestões aparecerão aqui na versão futura.`;
});

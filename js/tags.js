const plannerTags = document.getElementById("planner-tags");

plannerTags.addEventListener("click", e => {
  const tag = e.target.closest(".planner-tag");
  if (!tag) return;
  tag.classList.toggle("active");
});

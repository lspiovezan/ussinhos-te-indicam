// Bloqueia CTRL + scroll (zoom)
document.addEventListener("wheel", function(e) {
  if (e.ctrlKey) {
    e.preventDefault();
  }
}, { passive: false });

// Bloqueia CTRL + +, CTRL + -, CTRL + =
document.addEventListener("keydown", function(e) {
  if (
    (e.ctrlKey && e.key === "+") ||
    (e.ctrlKey && e.key === "-") ||
    (e.ctrlKey && e.key === "=")
  ) {
    e.preventDefault();
  }
});

// Bloqueia pinch zoom no mobile
document.addEventListener("touchmove", function(e) {
  if (e.scale !== 1) {
    e.preventDefault();
  }
}, { passive: false });

// Bloqueia double-tap zoom
let lastTouch = 0;
document.addEventListener("touchend", function(e) {
  const now = Date.now();
  if (now - lastTouch <= 300) {
    e.preventDefault();
  }
  lastTouch = now;
}, { passive: false });

const openBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close-btn");

// Open modal
openBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

// Close modal (X button)
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Close on outside click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// Close with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("active");
  }
});
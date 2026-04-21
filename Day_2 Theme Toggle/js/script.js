const btn = document.getElementById("toggleBtn");

let theme = localStorage.getItem("theme") || "light";
document.body.classList.add(theme);
updateText();

btn.onclick = () => {
  theme = theme === "light" ? "dark" : "light";
  document.body.className = theme;
  localStorage.setItem("theme", theme);
  updateText();
};

function updateText() {
  btn.textContent = theme === "dark"
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
}
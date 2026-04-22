const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("open");
});

document.querySelectorAll(".nav-item").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  navbar.style.boxShadow = window.scrollY > 20
    ? "0 4px 20px rgba(0,0,0,0.3)"
    : "none";
});
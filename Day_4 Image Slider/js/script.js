const slides = document.getElementById("slides");
const total = document.querySelectorAll(".slides img").length;

let index = 0;
let auto;

// update function
function update() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}

// next
document.getElementById("next").onclick = () => {
  index = (index + 1) % total;
  update();
  restartAuto();
};

// prev
document.getElementById("prev").onclick = () => {
  index = (index - 1 + total) % total;
  update();
  restartAuto();
};

function startAuto() {
  auto = setInterval(() => {
    index = (index + 1) % total;
    update();
  }, 3000);
}

function restartAuto() {
  clearInterval(auto);
  startAuto();
}

startAuto();
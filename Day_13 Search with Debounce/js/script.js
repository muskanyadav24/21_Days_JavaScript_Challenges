const techData = [
  { name: "React", category: "Frontend Library", icon: "code" },
  { name: "Vue.js", category: "Frontend Framework", icon: "layout" },
  { name: "Angular", category: "Frontend Framework", icon: "terminal" },
  { name: "Node.js", category: "Backend Runtime", icon: "server" },
  { name: "Python", category: "Programming Language", icon: "file-code" },
  { name: "JavaScript", category: "Programming Language", icon: "file-type" },
  { name: "TypeScript", category: "Programming Language", icon: "shield-check" },
  { name: "Next.js", category: "Fullstack Framework", icon: "zap" },
  { name: "Tailwind CSS", category: "Styling", icon: "palette" },
  { name: "MongoDB", category: "Database", icon: "database" },
  { name: "PostgreSQL", category: "Database", icon: "database" },
  { name: "Docker", category: "DevOps", icon: "container" },
  { name: "Kubernetes", category: "DevOps", icon: "cloud" },
  { name: "Figma", category: "Design Tool", icon: "figma" },
  { name: "Vite", category: "Build Tool", icon: "rocket" },
  { name: "GraphQL", category: "API Query Language", icon: "share-2" },
  { name: "Rust", category: "System Language", icon: "cpu" },
  { name: "Svelte", category: "Frontend Framework", icon: "box" }
];

const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('resultsList');
const statusMessage = document.getElementById('statusMessage');
const clearBtn = document.getElementById('clearBtn');

let currentIndex = -1;
let lastQuery = "";

function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

function highlightText(text, query) {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, `<mark>$1</mark>`);
}

async function performSearch(query) {
  const originalQuery = query;
  query = query.trim().toLowerCase();

  if (query === lastQuery) return;
  lastQuery = query;

  if (query === "") {
    showStatus('info', 'Type something to start searching...');
    resultsList.style.display = 'none';
    return;
  }

  showStatus('loader', 'Searching...');

  await new Promise(res => setTimeout(res, 400));

  if (searchInput.value.trim().toLowerCase() !== query) return;

  const filtered = techData.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query)
  );

  if (filtered.length > 0) {
    displayResults(filtered, query);
  } else {
    showStatus('search-x', `No results for "${query}"`);
  }
}

function displayResults(results, query) {
  statusMessage.style.display = 'none';
  resultsList.innerHTML = '';
  resultsList.style.display = 'block';

  results.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'result-item fade-in';
    li.dataset.name = item.name;

    li.innerHTML = `
            <div class="icon-box">
                <i data-lucide="${item.icon}" size="18"></i>
            </div>
            <div class="details">
                <span class="name">${highlightText(item.name, query)}</span>
                <span class="category">${highlightText(item.category, query)}</span>
            </div>
            <span class="badge">Tech</span>
        `;

    resultsList.appendChild(li);
  });

  if (window.lucide) lucide.createIcons();
}

resultsList.addEventListener('click', (e) => {
  const item = e.target.closest('.result-item');
  if (item) {
    const name = item.dataset.name;
    searchInput.value = name;
    resultsList.style.display = 'none';
    lastQuery = name.toLowerCase();
    searchInput.focus();
  }
});

function showStatus(icon, message) {
  resultsList.style.display = 'none';
  statusMessage.style.display = 'flex';

  if (icon === 'loader') {
    statusMessage.innerHTML = `
            <div class="loader"></div>
            <span>${message}</span>
        `;
  } else {
    statusMessage.innerHTML = `
            <i data-lucide="${icon}" size="24"></i>
            <span>${message}</span>
        `;
    if (window.lucide) lucide.createIcons();
  }
}

searchInput.addEventListener("keydown", (e) => {
  const items = document.querySelectorAll(".result-item");

  if (!items.length) return;

  if (e.key === "ArrowDown") {
    currentIndex = (currentIndex + 1) % items.length;
  } else if (e.key === "ArrowUp") {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
  } else if (e.key === "Enter") {
    if (items[currentIndex]) {
      searchInput.value = items[currentIndex].innerText;
      resultsList.style.display = "none";
    }
  }

  items.forEach(item => item.classList.remove("active"));

  if (items[currentIndex]) {
    items[currentIndex].classList.add("active");
  }
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  lastQuery = "";
  resultsList.style.display = "none";
  showStatus("info", "Type something to start searching...");
  searchInput.focus();
});

const debouncedSearch = debounce((e) => {
  currentIndex = -1;
  performSearch(e.target.value);
}, 500);

searchInput.addEventListener("input", debouncedSearch);

window.addEventListener("DOMContentLoaded", () => {
  searchInput.focus();
});
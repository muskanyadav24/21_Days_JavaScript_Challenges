const products = [
// Electronics
  { name: "iPhone 14", category: "electronics" },
  { name: "Samsung TV", category: "electronics" },
  { name: "Headphones", category: "electronics" },
  { name: "Laptop", category: "electronics" },
  { name: "Smart Watch", category: "electronics" },
// Clothing
  { name: "Nike T-Shirt", category: "clothing" },
  { name: "Levi's Jeans", category: "clothing" },
  { name: "Jacket", category: "clothing" },
  { name: "Hoodie", category: "clothing" },
  { name: "Cap", category: "clothing" }
];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

let currentCategory = "all";

function renderProducts(list) {
  productList.innerHTML = "";

  if (list.length === 0) {
    productList.innerHTML = "<p>❌ No products found</p>";
    return;
  }

  list.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.category}</p>
    `;

    productList.appendChild(div);
  });
}

function filterProducts(category) {
  currentCategory = category;
  applyFilters();
}

function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();

  const filtered = products.filter(product => {
    const matchCategory =
      currentCategory === "all" || product.category === currentCategory;

    const matchSearch =
      product.name.toLowerCase().includes(searchValue);

    return matchCategory && matchSearch;
  });

  renderProducts(filtered);
}

searchInput.addEventListener("input", applyFilters);

renderProducts(products);
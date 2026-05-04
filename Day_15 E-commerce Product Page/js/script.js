// Product Data
const products = [
  {
    id: 1,
    name: "Laptop Pro",
    price: 107999,
    description: "Powerful laptop for professionals",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
    category: "laptop"
  },
  {
    id: 2,
    name: "Smartphone X",
    price: 74699,
    description: "Latest smartphone with advanced features",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-0MtG3qVUuSKm0kkwZ80p1myx8D7WT9oz1A&s",
    category: "phone"
  },
  {
    id: 3,
    name: "Tablet Plus",
    price: 49799,
    description: "Versatile tablet for work and entertainment",
    image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Computers%20Peripherals/Tablets%20and%20iPads/Images/308036_r2vavc.png",
    category: "tablet"
  },
  {
    id: 4,
    name: "Wireless Headphones",
    price: 20749,
    description: "Premium sound quality with noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "headphones"
  },
  {
    id: 5,
    name: "Smart Watch",
    price: 33199,
    description: "Stay connected with wearable technology",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    category: "laptop"
  },
  {
    id: 6,
    name: "4K Monitor",
    price: 66399,
    description: "Ultra-high resolution display for creators",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    category: "laptop"
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: 12449,
    description: "Portable speaker with excellent bass",
    image: "https://images.ctfassets.net/javen7msabdh/6FHAUQzrTAElqcqiG0QXND/c1450280d3b1a2d48099f9af1d1c6790/kilburn-iii-bb-plp.jpg?w=320&fm=jpg&q=85",
    category: "headphones"
  },
  {
    id: 8,
    name: "USB-C Hub",
    price: 6639,
    description: "Multi-port hub for connectivity",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
    category: "phone"
  }
];

// Cart Management
let cart = [];

// DOM Elements
const productsGrid = document.getElementById("productsGrid");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const cartSidebar = document.getElementById("cartSidebar");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItems = document.getElementById("cartItems");
const emptyCartMsg = document.getElementById("emptyCartMsg");
const cartSummary = document.getElementById("cartSummary");
const toast = document.getElementById("toast");

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  loadCartFromStorage();
  attachCartToggleListeners();
});

// Render Products
function renderProducts() {
  productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image ${product.category}">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join("");
}

// Add to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCart();
  showToast(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
  const product = cart.find(item => item.id === productId);
  cart = cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCart();
  showToast(`${product.name} removed from cart`, "remove");
}

// Update Quantity
function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCartToStorage();
      updateCart();
    }
  }
}

// Update Cart Display
function updateCart() {
  // Update cart count
  cartCount.textContent = cart.length > 0 ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  // Update cart items display
  if (cart.length === 0) {
    cartItems.innerHTML = "";
    emptyCartMsg.style.display = "block";
    cartSummary.style.display = "none";
  } else {
    emptyCartMsg.style.display = "none";
    cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image-wrapper">
                    <img class="cart-item-image" src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')} × ${item.quantity}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
                </div>
            </div>
        `).join("");

    // Update summary
    updateCartSummary();
    cartSummary.style.display = "block";
  }
}

// Update Cart Summary
function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  document.getElementById("subtotal").textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  document.getElementById("tax").textContent = `₹${tax.toLocaleString('en-IN')}`;
  document.getElementById("total").textContent = `₹${total.toLocaleString('en-IN')}`;
}

// Show Toast Notification
function showToast(message, type = "add") {
  toast.textContent = message;
  toast.className = `toast show ${type === "remove" ? "remove" : ""}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// Cart Toggle Listeners
function attachCartToggleListeners() {
  cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("open");
  });

  closeCartBtn.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
  });

  // Close cart when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
        cartSidebar.classList.remove("open");
      }
    }
  });

  // Checkout button
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length > 0) {
        showToast("Order placed successfully!");
        cart = [];
        saveCartToStorage();
        updateCart();
        cartSidebar.classList.remove("open");
      }
    });
  }
}

// Local Storage Functions
function saveCartToStorage() {
  localStorage.setItem("ecommerceCart", JSON.stringify(cart));
}

function loadCartFromStorage() {
  const saved = localStorage.getItem("ecommerceCart");
  if (saved) {
    cart = JSON.parse(saved);
    updateCart();
  }
}

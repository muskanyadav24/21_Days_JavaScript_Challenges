// Sample products data
const products = [
    { 
        id: 1, 
        name: 'Laptop', 
        price: 999.99, 
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
        description: 'High-performance laptop with Intel Core i7, 16GB RAM, 512GB SSD. Perfect for work, gaming, and creative tasks.'
    },
    { 
        id: 2, 
        name: 'Smartphone', 
        price: 599.99, 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-0MtG3qVUuSKm0kkwZ80p1myx8D7WT9oz1A&s',
        description: 'Latest smartphone with 6.7" AMOLED display, 5G connectivity, and advanced camera system. Sleek design with premium build quality.'
    },
    { 
        id: 3, 
        name: 'Headphones', 
        price: 199.99, 
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        description: 'Noise-cancelling wireless headphones with 30-hour battery life. Crystal-clear audio and comfortable fit for all-day wear.'
    },
    { 
        id: 4, 
        name: 'Tablet', 
        price: 449.99, 
        image: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Computers%20Peripherals/Tablets%20and%20iPads/Images/308036_r2vavc.png',
        description: '10.9" Retina display tablet with M1 processor. Great for reading, drawing, and productivity on the go.'
    },
    { 
        id: 5, 
        name: 'Camera', 
        price: 799.99, 
        image: 'https://img.icons8.com/fluency/96/camera.png',
        description: '4K mirrorless camera with 45MP sensor. Professional-grade tool for photographers and videographers.'
    },
    { 
        id: 6, 
        name: 'Watch', 
        price: 299.99, 
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        description: 'Smartwatch with fitness tracking, heart rate monitor, and 7-day battery life. Water-resistant up to 5ATM.'
    },
];

// Cart array
let cart = [];

// Tax rate (10%)
const TAX_RATE = 0.1;

// Modal state
let selectedProductId = null;

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const cartItemsContainer = document.getElementById('cartItems');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const cartCountElement = document.getElementById('cartCount');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const productModal = document.getElementById('productModal');

// Initialize the app
function init() {
    loadCartFromLocalStorage();
    renderProducts();
    updateCartDisplay();
}

// Load cart from local storage
function loadCartFromLocalStorage() {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            // Validate that all items have valid data
            cart = parsedCart.filter(item => {
                return item && item.id && item.name && item.price && item.quantity && item.image;
            });
            // Remove invalid items
            if (cart.length !== parsedCart.length) {
                saveCartToLocalStorage();
            }
        }
    } catch (error) {
        console.error('Error loading cart:', error);
        cart = [];
        localStorage.removeItem('cart');
    }
}

// Save cart to local storage
function saveCartToLocalStorage() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}

// Render products
function renderProducts() {
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img class="product-image" src="${product.image}" alt="${product.name}">
            <div class="product-name">${product.name}</div>
            <div class="product-price">₹${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="showProductModal(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCartToLocalStorage();
    updateCartDisplay();
}

// Modal functions
function showProductModal(productId) {
    selectedProductId = productId;
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const modalImage = document.getElementById('modalImage');
    modalImage.src = product.image;
    modalImage.alt = product.name;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = `₹${product.price.toFixed(2)}`;
    
    productModal.classList.add('active');
}

function closeModal() {
    productModal.classList.remove('active');
    selectedProductId = null;
}

function confirmAddToCart() {
    if (selectedProductId !== null) {
        addToCart(selectedProductId);
        closeModal();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    updateCartDisplay();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (change === -1 && item.quantity === 1) {
            return;
        }
        item.quantity += change;
        saveCartToLocalStorage();
        updateCartDisplay();
    }
}

// Calculate subtotal
function calculateSubtotal() {
    return cart.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return sum + (price * quantity);
    }, 0);
}

// Update cart display
function updateCartDisplay() {
    // Update cart items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartMessage.classList.remove('hidden');
        checkoutBtn.disabled = true;
    } else {
        emptyCartMessage.classList.add('hidden');
        cartItemsContainer.innerHTML = cart.map(item => {
            const itemName = item.name || 'Unknown Product';
            const itemImage = item.image || '';
            const itemPrice = parseFloat(item.price) || 0;
            const itemQuantity = parseInt(item.quantity) || 1;
            const itemTotal = itemPrice * itemQuantity;
            
            return `
                <div class="cart-item">
                    <div class="item-details">
                        <img class="cart-item-image" src="${itemImage}" alt="${itemName}">
                        <div>
                            <div class="item-name">${itemName}</div>
                            <div class="item-price">₹${itemPrice.toFixed(2)} each</div>
                        </div>
                    </div>
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span class="quantity-display">${itemQuantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div class="item-total">₹${itemTotal.toFixed(2)}</div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
        }).join('');
        checkoutBtn.disabled = false;
    }

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
    cartCountElement.textContent = totalItems;

    // Calculate and update totals
    const subtotal = calculateSubtotal();
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    taxElement.textContent = `₹${tax.toFixed(2)}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;
}

// Clear cart
function clearCart() {
    if (cart.length === 0) {
        alert('Cart is already empty!');
        return;
    }
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCartToLocalStorage();
        updateCartDisplay();
    }
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const total = calculateSubtotal() + calculateSubtotal() * TAX_RATE;
    alert(`Thank you for your purchase!\n\nTotal: ₹${total.toFixed(2)}\n\nYour order has been placed.`);
    cart = [];
    saveCartToLocalStorage();
    updateCartDisplay();
}

// Event listeners
checkoutBtn.addEventListener('click', checkout);
clearCartBtn.addEventListener('click', clearCart);

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === productModal) {
        closeModal();
    }
});

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

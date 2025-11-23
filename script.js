// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 30000,
        image: "wireless headphone.png",
        description: "High-quality wireless headphones with noise cancellation."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 40000,
        image: "smartwatch.PNG",
        description: "Feature-packed smartwatch with fitness tracking, music support and calls."
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 35000,
        image: "bluetooth speaker.jpg",
        description: "Portable Bluetooth speaker with great sound quality and strength towards a large space."
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 45000,
        image: "laptop backpack.png",
        description: "Durable backpack with laptop compartment and USB charging port."
    },
    {
        id: 5,
        name: "Wireless Mouse",
        price: 20000,
        image: "wireless mouse.png",
        description: "Ergonomic wireless mouse with long battery life."
    },
    {
        id: 6,
        name: "USB-C Hub",
        price: 20000,
        image: "usb hub c.png",
        description: "7-in-1 USB-C hub with HDMI, USB, and SD card slots."
    }
];

// Shopping cart
let cart = [];

// DOM elements
const productGrid = document.getElementById('product-grid');
const cartButton = document.getElementById('cart-button');
const cartDropdown = document.getElementById('cart-dropdown');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');

// Display products
function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
     //Format price with Tsh and commas
     const formattedPrice = new Intl.NumberFormat('en-TZ',{
        style: 'currency',
        currency: 'TZS'
     }).format(product.price)


        productCard.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${formattedPrice}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add item to cart
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showCartDropdown();
}

// Update cart display
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items list
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <span>${item.name} (${item.quantity})</span>
                <span>Tsh ${(item.price * item.quantity).toFixed(2)}</span>
            `;
            
            cartItems.appendChild(cartItem);
        });
    }
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: Tsh ${total.toFixed(2)}`;
}

// Show/hide cart dropdown
function showCartDropdown() {
    cartDropdown.style.display = 'block';
}

function hideCartDropdown() {
    cartDropdown.style.display = 'none';
}

// Event listeners
cartButton.addEventListener('click', showCartDropdown);
closeCart.addEventListener('click', hideCartDropdown);

checkoutBtn.addEventListener('click', () => {
    alert('Thank you for your purchase!');
    cart = [];
    updateCart();
    hideCartDropdown();
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartDropdown.contains(e.target) && e.target !== cartButton) {
        hideCartDropdown();
    }
});

// Initialize the page
displayProducts();
updateCart();



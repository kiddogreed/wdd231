// Sample Inventory Data reflecting Trentsy's social media offerings
const products = [
    {
        id: 1,
        title: "Aesthetic Drip Ceramic Mug",
        category: "lifestyle",
        price: "₱280",
        tag: "Homeware",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        title: "Vintage Elegance Square Watch",
        category: "watches",
        price: "₱450",
        tag: "Limited Stock",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        title: "Minimalist Gold Mesh Watch",
        category: "watches",
        price: "₱490",
        tag: "Best Seller",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        title: "Pastel Ceramic Coffee Cup",
        category: "lifestyle",
        price: "₱250",
        tag: "Homeware",
        image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=500&q=80"
    }
];

let cartCount = 0;

// Render Products
function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = items.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <span class="product-tag">${product.tag}</span>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price}</p>
                <button class="add-cart-btn" onclick="addToCart()">Add to Bag</button>
            </div>
        </div>
    `).join('');
}

// Filter Function
function filterCategory(category) {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Simple Cart Counter
function addToCart() {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
}

// Mobile Menu Toggle
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
});

// Initial Load
renderProducts(products);
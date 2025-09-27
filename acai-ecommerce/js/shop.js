import Cart from './cart.js';

class Shop {
    constructor(cart) {
        this.productGrid = document.getElementById('product-grid');
        this.cart = cart;
        this.products = [];
        this.init();
    }

    async init() {
        await this.fetchProducts();
        this.renderProducts();
    }

    async fetchProducts() {
        try {
            const response = await fetch('data/acai.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.products = await response.json();
        } catch (error) {
            console.error("Could not fetch products:", error);
            this.productGrid.innerHTML = '<p>Error loading products. Please try again later.</p>';
        }
    }

    renderProducts() {
        if (!this.productGrid) return;
        this.productGrid.innerHTML = '';
        this.products.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <img src="${product.image.replace('images/', 'https://placehold.co/600x400/8A2BE2/FFFFFF?text=')}" alt="${product.name}" loading="lazy" style="aspect-ratio: 3/2; object-fit: cover;">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="ingredients">${product.ingredients}</p>
                        <p class="price">$${product.price.toFixed(2)}</p>
                        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            this.productGrid.innerHTML += productCard;
        });
        this.addEventListeners();
    }
    
    addEventListeners() {
        this.productGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const productId = e.target.dataset.id;
                const product = this.products.find(p => p.id === productId);
                if (product) {
                    this.cart.addItem(product);
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('product-grid')){
        const cart = new Cart();
        new Shop(cart);
    }
});

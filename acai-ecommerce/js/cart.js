class Cart {
    constructor() {
        this.cartModal = document.getElementById('cart-modal');
        this.cartIcon = document.getElementById('cart-icon');
        this.closeButton = document.querySelector('.close-button');
        this.cartItemsContainer = document.getElementById('cart-items');
        this.cartSubtotalEl = document.getElementById('cart-subtotal');
        this.cartTaxEl = document.getElementById('cart-tax');
        this.cartTotalEl = document.getElementById('cart-total');
        this.cartCountEl = document.getElementById('cart-count');
        
        this.items = this.loadFromLocalStorage() || [];
        this.taxRate = 0.10;

        this.addEventListeners();
        this.updateCart();
    }

    addEventListeners() {
        if (this.cartIcon) {
            this.cartIcon.addEventListener('click', () => this.openModal());
        }
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.closeModal());
        }
        window.addEventListener('click', (event) => {
            if (event.target == this.cartModal) {
                this.closeModal();
            }
        });
        if(this.cartItemsContainer){
            this.cartItemsContainer.addEventListener('click', e => {
                const target = e.target;
                const itemId = target.closest('.cart-item')?.dataset.id;
                if(!itemId) return;

                if(target.classList.contains('increase-qty')) {
                    this.addItem({ id: itemId });
                } else if (target.classList.contains('decrease-qty')) {
                    this.decreaseItem(itemId);
                } else if(target.classList.contains('remove-item-btn')) {
                    this.removeItem(itemId);
                }
            });
        }
    }

    openModal() {
        if(this.cartModal) this.cartModal.style.display = 'block';
    }

    closeModal() {
        if(this.cartModal) this.cartModal.style.display = 'none';
    }
    
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.updateCart();
    }

    decreaseItem(productId) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity--;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            }
        }
        this.updateCart();
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateCart();
    }
    
    updateCart() {
        if(this.cartItemsContainer) this.renderCartItems();
        this.calculateTotals();
        this.updateCartCount();
        this.saveToLocalStorage();
    }

    renderCartItems() {
        this.cartItemsContainer.innerHTML = '';
        if (this.items.length === 0) {
            this.cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        this.items.forEach(item => {
            const itemElement = `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="decrease-qty">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-qty">+</button>
                        <button class="remove-item-btn">&times;</button>
                    </div>
                </div>
            `;
            this.cartItemsContainer.innerHTML += itemElement;
        });
    }

    calculateTotals() {
        const subtotal = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * this.taxRate;
        const total = subtotal + tax;

        if (this.cartSubtotalEl) this.cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (this.cartTaxEl) this.cartTaxEl.textContent = `$${tax.toFixed(2)}`;
        if (this.cartTotalEl) this.cartTotalEl.textContent = `$${total.toFixed(2)}`;
    }

    updateCartCount() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        if(this.cartCountEl) this.cartCountEl.textContent = totalItems;
    }

    saveToLocalStorage() {
        localStorage.setItem('purpleCreamCart', JSON.stringify(this.items));
    }

    loadFromLocalStorage() {
        const cartData = localStorage.getItem('purpleCreamCart');
        return cartData ? JSON.parse(cartData) : [];
    }
}

export default Cart;

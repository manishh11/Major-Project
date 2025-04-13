// cart.js - Complete Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartItemsContainer = document.getElementById('cart-dropdown-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
  
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);
  
    // Cart State
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Initialize
    updateCartCount();
    setupEventListeners();
  
    // Event Listeners Setup
    function setupEventListeners() {
      // Toggle cart dropdown
      cartIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        cartDropdown.classList.toggle('show');
        if (cartDropdown.classList.contains('show')) {
          renderCartItems();
        }
      });
  
      // Close cart dropdown
      document.querySelector('.close-cart')?.addEventListener('click', function() {
        cartDropdown.classList.remove('show');
      });
  
      // Close when clicking outside
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.cart-icon') && !e.target.closest('.cart-dropdown')) {
          cartDropdown.classList.remove('show');
        }
      });
  
      // Delegated event for Add to Cart buttons
      document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart')) {
          const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
          addToCart(productId);
        }
      });
  
      // Delegated event for Remove buttons
      document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-item')) {
          const productId = parseInt(e.target.closest('.remove-item').dataset.id);
          removeFromCart(productId);
        }
      });
  
      // Clear cart button
      document.querySelector('.clear-cart')?.addEventListener('click', clearCart);
    }
  
    // Cart Functions
    function addToCart(productId) {
      const product = window.products.find(p => p.id === productId);
      if (!product) return;
  
      const existingItem = cart.find(item => item.id === productId);
  
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          ...product,
          quantity: 1
        });
      }
  
      updateCart();
      showNotification(`${product.name} added to cart!`);
  
      // Visual feedback
      const btn = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
      if (btn) {
        btn.classList.add('added');
        setTimeout(() => btn.classList.remove('added'), 500);
      }
    }
  
    function removeFromCart(productId) {
      const itemIndex = cart.findIndex(item => item.id === productId);
      
      if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        updateCart();
        showNotification('Item removed from cart');
        
        if (cartDropdown.classList.contains('show')) {
          renderCartItems();
        }
        
        if (cart.length === 0) {
          setTimeout(() => cartDropdown.classList.remove('show'), 500);
        }
      }
    }
  
    function clearCart() {
      if (cart.length === 0) return;
      
      cart = [];
      updateCart();
      showNotification('Cart cleared');
      
      if (cartDropdown.classList.contains('show')) {
        renderCartItems();
        setTimeout(() => cartDropdown.classList.remove('show'), 500);
      }
    }
  
    function renderCartItems() {
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        cartTotalPrice.textContent = '0.00';
        return;
      }
  
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-dropdown-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}">
          <div class="item-info">
            <h5>${item.name}</h5>
            <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
          </div>
          <button class="remove-item" data-id="${item.id}">
            <i class="bx bx-trash"></i>
          </button>
        </div>
      `).join('');
  
      updateCartTotal();
    }
  
    // Helper Functions
    function updateCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      updateCartTotal();
    }
  
    function updateCartCount() {
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  
    function updateCartTotal() {
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      cartTotalPrice.textContent = total.toFixed(2);
    }
  
    function showNotification(message) {
      notification.textContent = message;
      notification.classList.add('show');
      setTimeout(() => notification.classList.remove('show'), 2000);
    }
  });
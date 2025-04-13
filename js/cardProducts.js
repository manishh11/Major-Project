// products.js - Complete Product Data and Rendering
window.products = [
    {
      id: 1,
      name: 'Crispy Fried Chicken',
      price: 13.00,
      image: './images/meat-2.svg',
      rating: 5,
      category: 'Fast Food'
    },
    {
      id: 2,
      name: 'Burger Meal',
      price: 9.99,
      image: './images/burger.svg',
      rating: 4,
      category: 'Fast Food'
    },
    // Add more products as needed
  ];
  
  function renderProducts() {
    const wrapper = document.getElementById('products-wrapper');
    if (!wrapper) return;
  
    wrapper.innerHTML = window.products.map(product => `
      <div class="swiper-slide">
        <div class="card">
          <div class="image"><img src="${product.image}" alt="${product.name}"></div>
          <div class="rating">
            ${'<span><i class="bx bxs-star"></i></span>'.repeat(product.rating)}
          </div>
          <h4>${product.name}</h4>
          <div class="price">
            <span>Price</span><span class="color">$${product.price.toFixed(2)}</span>
          </div>
          <button class="add-to-cart" data-id="${product.id}">
            Add To Cart <i class="bx bx-plus"></i>
          </button>
        </div>
      </div>
    `).join('');
  }
  
  document.addEventListener('DOMContentLoaded', renderProducts);
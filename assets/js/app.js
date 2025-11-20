// Shopping Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
  const cartCounts = document.querySelectorAll('.count');
  cartCounts.forEach(count => {
    if (count.closest('.action-btn ion-icon[name="bag-handle-outline"]')?.parentElement) {
      count.textContent = cart.length;
    }
  });
}

// Add to cart function
function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showNotification(`${product.title} added to cart!`);
}

// Show notification
function showNotification(message) {
  const toast = document.querySelector('[data-toast]');
  const toastText = toast.querySelector('.toast-title');
  if (toastText) {
    toastText.textContent = message;
    toast.classList.remove('closed');
    setTimeout(() => {
      toast.classList.add('closed');
    }, 3000);
  }
}

// Load products from API and display them
async function loadProducts() {
  try {
    const products = await productsAPI.getAll();
    
    if (products && products.length > 0) {
      displayProducts(products);
    } else {
      console.log('No products found in database. Using static HTML products.');
    }
  } catch (error) {
    console.error('Error loading products:', error);
    console.log('Using static HTML products due to API error.');
  }
}

// Display products in the grid
function displayProducts(products) {
  const productGrid = document.querySelector('.product-grid');
  
  if (!productGrid) return;
  
  // Clear existing dynamic products (keep static ones)
  const dynamicProducts = productGrid.querySelectorAll('.showcase.dynamic');
  dynamicProducts.forEach(p => p.remove());
  
  products.forEach(product => {
    const productHTML = `
      <div class="showcase dynamic">
        <div class="showcase-banner">
          <img src="${product.image || './assets/images/products/jacket-1.jpg'}" 
               alt="${product.title}" 
               width="300" 
               class="product-img default">
          
          <div class="showcase-actions">
            <button class="btn-action" onclick="addToWishlist('${product._id}')">
              <ion-icon name="heart-outline"></ion-icon>
            </button>
            <button class="btn-action" onclick="viewProduct('${product._id}')">
              <ion-icon name="eye-outline"></ion-icon>
            </button>
            <button class="btn-action" onclick="addToCartBtn('${product._id}', '${product.title}', ${product.price})">
              <ion-icon name="bag-add-outline"></ion-icon>
            </button>
          </div>
        </div>
        
        <div class="showcase-content">
          <a href="#" class="showcase-category">${product.category || 'General'}</a>
          <h3>
            <a href="#" class="showcase-title">${product.title}</a>
          </h3>
          <div class="showcase-rating">
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star-outline"></ion-icon>
          </div>
          <div class="price-box">
            <p class="price">$${product.price}</p>
          </div>
        </div>
      </div>
    `;
    
    productGrid.insertAdjacentHTML('beforeend', productHTML);
  });
}

// Add to cart button handler
window.addToCartBtn = function(id, title, price) {
  if (!authAPI.isAuthenticated()) {
    showNotification('Please login to add items to cart');
    showAuthModal('login');
    return;
  }
  
  addToCart({ id, title, price, quantity: 1 });
};

// Wishlist handler (placeholder)
window.addToWishlist = function(id) {
  showNotification('Added to wishlist!');
};

// View product handler (placeholder)
window.viewProduct = function(id) {
  showNotification('Product details coming soon!');
};

// Authentication UI
function showAuthModal(type = 'login') {
  const modal = document.querySelector('[data-modal]');
  const modalContent = modal.querySelector('.modal-content');
  
  const authHTML = type === 'login' ? `
    <button class="modal-close-btn" data-modal-close onclick="closeAuthModal()">
      <ion-icon name="close-outline"></ion-icon>
    </button>
    <div class="auth-form">
      <h2>Login</h2>
      <form id="loginForm">
        <input type="email" id="loginEmail" placeholder="Email" required>
        <input type="password" id="loginPassword" placeholder="Password" required>
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="#" onclick="showAuthModal('register')">Register</a></p>
      </form>
    </div>
  ` : `
    <button class="modal-close-btn" data-modal-close onclick="closeAuthModal()">
      <ion-icon name="close-outline"></ion-icon>
    </button>
    <div class="auth-form">
      <h2>Register</h2>
      <form id="registerForm">
        <input type="text" id="registerName" placeholder="Name" required>
        <input type="email" id="registerEmail" placeholder="Email" required>
        <input type="password" id="registerPassword" placeholder="Password" required>
        <button type="submit">Register</button>
        <p>Already have an account? <a href="#" onclick="showAuthModal('login')">Login</a></p>
      </form>
    </div>
  `;
  
  modalContent.innerHTML = authHTML;
  modal.classList.remove('closed');
  
  // Add form submit handlers
  if (type === 'login') {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
  } else {
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
  }
}

function closeAuthModal() {
  const modal = document.querySelector('[data-modal]');
  modal.classList.add('closed');
}

// Handle login
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
    const data = await authAPI.login(email, password);
    showNotification(data.message || 'Login successful!');
    closeAuthModal();
    updateAuthUI();
  } catch (error) {
    showNotification(error.message || 'Login failed');
  }
}

// Handle registration
async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  
  try {
    const data = await authAPI.register(name, email, password);
    showNotification(data.message || 'Registration successful!');
    closeAuthModal();
    updateAuthUI();
  } catch (error) {
    showNotification(error.message || 'Registration failed');
  }
}

// Update authentication UI
function updateAuthUI() {
  const personBtn = document.querySelector('.action-btn ion-icon[name="person-outline"]')?.parentElement;
  
  if (personBtn) {
    if (authAPI.isAuthenticated()) {
      const user = getUser();
      personBtn.title = user?.name || user?.email || 'Account';
      personBtn.onclick = () => {
        if (confirm('Do you want to logout?')) {
          authAPI.logout();
          updateAuthUI();
          showNotification('Logged out successfully');
          cart = [];
          localStorage.removeItem('cart');
          updateCartCount();
        }
      };
    } else {
      personBtn.onclick = () => showAuthModal('login');
    }
  }
}

// Checkout function
async function checkout() {
  if (!authAPI.isAuthenticated()) {
    showNotification('Please login to checkout');
    showAuthModal('login');
    return;
  }
  
  if (cart.length === 0) {
    showNotification('Your cart is empty');
    return;
  }
  
  try {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const user = getUser();
    
    const orderData = {
      userId: user.email,
      items: cart,
      total: total,
      status: 'Pending'
    };
    
    const data = await ordersAPI.create(orderData);
    showNotification('Order placed successfully!');
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
  } catch (error) {
    showNotification('Order failed: ' + error.message);
  }
}

// Add checkout button handler
window.checkout = checkout;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateAuthUI();
  loadProducts();
  
  // Add cart button click handler
  const cartButtons = document.querySelectorAll('.action-btn ion-icon[name="bag-handle-outline"]');
  cartButtons.forEach(btn => {
    btn.parentElement.addEventListener('click', () => {
      if (!authAPI.isAuthenticated()) {
        showNotification('Please login to view cart');
        showAuthModal('login');
      } else if (cart.length === 0) {
        showNotification('Your cart is empty');
      } else {
        if (confirm(`You have ${cart.length} items in cart. Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}. Checkout now?`)) {
          checkout();
        }
      }
    });
  });
});

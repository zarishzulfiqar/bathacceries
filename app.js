// app.js - Royal Bath E-Commerce Core Application Logic

// --- STATE MANAGEMENT ---
let state = {
  products: [],
  categories: INITIAL_CATEGORIES,
  cart: [],
  wishlist: [],
  orders: [],
  coupons: [],
  customers: [],
  
  // Filters and Queries
  selectedCategory: 'all',
  priceFilter: 300000,
  discountOnly: false,
  searchQuery: '',
  sortOption: 'default',
  
  // Active Coupon code
  activeCoupon: null,
  
  // Admin State
  activeAdminTab: 'overview',
  salesChartPeriod: 'daily', // daily, weekly, monthly
  
  // Theme state
  theme: 'light'
};

// --- INITIALIZE APPLICATION STATE ---
function initApp() {
  // Load state from local storage or fall back to seed data in data.js
  state.products = JSON.parse(localStorage.getItem('rb_products')) || INITIAL_PRODUCTS;
  
  // Dynamic Hotfix: Ensure the updated gold towel rack image is loaded if old LocalStorage exists
  const towelRack = state.products.find(p => p.id === 15);
  if (towelRack && (!towelRack.image.includes('assets') || towelRack.description.includes('minutes'))) {
    towelRack.image = "assets/gold_heated_towel_rack.jpg";
    towelRack.description = "Indulge in royal comfort. Premium gold-plated wall-mounted heated towel rack equipped with a smart digital timer and energy-efficient heating rods. Dries and warms your linens to perfection.";
    saveProducts();
  }

  // Dynamic Hotfix 2: Ensure the updated scent diffuser image is loaded
  const diffuser = state.products.find(p => p.id === 19);
  if (diffuser && (!diffuser.image.includes('assets') || diffuser.description.includes('Lavender & Sandalwood'))) {
    diffuser.image = "assets/scent_diffuser_salts.jpg";
    diffuser.description = "Elevate your bath ambiance. Curated organic reed diffuser and premium mineral-rich bath salts in decorative crystal bottles. Infused with soothing notes of French Lavender and warm Mysore Sandalwood.";
    saveProducts();
  }

  // Dynamic Hotfix 3: Ensure the classic bronze wall hook image is loaded
  const bronzeHook = state.products.find(p => p.id === 8);
  if (bronzeHook && (!bronzeHook.image.includes('assets') || bronzeHook.description.includes('Slim-profile'))) {
    bronzeHook.image = "assets/classic_bronze_hook.jpg";
    bronzeHook.description = "Hand-buffed antique bronze finish wall hook, crafted from pure heavy-cast solid brass. Heavy-duty mounting system supports plush bath sheets with timeless vintage charm.";
    saveProducts();
  }

  // Dynamic Hotfix 4: Ensure the handcrafted organic soap set image is loaded
  const soapSet = state.products.find(p => p.id === 22);
  if (soapSet && (!soapSet.image.includes('assets') || soapSet.description.includes('Triple-milled cold process'))) {
    soapSet.image = "assets/organic_soap_set.jpg";
    soapSet.description = "Nourish your skin with purity. Set of three triple-milled cold-process organic soap bars, enriched with natural Shea Butter, organic Raw Honey, and botanical essences. Packaged in premium artisanal paper wrappers.";
    saveProducts();
  }

  // Dynamic Hotfix 5: Ensure the matte black robe & towel hook image is loaded
  const blackHook = state.products.find(p => p.id === 25);
  if (blackHook && (!blackHook.image.includes('assets') || blackHook.description.includes('solid brass'))) {
    blackHook.image = "assets/matte_black_hook.jpg";
    blackHook.description = "Sleek industrial sophistication. A solid brass towel hook finished in a premium matte black powder coating. Features a clean slim profile to fit any contemporary bathroom.";
    saveProducts();
  }

  state.cart = JSON.parse(localStorage.getItem('rb_cart')) || [];
  state.wishlist = JSON.parse(localStorage.getItem('rb_wishlist')) || [];
  state.orders = JSON.parse(localStorage.getItem('rb_orders')) || INITIAL_ORDERS;
  state.coupons = JSON.parse(localStorage.getItem('rb_coupons')) || INITIAL_COUPONS;
  state.customers = JSON.parse(localStorage.getItem('rb_customers')) || INITIAL_CUSTOMERS;
  
  // Load theme
  state.theme = localStorage.getItem('rb_theme') || 'light';
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcon();
  
  // Render Components
  renderCategoriesGrid();
  renderSidebarCategories();
  renderCatalog();
  renderCartBadge();
  renderWishlistBadge();
  renderReviews();
  
  // Setup Event Listeners
  setupEventListeners();
  setupHeroSlider();

  // Initialize browser history state routing
  if (!history.state) {
    history.replaceState({ view: 'home' }, '', '#');
  }
}

// --- LOCAL STORAGE UPDATERS ---
function saveProducts() { localStorage.setItem('rb_products', JSON.stringify(state.products)); }
function saveCart() { localStorage.setItem('rb_cart', JSON.stringify(state.cart)); }
function saveWishlist() { localStorage.setItem('rb_wishlist', JSON.stringify(state.wishlist)); }
function saveOrders() { localStorage.setItem('rb_orders', JSON.stringify(state.orders)); }
function saveCoupons() { localStorage.setItem('rb_coupons', JSON.stringify(state.coupons)); }
function saveCustomers() { localStorage.setItem('rb_customers', JSON.stringify(state.customers)); }

// --- DOM RENDERERS ---

// 1. Render Categories Grid in Home View
function renderCategoriesGrid() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  state.categories.forEach(cat => {
    // Count how many products are in this category
    const count = state.products.filter(p => p.category === cat.id).length;
    
    const card = document.createElement('div');
    card.className = `category-card ${state.selectedCategory === cat.id ? 'active-cat' : ''}`;
    card.setAttribute('data-cat', cat.id);
    
    card.innerHTML = `
      <div class="category-card-overlay"></div>
      <div class="category-card-content">
        <div class="category-icon">${cat.icon}</div>
        <div class="category-name">${cat.name}</div>
        <div style="font-size:0.75rem; color:var(--color-accent); margin-top:6px; font-weight:600; position:relative; z-index:10;">
          ${count} Products
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => {
      selectCategory(cat.id);
      document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    grid.appendChild(card);
  });
}

// 2. Render Categories List in Filter Sidebar
function renderSidebarCategories() {
  const sidebar = document.getElementById('sidebar-categories');
  if (!sidebar) return;
  
  sidebar.innerHTML = '';
  
  // "All Collections" option
  const totalCount = state.products.length;
  const allBtn = document.createElement('button');
  allBtn.className = `filter-category-btn ${state.selectedCategory === 'all' ? 'active' : ''}`;
  allBtn.innerHTML = `<span>All Collections</span> <span>(${totalCount})</span>`;
  allBtn.addEventListener('click', () => selectCategory('all'));
  sidebar.appendChild(allBtn);
  
  // Categories options
  state.categories.forEach(cat => {
    const count = state.products.filter(p => p.category === cat.id).length;
    const btn = document.createElement('button');
    btn.className = `filter-category-btn ${state.selectedCategory === cat.id ? 'active' : ''}`;
    btn.innerHTML = `<span>${cat.name}</span> <span>(${count})</span>`;
    btn.addEventListener('click', () => selectCategory(cat.id));
    sidebar.appendChild(btn);
  });
}

// Select a Category Filter
function selectCategory(catId) {
  state.selectedCategory = catId;
  renderSidebarCategories();
  renderCategoriesGrid();
  renderCatalog();
}

// 3. Render Product Catalog Grid (Applying filters, search, sort)
function renderCatalog() {
  const grid = document.getElementById('products-grid');
  const countLabel = document.getElementById('catalog-count-label');
  if (!grid) return;
  
  // Filter products
  let filtered = [...state.products];
  
  // Category Filter
  if (state.selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === state.selectedCategory);
  }
  
  // Max Price Filter
  filtered = filtered.filter(p => {
    const finalPrice = p.discount > 0 ? Math.round(p.price * (1 - p.discount/100)) : p.price;
    return finalPrice <= state.priceFilter;
  });
  
  // Discount Only Filter
  if (state.discountOnly) {
    filtered = filtered.filter(p => p.discount > 0);
  }
  
  // Search query filter (matches title or category or description)
  if (state.searchQuery.trim() !== '') {
    const query = state.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    );
  }
  
  // Sort products
  if (state.sortOption === 'price-low') {
    filtered.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
  } else if (state.sortOption === 'price-high') {
    filtered.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
  } else if (state.sortOption === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (state.sortOption === 'discount') {
    filtered.sort((a, b) => b.discount - a.discount);
  }
  
  // Display count
  countLabel.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
  
  // Render grid content
  grid.innerHTML = '';
  
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-products-found">
        <div class="no-products-icon">🪞</div>
        <h3 class="heading-serif" style="font-size:1.2rem; color:var(--color-primary); margin-bottom:8px;">No Products Found</h3>
        <p style="color:var(--color-text-muted); font-size:0.9rem;">We couldn't find matches. Try adjusting your filters or search keywords.</p>
      </div>
    `;
    return;
  }
  
  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const finalPrice = getFinalPrice(p);
    const hasDiscount = p.discount > 0;
    const isLiked = state.wishlist.includes(p.id);
    
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img class="product-card-img" src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="product-card-badges">
          ${hasDiscount ? `<span class="tag-discount">-${p.discount}% OFF</span>` : ''}
          ${p.stock === 0 ? `<span class="tag-discount" style="background-color:var(--color-danger)">SOLD OUT</span>` : ''}
          ${p.stock > 0 && p.stock <= 5 ? `<span class="tag-discount" style="background-color:var(--color-warning)">LOW STOCK</span>` : ''}
        </div>
        <div class="product-card-actions">
          <button class="card-action-btn ${isLiked ? 'wishlisted' : ''}" onclick="event.preventDefault(); toggleWishlist(${p.id});" aria-label="Add to wishlist">
            <i data-lucide="heart" style="${isLiked ? 'fill:currentColor' : ''}"></i>
          </button>
        </div>
      </div>
      <div class="product-card-info">
        <span class="product-card-cat">${state.categories.find(c => c.id === p.category)?.name || p.category}</span>
        <h3 class="product-card-name">${p.name}</h3>
        <div class="product-rating">
          ${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))}
          <span class="rating-count">(${p.rating})</span>
        </div>
        <div class="product-card-footer">
          <div class="price-box">
            ${hasDiscount ? `<span class="price-original">PKR ${p.price.toLocaleString()}</span>` : ''}
            <span class="price-final">PKR ${finalPrice.toLocaleString()}</span>
          </div>
          <button class="btn-add-to-cart" onclick="event.preventDefault(); handleAddToCart(${p.id});" aria-label="Add to cart" ${p.stock === 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
            <i data-lucide="shopping-bag"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  
  // Re-create icons loaded dynamically
  lucide.createIcons();
}

// Helper to get final discounted price of a product
function getFinalPrice(product) {
  if (product.discount > 0) {
    return Math.round(product.price * (1 - product.discount / 100));
  }
  return product.price;
}

// 4. Render Cart Drawer content
function renderCart() {
  const contentArea = document.getElementById('cart-content-area');
  const footerArea = document.getElementById('cart-footer-area');
  if (!contentArea || !footerArea) return;
  
  if (state.cart.length === 0) {
    contentArea.innerHTML = `
      <div class="drawer-empty">
        <div class="drawer-empty-icon">🛁</div>
        <h4 class="drawer-empty-title">Your Cart is Empty</h4>
        <p style="font-size:0.85rem; margin-bottom:20px;">Indulge in our slim premium items to build your sanctuary.</p>
        <button class="btn-primary" onclick="toggleCartDrawer(false);">Continue Shopping</button>
      </div>
    `;
    footerArea.innerHTML = '';
    return;
  }
  
  // Render Cart list
  contentArea.innerHTML = '<div class="drawer-list" id="cart-items-list"></div>';
  const list = document.getElementById('cart-items-list');
  
  let subtotal = 0;
  
  state.cart.forEach(item => {
    const p = state.products.find(prod => prod.id === item.productId);
    if (!p) return;
    
    const finalPrice = getFinalPrice(p);
    const itemTotal = finalPrice * item.quantity;
    subtotal += itemTotal;
    
    const row = document.createElement('div');
    row.className = 'drawer-item';
    row.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="drawer-item-img">
      <div class="drawer-item-details">
        <h4 class="drawer-item-name">${p.name}</h4>
        <span class="drawer-item-price">PKR ${finalPrice.toLocaleString()}</span>
        <div class="drawer-item-qty">
          <button class="qty-btn" onclick="updateCartQuantity(${p.id}, ${item.quantity - 1})">-</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartQuantity(${p.id}, ${item.quantity + 1})">+</button>
        </div>
      </div>
      <button class="drawer-item-remove" onclick="removeCartItem(${p.id})" aria-label="Remove item"><i data-lucide="trash-2"></i></button>
    `;
    list.appendChild(row);
  });
  
  // Calculate Totals
  let discountAmount = 0;
  if (state.activeCoupon) {
    discountAmount = Math.round(subtotal * (state.activeCoupon.discountPercent / 100));
  }
  
  // Delivery Fee: 500 PKR, waived if subtotal is over 50,000 PKR
  const deliveryFee = subtotal > 50000 ? 0 : 500;
  const grandTotal = subtotal - discountAmount + deliveryFee;
  
  footerArea.innerHTML = `
    <div class="coupon-container">
      <input type="text" id="coupon-code-input" class="coupon-input" placeholder="Promo Code (e.g. ROYAL10)" value="${state.activeCoupon ? state.activeCoupon.code : ''}" ${state.activeCoupon ? 'disabled' : ''}>
      <button id="coupon-apply-btn" class="coupon-btn" onclick="${state.activeCoupon ? 'removeAppliedCoupon()' : 'handleApplyCoupon()'}">
        ${state.activeCoupon ? 'Remove' : 'Apply'}
      </button>
    </div>
    <div id="coupon-msg" class="coupon-feedback ${state.activeCoupon ? 'success' : ''}">
      ${state.activeCoupon ? `Discount applied: ${state.activeCoupon.discountPercent}% off!` : ''}
    </div>
    
    <div class="calc-row">
      <span>Subtotal</span>
      <span>PKR ${subtotal.toLocaleString()}</span>
    </div>
    ${discountAmount > 0 ? `
    <div class="calc-row" style="color:var(--color-success);">
      <span>Discount (${state.activeCoupon.discountPercent}%)</span>
      <span>- PKR ${discountAmount.toLocaleString()}</span>
    </div>` : ''}
    <div class="calc-row">
      <span>Delivery (Lahore)</span>
      <span>${deliveryFee === 0 ? '<span style="color:var(--color-success); font-weight:700;">FREE</span>' : `PKR ${deliveryFee.toLocaleString()}`}</span>
    </div>
    <div class="calc-row total">
      <span>Grand Total</span>
      <span>PKR ${grandTotal.toLocaleString()}</span>
    </div>
    <button class="btn-accent btn-checkout" onclick="openCheckoutFlow()">Secure Checkout</button>
  `;
  
  lucide.createIcons();
}

// 5. Render Wishlist Drawer
function renderWishlist() {
  const list = document.getElementById('wishlist-items-list');
  if (!list) return;
  
  if (state.wishlist.length === 0) {
    list.innerHTML = `
      <div class="drawer-empty" style="height:350px;">
        <div class="drawer-empty-icon">🖤</div>
        <h4 class="drawer-empty-title">Wishlist is Empty</h4>
        <p style="font-size:0.85rem;">Save your favorite luxury fittings here.</p>
      </div>
    `;
    return;
  }
  
  list.innerHTML = '';
  state.wishlist.forEach(productId => {
    const p = state.products.find(prod => prod.id === productId);
    if (!p) return;
    
    const finalPrice = getFinalPrice(p);
    
    const row = document.createElement('div');
    row.className = 'drawer-item';
    row.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="drawer-item-img">
      <div class="drawer-item-details">
        <h4 class="drawer-item-name">${p.name}</h4>
        <span class="drawer-item-price">PKR ${finalPrice.toLocaleString()}</span>
        <button class="btn-primary" style="padding:6px 12px; font-size:0.75rem; margin-top:8px; width:fit-content;" onclick="moveWishlistToCart(${p.id})">Add to Cart</button>
      </div>
      <button class="drawer-item-remove" onclick="toggleWishlist(${p.id})" aria-label="Remove item"><i data-lucide="heart" style="fill:currentColor"></i></button>
    `;
    list.appendChild(row);
  });
  
  lucide.createIcons();
}

// 6. Render Customer Testimonials
function renderReviews() {
  const container = document.getElementById('reviews-container');
  if (!container) return;
  
  container.innerHTML = '';
  INITIAL_REVIEWS.forEach(rev => {
    const slide = document.createElement('div');
    slide.className = 'review-slide';
    slide.innerHTML = `
      <div class="review-card">
        <div class="review-stars">${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}</div>
        <p class="review-text">"${rev.comment}"</p>
        <h4 class="review-author">${rev.name}</h4>
        <div class="review-location">${rev.location}</div>
      </div>
    `;
    container.appendChild(slide);
  });
}

// Update badges counts
function renderCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function renderWishlistBadge() {
  const badge = document.getElementById('wishlist-badge');
  if (!badge) return;
  const count = state.wishlist.length;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

// --- INTERACTIVE ACTIONS (CART, WISHLIST, SEARCH, THEME) ---

// Handle Add To Cart (with stock validate)
function handleAddToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;
  
  if (product.stock <= 0) {
    alert("This premium product is currently sold out.");
    return;
  }
  
  const cartItem = state.cart.find(item => item.productId === productId);
  const currentQtyInCart = cartItem ? cartItem.quantity : 0;
  
  if (currentQtyInCart + 1 > product.stock) {
    alert(`Apologies! Only ${product.stock} units are currently in stock.`);
    return;
  }
  
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    state.cart.push({ productId, quantity: 1 });
  }
  
  saveCart();
  renderCartBadge();
  renderCart();
  
  // Visual Feedback: Slide open cart briefly to show addition
  toggleCartDrawer(true);
}

// Update Cart Quantity
function updateCartQuantity(productId, newQty) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;
  
  if (newQty <= 0) {
    removeCartItem(productId);
    return;
  }
  
  if (newQty > product.stock) {
    alert(`Only ${product.stock} items are available in stock.`);
    return;
  }
  
  const cartItem = state.cart.find(item => item.productId === productId);
  if (cartItem) {
    cartItem.quantity = newQty;
    saveCart();
    renderCart();
    renderCartBadge();
  }
}

// Remove from cart
function removeCartItem(productId) {
  state.cart = state.cart.filter(item => item.productId !== productId);
  saveCart();
  renderCart();
  renderCartBadge();
}

// Toggle Wishlist (Add / Remove)
function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  if (index > -1) {
    state.wishlist.splice(index, 1);
  } else {
    state.wishlist.push(productId);
  }
  saveWishlist();
  renderWishlistBadge();
  renderWishlist();
  renderCatalog(); // Re-render tags on product cards
}

// Move item from wishlist to cart
function moveWishlistToCart(productId) {
  handleAddToCart(productId);
  // Remove from wishlist
  state.wishlist = state.wishlist.filter(id => id !== productId);
  saveWishlist();
  renderWishlistBadge();
  renderWishlist();
}

// Apply Coupon code
function handleApplyCoupon() {
  const input = document.getElementById('coupon-code-input');
  const feedback = document.getElementById('coupon-msg');
  if (!input) return;
  
  const code = input.value.trim().toUpperCase();
  if (code === '') return;
  
  const coupon = state.coupons.find(c => c.code === code);
  if (coupon) {
    state.activeCoupon = coupon;
    feedback.textContent = `Discount applied: ${coupon.discountPercent}% off!`;
    feedback.className = "coupon-feedback success";
    renderCart();
  } else {
    feedback.textContent = "Invalid promotion code. Try ROYAL10 or LAHORE20.";
    feedback.className = "coupon-feedback error";
  }
}

// Remove applied coupon
function removeAppliedCoupon() {
  state.activeCoupon = null;
  renderCart();
}

// --- STATE FOR ROUTING ---
let isPopStateTriggered = false;

// --- DRAWER & MODAL UI CONTROL ---

function toggleCartDrawer(open, push = true) {
  const backdrop = document.getElementById('cart-drawer-backdrop');
  const drawer = document.getElementById('cart-drawer');
  if (open) {
    renderCart();
    backdrop.classList.add('active');
    drawer.classList.add('active');
    if (push && !isPopStateTriggered) {
      history.pushState({ view: 'cart' }, '', '#cart');
    }
  } else {
    backdrop.classList.remove('active');
    drawer.classList.remove('active');
    if (push && !isPopStateTriggered && window.location.hash === '#cart') {
      history.pushState({ view: 'home' }, '', '#');
    }
  }
}

function toggleWishlistDrawer(open, push = true) {
  const backdrop = document.getElementById('wishlist-drawer-backdrop');
  const drawer = document.getElementById('wishlist-drawer');
  if (open) {
    renderWishlist();
    backdrop.classList.add('active');
    drawer.classList.add('active');
    if (push && !isPopStateTriggered) {
      history.pushState({ view: 'wishlist' }, '', '#wishlist');
    }
  } else {
    backdrop.classList.remove('active');
    drawer.classList.remove('active');
    if (push && !isPopStateTriggered && window.location.hash === '#wishlist') {
      history.pushState({ view: 'home' }, '', '#');
    }
  }
}

// --- SECURE CHECKOUT FLOW ---

function openCheckoutFlow(push = true) {
  // Hide cart drawer without pushing a new history state for cart closure
  toggleCartDrawer(false, false);
  
  const backdrop = document.getElementById('checkout-modal-backdrop');
  const body = document.getElementById('checkout-modal-body');
  const title = document.getElementById('checkout-modal-title');
  if (!backdrop || !body) return;
  
  // Calculate Totals
  let subtotal = 0;
  state.cart.forEach(item => {
    const p = state.products.find(prod => prod.id === item.productId);
    if (p) subtotal += getFinalPrice(p) * item.quantity;
  });
  
  let discountAmount = 0;
  if (state.activeCoupon) {
    discountAmount = Math.round(subtotal * (state.activeCoupon.discountPercent / 100));
  }
  const deliveryFee = subtotal > 50000 ? 0 : 500;
  const grandTotal = subtotal - discountAmount + deliveryFee;
  
  title.textContent = "Secure Checkout";
  
  // Render checkout form
  body.innerHTML = `
    <div class="modal-checkout-summary">
      <h4 style="margin-bottom:10px; font-family:var(--font-serif); font-size:1rem; border-bottom:1px solid var(--color-border); padding-bottom:8px; text-transform:uppercase;">Order Summary</h4>
      <div class="modal-summary-item">
        <span>Cart Subtotal</span>
        <span>PKR ${subtotal.toLocaleString()}</span>
      </div>
      ${discountAmount > 0 ? `
      <div class="modal-summary-item" style="color:var(--color-success);">
        <span>Discount (${state.activeCoupon.code})</span>
        <span>- PKR ${discountAmount.toLocaleString()}</span>
      </div>` : ''}
      <div class="modal-summary-item">
        <span>Lahore Delivery</span>
        <span>${deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee}`}</span>
      </div>
      <div class="modal-summary-item" style="font-size:1.05rem; font-weight:700;">
        <span>Amount Payable</span>
        <span>PKR ${grandTotal.toLocaleString()}</span>
      </div>
    </div>
    
    <form id="checkout-form" onsubmit="event.preventDefault(); handleCheckoutFormSubmit();">
      <div class="form-group">
        <label for="c-name">Full Name *</label>
        <input type="text" id="c-name" class="form-control" placeholder="Salman Butt" required>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="c-email">Email Address *</label>
          <input type="email" id="c-email" class="form-control" placeholder="salman@gmail.com" required>
        </div>
        <div class="form-group">
          <label for="c-phone">Phone Number *</label>
          <input type="tel" id="c-phone" class="form-control" placeholder="0345-XXXXXXX" pattern="[0-9]{4}-[0-9]{7}" title="Format: 0345-7524413 or 03XX-XXXXXXX" required>
        </div>
      </div>
      
      <div class="form-group">
        <label for="c-address">Delivery Address (Lahore Only) *</label>
        <input type="text" id="c-address" class="form-control" placeholder="House 12-A, Street 4, Sector Y, DHA Phase 5" required>
      </div>
      
      <div class="form-group">
        <label>Payment Method</label>
        <div style="display:flex; gap:20px; margin-top:8px;">
          <label class="switch-label" style="font-weight:500;">
            <input type="radio" name="payment-method" value="cod" checked class="switch-input"> Cash on Delivery
          </label>
          <label class="switch-label" style="font-weight:500;">
            <input type="radio" name="payment-method" value="bank" class="switch-input"> Bank Transfer / IBFT
          </label>
        </div>
      </div>
      
      <button type="submit" class="btn-accent" style="width:100%; margin-top:16px;">Place Order (PKR ${grandTotal.toLocaleString()})</button>
    </form>
  `;
  
  backdrop.classList.add('active');
}

function handleCheckoutFormSubmit() {
  const name = document.getElementById('c-name').value.trim();
  const email = document.getElementById('c-email').value.trim();
  const phone = document.getElementById('c-phone').value.trim();
  const address = document.getElementById('c-address').value.trim();
  
  // Calculate Grand Total
  let subtotal = 0;
  const orderItems = [];
  
  state.cart.forEach(item => {
    const p = state.products.find(prod => prod.id === item.productId);
    if (p) {
      const finalPrice = getFinalPrice(p);
      subtotal += finalPrice * item.quantity;
      
      orderItems.push({
        id: p.id,
        name: p.name,
        quantity: item.quantity,
        price: finalPrice
      });
      
      // Deduct stock inventory levels!
      p.stock = Math.max(0, p.stock - item.quantity);
    }
  });
  
  let discountAmount = 0;
  if (state.activeCoupon) {
    discountAmount = Math.round(subtotal * (state.activeCoupon.discountPercent / 100));
  }
  const deliveryFee = subtotal > 50000 ? 0 : 500;
  const grandTotal = subtotal - discountAmount + deliveryFee;
  
  // Generate random order ID
  const orderId = `RB-${Math.floor(1000 + Math.random() * 9000)}`;
  
  // Save order record
  const newOrder = {
    id: orderId,
    customerName: name,
    customerEmail: email,
    customerPhone: phone,
    customerAddress: address,
    date: new Date().toISOString().split('T')[0],
    amount: grandTotal,
    status: 'Pending',
    items: orderItems
  };
  
  state.orders.unshift(newOrder); // Add to beginning of orders
  saveOrders();
  saveProducts(); // Save updated stocks
  
  // Update Customer Records
  let customer = state.customers.find(c => c.email.toLowerCase() === email.toLowerCase());
  if (customer) {
    customer.ordersCount += 1;
    customer.spent += grandTotal;
  } else {
    customer = {
      id: state.customers.length + 1,
      name: name,
      email: email,
      phone: phone,
      address: address.split(',').pop().trim(), // approximate general area
      ordersCount: 1,
      spent: grandTotal
    };
    state.customers.push(customer);
  }
  saveCustomers();
  
  // Clear Cart
  state.cart = [];
  state.activeCoupon = null;
  saveCart();
  
  // Refresh UI badges & list
  renderCartBadge();
  renderCatalog();
  
  // Show Success Screen
  const body = document.getElementById('checkout-modal-body');
  const title = document.getElementById('checkout-modal-title');
  title.textContent = "Order Confirmed";
  body.innerHTML = `
    <div class="order-success-screen">
      <div class="success-icon">✓</div>
      <h3 class="order-success-title">Thank You, ${name}!</h3>
      <p style="margin-bottom: 24px; color: var(--color-text-dark); font-size:1.05rem;">Your order <strong>${orderId}</strong> has been successfully placed.</p>
      <p style="color:var(--color-text-muted); font-size:0.9rem; margin-bottom:30px; max-width:480px; margin-left:auto; margin-right:auto;">
        We will contact you shortly on <strong>${phone}</strong> for confirmation. 
        Cash on Delivery / Bank details will be shared. Delivery takes 2-3 working days in Lahore.
      </p>
      <button class="btn-primary" onclick="closeCheckoutModal()">Continue Shopping</button>
    </div>
  `;
}

function closeCheckoutModal(push = true) {
  const backdrop = document.getElementById('checkout-modal-backdrop');
  if (backdrop) backdrop.classList.remove('active');
  if (push && !isPopStateTriggered && window.location.hash === '#checkout') {
    history.pushState({ view: 'home' }, '', '#');
  }
}

// --- ADMIN DASHBOARD PANEL FUNCTIONS ---

let salesChartInstance = null;
let stockChartInstance = null;

function toggleAdminPanel(open, push = true) {
  const backdrop = document.getElementById('admin-panel-backdrop');
  if (!backdrop) return;
  
  if (open) {
    backdrop.classList.add('active');
    renderAdminView();
    if (push && !isPopStateTriggered) {
      history.pushState({ view: 'admin' }, '', '#admin');
    }
  } else {
    backdrop.classList.remove('active');
    if (push && !isPopStateTriggered && window.location.hash === '#admin') {
      history.pushState({ view: 'home' }, '', '#');
    }
  }
}

// Render Admin Panel views based on current state
function renderAdminView() {
  // Update sidebar active buttons
  document.querySelectorAll('.admin-nav-item').forEach(btn => {
    if (btn.getAttribute('data-tab') === state.activeAdminTab) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Update view display
  document.querySelectorAll('.admin-view').forEach(view => {
    if (view.id === `view-${state.activeAdminTab}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });
  
  // Load specific view data
  switch(state.activeAdminTab) {
    case 'overview':
      renderOverviewTab();
      break;
    case 'orders':
      renderOrdersTab();
      break;
    case 'inventory':
      renderInventoryTab();
      break;
    case 'customers':
      renderCustomersTab();
      break;
    case 'promotions':
      renderPromotionsTab();
      break;
  }
}

// 1. Overview Tab
function renderOverviewTab() {
  // Calculate Overview metrics
  const totalRevenue = state.orders
    .filter(o => o.status === 'Delivered' || o.status === 'Shipped')
    .reduce((sum, o) => sum + o.amount, 0);
  
  const totalOrders = state.orders.length;
  
  const lowStockCount = state.products.filter(p => p.stock <= 5).length;
  const activeCouponsCount = state.coupons.length;
  
  // Update DOM cards
  document.getElementById('card-revenue').textContent = `PKR ${totalRevenue.toLocaleString()}`;
  document.getElementById('card-orders').textContent = totalOrders;
  document.getElementById('card-low-stock').textContent = lowStockCount;
  document.getElementById('card-coupons').textContent = activeCouponsCount;
  
  // Populate recent orders table preview (max 5)
  const tbody = document.getElementById('recent-orders-table-body');
  tbody.innerHTML = '';
  
  const recent = state.orders.slice(0, 5);
  recent.forEach(order => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${order.id}</strong></td>
      <td>${order.customerName}</td>
      <td>${order.date}</td>
      <td>PKR ${order.amount.toLocaleString()}</td>
      <td><span class="status-badge ${order.status.toLowerCase()}">${order.status}</span></td>
    `;
    tbody.appendChild(row);
  });
  
  // Render Overview Charts
  setTimeout(initOverviewCharts, 50); // slight timeout to allow DOM dimensions to settle
}

function initOverviewCharts() {
  const salesCtx = document.getElementById('salesChart');
  const stockCtx = document.getElementById('stockPieChart');
  
  if (!salesCtx || !stockCtx) return;
  
  // Destroy previous instances to prevent overlaps
  if (salesChartInstance) salesChartInstance.destroy();
  if (stockChartInstance) stockChartInstance.destroy();
  
  // 1. Revenue trend calculations
  let salesLabels = [];
  let salesData = [];
  
  if (state.salesChartPeriod === 'daily') {
    salesLabels = SALES_HISTORICAL_DATA.daily.map(d => d.date);
    salesData = SALES_HISTORICAL_DATA.daily.map(d => d.sales);
    
    // Mix in today's dynamic orders
    const today = new Date().toISOString().split('T')[0].substring(5); // "MM-DD"
    // Find matching date in mock historical
    const lastDaily = SALES_HISTORICAL_DATA.daily[SALES_HISTORICAL_DATA.daily.length - 1];
    // Dynamic calculation of today's placed orders
    const todayDate = new Date().toISOString().split('T')[0];
    const todayOrdersVal = state.orders
      .filter(o => o.date === todayDate)
      .reduce((sum, o) => sum + o.amount, 0);
    
    if (todayOrdersVal > 0) {
      salesData[salesData.length - 1] += todayOrdersVal;
    }
  } else if (state.salesChartPeriod === 'weekly') {
    salesLabels = SALES_HISTORICAL_DATA.weekly.map(d => d.date);
    salesData = SALES_HISTORICAL_DATA.weekly.map(d => d.sales);
  } else {
    salesLabels = SALES_HISTORICAL_DATA.monthly.map(d => d.date);
    salesData = SALES_HISTORICAL_DATA.monthly.map(d => d.sales);
  }
  
  salesChartInstance = new Chart(salesCtx, {
    type: 'line',
    data: {
      labels: salesLabels,
      datasets: [{
        label: 'Sales Revenue (PKR)',
        data: salesData,
        borderColor: '#C9A227', // gold
        backgroundColor: 'rgba(201, 162, 39, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          ticks: {
            callback: value => 'PKR ' + (value >= 1000 ? (value / 1000) + 'k' : value)
          }
        }
      }
    }
  });
  
  // 2. Stock distribution pie chart (by categories)
  const categoryCounts = {};
  state.products.forEach(p => {
    const catName = state.categories.find(c => c.id === p.category)?.name || p.category;
    categoryCounts[catName] = (categoryCounts[catName] || 0) + p.stock;
  });
  
  stockChartInstance = new Chart(stockCtx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(categoryCounts),
      datasets: [{
        data: Object.values(categoryCounts),
        backgroundColor: [
          '#16233F', '#C9A227', '#2A437E', '#DDAA11', '#405B94', 
          '#A68015', '#607DAA', '#555555', '#E5DFC9'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { boxWidth: 12, font: { size: 9 } }
        }
      }
    }
  });
}

// 2. Orders Tab
function renderOrdersTab() {
  const tbody = document.getElementById('orders-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  // Search filter
  const searchInput = document.getElementById('order-search');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  
  const filteredOrders = state.orders.filter(o => 
    o.id.toLowerCase().includes(query) ||
    o.customerName.toLowerCase().includes(query) ||
    o.customerEmail.toLowerCase().includes(query) ||
    o.customerPhone.toLowerCase().includes(query)
  );
  
  filteredOrders.forEach(order => {
    const row = document.createElement('tr');
    
    // Format items list
    const itemsDesc = order.items.map(item => `${item.name} (x${item.quantity})`).join('<br>');
    
    row.innerHTML = `
      <td><strong>${order.id}</strong></td>
      <td>
        <div style="font-weight:600;">${order.customerName}</div>
        <div style="font-size:0.75rem; color:var(--color-text-muted);">${order.customerEmail}</div>
        <div style="font-size:0.75rem; color:var(--color-text-muted);">${order.customerPhone}</div>
      </td>
      <td style="max-width:180px; font-size:0.8rem;">${order.customerAddress}</td>
      <td style="font-size:0.8rem; line-height:1.4;">${itemsDesc}</td>
      <td>${order.date}</td>
      <td style="font-weight:600;">PKR ${order.amount.toLocaleString()}</td>
      <td>
        <select class="status-badge ${order.status.toLowerCase()}" onchange="changeOrderStatus('${order.id}', this.value)" style="border:none; border-radius:4px; font-weight:700; cursor:pointer; padding:6px 10px;">
          <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
          <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
        </select>
      </td>
      <td>
        <button class="btn-action-delete" onclick="deleteOrder('${order.id}')">Cancel</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function changeOrderStatus(orderId, newStatus) {
  const order = state.orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    saveOrders();
    renderOrdersTab();
  }
}

function deleteOrder(orderId) {
  if (confirm(`Are you sure you want to cancel and delete Order ${orderId}?`)) {
    // Add back stocks
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
      order.items.forEach(item => {
        const p = state.products.find(prod => prod.id === item.id);
        if (p) p.stock += item.quantity;
      });
    }
    
    state.orders = state.orders.filter(o => o.id !== orderId);
    saveOrders();
    saveProducts();
    
    renderCatalog();
    renderOrdersTab();
  }
}

// 3. Inventory Tab
function renderInventoryTab() {
  const tbody = document.getElementById('inventory-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  state.products.forEach(p => {
    const row = document.createElement('tr');
    
    const finalPrice = getFinalPrice(p);
    const catName = state.categories.find(c => c.id === p.category)?.name || p.category;
    
    const isLowStock = p.stock <= 5;
    
    row.innerHTML = `
      <td>
        <div style="display:flex; align-items:center; gap:12px;">
          <img src="${p.image}" alt="" style="width:40px; height:40px; object-fit:cover; border-radius:4px; background-color:#ECEAE3;">
          <span style="font-weight:600;">${p.name}</span>
        </div>
      </td>
      <td>${catName}</td>
      <td>PKR ${p.price.toLocaleString()}</td>
      <td>${p.discount > 0 ? `${p.discount}%` : '0%'}</td>
      <td style="font-weight:600; color:var(--color-accent);">PKR ${finalPrice.toLocaleString()}</td>
      <td>
        <span class="stock-badge ${isLowStock ? 'low' : 'ok'}">${p.stock} units</span>
      </td>
      <td>
        <span class="status-badge ${p.stock > 0 ? 'delivered' : 'pending'}">
          ${p.stock > 0 ? 'In Stock' : 'Sold Out'}
        </span>
      </td>
      <td>
        <button class="btn-action-change" onclick="editProductStockPrompt(${p.id})">Edit Stock</button>
        <button class="btn-action-delete" onclick="deleteProduct(${p.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editProductStockPrompt(productId) {
  const p = state.products.find(prod => prod.id === productId);
  if (!p) return;
  
  const newVal = prompt(`Update stock count for "${p.name}":`, p.stock);
  if (newVal === null) return; // cancel click
  
  const qty = parseInt(newVal, 10);
  if (isNaN(qty) || qty < 0) {
    alert("Please enter a valid positive integer count.");
    return;
  }
  
  p.stock = qty;
  saveProducts();
  renderCatalog();
  renderInventoryTab();
}

function deleteProduct(productId) {
  if (confirm("Are you sure you want to delete this product from catalog?")) {
    state.products = state.products.filter(p => p.id !== productId);
    saveProducts();
    renderCatalog();
    renderSidebarCategories();
    renderCategoriesGrid();
    renderInventoryTab();
  }
}

// 4. Customers Tab
function renderCustomersTab() {
  const tbody = document.getElementById('customers-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  const searchInput = document.getElementById('customer-search');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  
  const filteredCustomers = state.customers.filter(c => 
    c.name.toLowerCase().includes(query) ||
    c.email.toLowerCase().includes(query) ||
    c.phone.toLowerCase().includes(query) ||
    c.address.toLowerCase().includes(query)
  );
  
  filteredCustomers.forEach(cust => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${cust.name}</strong></td>
      <td>${cust.email}</td>
      <td>${cust.phone}</td>
      <td>${cust.address}</td>
      <td style="text-align:center;">${cust.ordersCount}</td>
      <td style="font-weight:600; color:var(--color-accent);">PKR ${cust.spent.toLocaleString()}</td>
    `;
    tbody.appendChild(row);
  });
}

// 5. Promotions Tab
function renderPromotionsTab() {
  const tbody = document.getElementById('coupons-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  state.coupons.forEach(c => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong><code>${c.code}</code></strong></td>
      <td style="font-weight:600; color:var(--color-accent);">${c.discountPercent}%</td>
      <td>${c.description}</td>
      <td>
        <button class="btn-action-delete" onclick="deleteCoupon('${c.code}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function deleteCoupon(code) {
  if (confirm(`Delete promo code "${code}"?`)) {
    state.coupons = state.coupons.filter(c => c.code !== code);
    saveCoupons();
    renderPromotionsTab();
  }
}

// --- CONTROLLERS FOR ADD OPERATIONS (PRODUCTS, COUPONS) ---

function handleAddNewProduct(event) {
  event.preventDefault();
  
  const name = document.getElementById('new-p-name').value.trim();
  const category = document.getElementById('new-p-category').value;
  const price = parseFloat(document.getElementById('new-p-price').value);
  const discount = parseInt(document.getElementById('new-p-discount').value, 10) || 0;
  const stock = parseInt(document.getElementById('new-p-stock').value, 10);
  const image = document.getElementById('new-p-image').value.trim();
  const description = document.getElementById('new-p-desc').value.trim();
  
  // Find highest current ID
  const nextId = state.products.reduce((max, p) => p.id > max ? p.id : max, 0) + 1;
  
  const newProduct = {
    id: nextId,
    name,
    category,
    price,
    discount,
    image,
    description,
    stock,
    rating: 5.0, // default new item rating
    isFeatured: false
  };
  
  state.products.push(newProduct);
  saveProducts();
  
  // Reset Form and hide
  document.getElementById('add-product-form').reset();
  document.getElementById('add-product-container').style.display = 'none';
  
  // Refresh UI
  renderCatalog();
  renderSidebarCategories();
  renderCategoriesGrid();
  renderInventoryTab();
  
  alert(`Product "${name}" successfully added to the catalog.`);
}

function handleAddNewCoupon(event) {
  event.preventDefault();
  
  const code = document.getElementById('new-c-code').value.trim().toUpperCase();
  const discountPercent = parseInt(document.getElementById('new-c-discount').value, 10);
  const description = document.getElementById('new-c-desc').value.trim();
  
  // Check duplicates
  if (state.coupons.find(c => c.code === code)) {
    alert("This promo code already exists.");
    return;
  }
  
  const newCoupon = { code, discountPercent, description };
  state.coupons.push(newCoupon);
  saveCoupons();
  
  // Reset form
  document.getElementById('add-coupon-form').reset();
  
  // Refresh UI
  renderPromotionsTab();
}

// --- EVENT LISTENERS REGISTRATION ---
function setupEventListeners() {
  
  // Header Scrolled effect
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Open / Close Cart Drawer
  document.getElementById('cart-trigger').addEventListener('click', () => toggleCartDrawer(true));
  document.getElementById('cart-close-btn').addEventListener('click', () => toggleCartDrawer(false));
  document.getElementById('cart-drawer-backdrop').addEventListener('click', (e) => {
    if (e.target.id === 'cart-drawer-backdrop') toggleCartDrawer(false);
  });
  
  // Open / Close Wishlist Drawer
  document.getElementById('wishlist-trigger').addEventListener('click', () => toggleWishlistDrawer(true));
  document.getElementById('wishlist-close-btn').addEventListener('click', () => toggleWishlistDrawer(false));
  document.getElementById('wishlist-drawer-backdrop').addEventListener('click', (e) => {
    if (e.target.id === 'wishlist-drawer-backdrop') toggleWishlistDrawer(false);
  });
  
  // Open / Close Checkout Modal
  document.getElementById('checkout-modal-backdrop').addEventListener('click', (e) => {
    if (e.target.id === 'checkout-modal-backdrop') closeCheckoutModal();
  });
  
  // Admin trigger buttons
  document.getElementById('nav-admin-trigger').addEventListener('click', (e) => {
    e.preventDefault();
    toggleAdminPanel(true);
  });
  document.getElementById('footer-admin-trigger').addEventListener('click', (e) => {
    e.preventDefault();
    toggleAdminPanel(true);
  });
  document.getElementById('admin-close-btn').addEventListener('click', () => toggleAdminPanel(false));
  
  // Admin Navigation switching
  document.querySelectorAll('.admin-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeAdminTab = btn.getAttribute('data-tab');
      renderAdminView();
    });
  });
  
  // Add Product Form Toggles
  document.getElementById('add-product-trigger').addEventListener('click', () => {
    const box = document.getElementById('add-product-container');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
  });
  document.getElementById('add-product-cancel').addEventListener('click', () => {
    document.getElementById('add-product-container').style.display = 'none';
  });
  
  // Form submits in Admin Dashboard
  document.getElementById('add-product-form').addEventListener('submit', handleAddNewProduct);
  document.getElementById('add-coupon-form').addEventListener('submit', handleAddNewCoupon);
  
  // Live Search Input (Shop Section Catalog & Header Search)
  const liveSearch = document.getElementById('live-search');
  liveSearch.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderCatalog();
    
    // If not visible, scroll down to shop
    const shopSect = document.getElementById('shop-section');
    const rect = shopSect.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) {
      shopSect.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  // Price Slider input
  const priceSlider = document.getElementById('price-slider');
  const priceValText = document.getElementById('price-slider-val');
  priceSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    state.priceFilter = val;
    priceValText.textContent = `PKR ${val.toLocaleString()}`;
    renderCatalog();
  });
  
  // Discount toggle switch
  const discountSwitch = document.getElementById('discount-switch');
  discountSwitch.addEventListener('change', (e) => {
    state.discountOnly = e.target.checked;
    renderCatalog();
  });
  
  // Sort Dropdown
  const sortSelect = document.getElementById('sort-select');
  sortSelect.addEventListener('change', (e) => {
    state.sortOption = e.target.value;
    renderCatalog();
  });
  
  // Clear Filters Button
  document.getElementById('filter-clear-btn').addEventListener('click', () => {
    state.selectedCategory = 'all';
    state.priceFilter = 300000;
    state.discountOnly = false;
    state.searchQuery = '';
    state.sortOption = 'default';
    
    // Reset DOM controls
    liveSearch.value = '';
    priceSlider.value = 300000;
    priceValText.textContent = 'PKR 300,000';
    discountSwitch.checked = false;
    sortSelect.value = 'default';
    
    renderSidebarCategories();
    renderCategoriesGrid();
    renderCatalog();
  });
  
  // Chart Period Toggles
  document.getElementById('sales-chart-toggles').addEventListener('click', (e) => {
    if (e.target.classList.contains('chart-toggle-btn')) {
      document.querySelectorAll('#sales-chart-toggles .chart-toggle-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      state.salesChartPeriod = e.target.getAttribute('data-period');
      initOverviewCharts();
    }
  });
  
  // Search inputs inside Admin
  document.getElementById('order-search').addEventListener('input', renderOrdersTab);
  document.getElementById('customer-search').addEventListener('input', renderCustomersTab);
  
  // Theme Toggle click
  document.getElementById('theme-toggle').addEventListener('click', () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('rb_theme', state.theme);
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcon();
  });

  // History visual navigation buttons
  document.getElementById('nav-back-btn').addEventListener('click', () => {
    history.back();
  });
  document.getElementById('nav-forward-btn').addEventListener('click', () => {
    history.forward();
  });

  // Database Export Button click
  document.getElementById('export-database-btn').addEventListener('click', () => {
    const dbContent = `// data.js - Custom Database Exported on ${new Date().toLocaleDateString()}\n\n` +
      `const INITIAL_CATEGORIES = ${JSON.stringify(state.categories, null, 2)};\n\n` +
      `const INITIAL_PRODUCTS = ${JSON.stringify(state.products, null, 2)};\n\n` +
      `const INITIAL_REVIEWS = ${JSON.stringify(INITIAL_REVIEWS, null, 2)};\n\n` +
      `const INITIAL_COUPONS = ${JSON.stringify(state.coupons, null, 2)};\n\n` +
      `const INITIAL_CUSTOMERS = ${JSON.stringify(state.customers, null, 2)};\n\n` +
      `const INITIAL_ORDERS = ${JSON.stringify(state.orders, null, 2)};\n\n` +
      `const SALES_HISTORICAL_DATA = ${JSON.stringify(SALES_HISTORICAL_DATA, null, 2)};\n`;
      
    const blob = new Blob([dbContent], { type: 'text/javascript;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.js';
    link.click();
    
    alert("Database exported successfully! Copy the downloaded 'data.js' file into your Royal Bath showroom folder to replace the initial database and save your products permanently.");
  });
  
  // Testimonial Navigation Click
  setupTestimonialNav();
}

// Update Theme Toggler button icon
function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (state.theme === 'dark') {
    icon.setAttribute('data-lucide', 'sun');
  } else {
    icon.setAttribute('data-lucide', 'moon');
  }
  lucide.createIcons();
}

// --- HERO SLIDER NAVIGATION CONTROLLER ---
function setupHeroSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');
  const dotsContainer = document.getElementById('slider-dots-container');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  let slideInterval = setInterval(nextSlide, 6000);
  
  function updateSlides() {
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  }
  
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 6000);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }
  
  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('slider-dot')) {
        currentSlide = parseInt(e.target.getAttribute('data-index'), 10);
        updateSlides();
        resetInterval();
      }
    });
  }
}

// --- TESTIMONIAL REVIEWS SLIDER CONTROLLER ---
function setupTestimonialNav() {
  const container = document.getElementById('reviews-container');
  const prevBtn = document.getElementById('review-prev-btn');
  const nextBtn = document.getElementById('review-next-btn');
  
  if (!container || !prevBtn || !nextBtn) return;
  
  let index = 0;
  
  function updateCarousel() {
    const totalSlides = INITIAL_REVIEWS.length;
    container.style.transform = `translateX(-${index * 100}%)`;
  }
  
  prevBtn.addEventListener('click', () => {
    const totalSlides = INITIAL_REVIEWS.length;
    index = (index - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });
  
  nextBtn.addEventListener('click', () => {
    const totalSlides = INITIAL_REVIEWS.length;
    index = (index + 1) % totalSlides;
    updateCarousel();
  });
}

// Close Secure checkout dialog
function closeCheckoutModal(push = true) {
  const backdrop = document.getElementById('checkout-modal-backdrop');
  if (backdrop) backdrop.classList.remove('active');
  if (push && !isPopStateTriggered && window.location.hash === '#checkout') {
    history.pushState({ view: 'home' }, '', '#');
  }
}

// --- HISTORY STATE POPSTATE ROUTER ---
window.addEventListener('popstate', (event) => {
  isPopStateTriggered = true;
  
  // Close all elements first
  toggleCartDrawer(false, false);
  toggleWishlistDrawer(false, false);
  toggleAdminPanel(false, false);
  closeCheckoutModal(false);
  
  const stateData = event.state;
  if (stateData) {
    if (stateData.view === 'cart') toggleCartDrawer(true, false);
    else if (stateData.view === 'wishlist') toggleWishlistDrawer(true, false);
    else if (stateData.view === 'admin') toggleAdminPanel(true, false);
    else if (stateData.view === 'checkout') openCheckoutFlow(false);
  }
  
  isPopStateTriggered = false;
});

// --- LAUNCH APPLICATION ON WINDOW LOAD ---
window.addEventListener('DOMContentLoaded', initApp);

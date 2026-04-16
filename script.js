// ==========================================
// Snapdeal Clone – Optimized Script
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ---------- Cache DOM references ----------
  const productsContainer = document.getElementById('products');
  const cartCount = document.getElementById('cartCount');
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  const slidesContainer = document.querySelector('.slides');
  const carouselSlides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const carouselNext = document.querySelector('.next');
  const carouselPrev = document.querySelector('.prev');
  const carouselElement = document.querySelector('.carousel');

  let allProducts = [];
  let cartItems = 0;
  let carouselIndex = 0;
  let slideInterval = null;

  // ---------- Local products for "Deal of the Day" ----------
  const localDeals = [
    { title: "Graceful Saree", image: "images/saree.jpg", discount: "MIN. 60% OFF" },
    { title: "Non-stick Cookware", image: "images/cookware.jpg", discount: "MIN. 50% OFF" },
    { title: "Latest Smartphone", image: "images/smartphone.jpg", discount: "UNDER ₹9999" },
    { title: "Denim Jeans", image: "images/jeans.jpg", discount: "MIN. 70% OFF" },
    { title: "Travel Backpack", image: "images/backpack.jpg", discount: "MIN. 50% OFF" },
    { title: "Sports Shoes", image: "images/shoes.jpg", discount: "MIN. 60% OFF" },
    { title: "Cotton T-Shirt", image: "images/tshirt.jpg", discount: "UNDER ₹499" },
    { title: "Stylish Sunglasses", image: "images/sunglasses.jpg", discount: "MIN. 70% OFF" },
    { title: "Everyday Makeup", image: "images/makeupkit.jpg", discount: "UNDER ₹299" },
    { title: "Wireless Headphones", image: "images/wirelessheadphone.jpg", discount: "MIN. 40% OFF" }
  ];

  // ==========================================
  //  UTILITY: Debounce
  // ==========================================
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // ==========================================
  //  PRODUCTS
  // ==========================================

  // Fetch products from API
  async function fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Network response was not ok');
      allProducts = await response.json();
      displayProducts(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      // If API fails, still show local deals
      displayProducts([]);
    }
  }

  // Display products using DocumentFragment (single DOM write)
  function displayProducts(apiProducts) {
    // Build combined list
    let combinedDeals = [...localDeals];

    if (apiProducts.length > 0) {
      for (const product of apiProducts) {
        combinedDeals.push({
          title: product.title,
          image: product.image,
          discount: "MIN. 50% OFF"
        });
      }
    }

    // Limit to exactly 10 items (2 rows of 5)
    combinedDeals = combinedDeals.slice(0, 10);

    // Build all cards in a DocumentFragment (avoids repeated reflows)
    const fragment = document.createDocumentFragment();

    for (const product of combinedDeals) {
      const card = document.createElement('div');
      card.className = 'product-card';

      const shortenedTitle = product.title.length > 25
        ? product.title.substring(0, 22) + '...'
        : product.title;

      card.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.title}" loading="lazy" decoding="async">
        </div>
        <div class="product-info">
          <h3 class="product-title" title="${product.title}">${shortenedTitle}</h3>
          <p class="product-discount">${product.discount}</p>
        </div>
      `;

      fragment.appendChild(card);
    }

    // Single DOM write
    productsContainer.innerHTML = '';
    productsContainer.appendChild(fragment);
  }

  // ==========================================
  //  CART
  // ==========================================
  window.addToCart = function () {
    cartItems++;
    cartCount.textContent = cartItems;
    cartCount.style.transform = 'scale(1.3)';
    setTimeout(() => {
      cartCount.style.transform = 'scale(1)';
    }, 200);
  };

  // ==========================================
  //  SMART SEARCH SYSTEM
  // ==========================================

  // Rich product catalog for search suggestions
  const searchCatalog = [
    { id: 1, name: "Banarasi Silk Saree", category: "Women's Fashion", image: "images/saree.jpg", price: 1299, mrp: 3499, discount: 63, rating: 4.3, reviews: 2841, desc: "Elegant Banarasi silk saree with intricate golden zari work, perfect for weddings and festive occasions. Comes with matching blouse piece.", highlights: ["Pure Banarasi Silk", "Golden Zari Border", "Blouse Piece Included", "Dry Clean Only"] },
    { id: 2, name: "Non-Stick Cookware Set", category: "Home & Kitchen", image: "images/cookware.jpg", price: 1499, mrp: 3999, discount: 63, rating: 4.5, reviews: 5230, desc: "Premium 5-piece non-stick cookware set with durable ceramic coating. Includes frying pan, kadai, saucepan, tawa and dosa tawa.", highlights: ["5-Piece Set", "Ceramic Non-Stick Coating", "Induction Compatible", "Dishwasher Safe"] },
    { id: 3, name: "Smartphone 5G 128GB", category: "Electronics", image: "images/smartphone.jpg", price: 9999, mrp: 19999, discount: 50, rating: 4.2, reviews: 12580, desc: "Latest 5G smartphone with 128GB storage, 6GB RAM, 48MP triple camera system, 5000mAh battery and 6.5-inch AMOLED display.", highlights: ["5G Connectivity", "48MP Triple Camera", "5000mAh Battery", "6.5\" AMOLED Display"] },
    { id: 4, name: "Cotton Casual T-Shirt", category: "Men's Fashion", image: "images/tshirt.jpg", price: 449, mrp: 1199, discount: 63, rating: 4.1, reviews: 8920, desc: "Premium 100% cotton round-neck t-shirt with trendy printed graphics. Comfortable fit for everyday casual wear.", highlights: ["100% Cotton", "Round Neck", "Machine Washable", "Regular Fit"] },
    { id: 5, name: "Sports Running Shoes", category: "Men's Fashion", image: "images/shoes.jpg", price: 1299, mrp: 3499, discount: 63, rating: 4.4, reviews: 6340, desc: "Lightweight sports running shoes with EVA cushioning sole, breathable mesh upper and anti-slip rubber outsole.", highlights: ["Breathable Mesh Upper", "EVA Cushion Sole", "Anti-Slip Outsole", "Lightweight Design"] },
    { id: 6, name: "Slim Fit Denim Jeans", category: "Men's Fashion", image: "images/jeans.jpg", price: 999, mrp: 2499, discount: 60, rating: 4.0, reviews: 4620, desc: "Stylish slim-fit stretchable denim jeans with 5-pocket design. Perfect for casual and semi-formal occasions.", highlights: ["Stretchable Denim", "Slim Fit", "5-Pocket Design", "Belt Loop Closure"] },
    { id: 7, name: "Travel Backpack 40L", category: "Bags & Luggage", image: "images/backpack.jpg", price: 799, mrp: 1999, discount: 60, rating: 4.3, reviews: 3150, desc: "Spacious 40L travel backpack with laptop compartment, water-resistant fabric and multiple organizer pockets.", highlights: ["40L Capacity", "Laptop Compartment", "Water Resistant", "Padded Shoulder Straps"] },
    { id: 8, name: "Designer Sunglasses UV400", category: "Women's Fashion", image: "images/sunglasses.jpg", price: 349, mrp: 899, discount: 61, rating: 4.2, reviews: 1890, desc: "Fashionable designer sunglasses with UV400 protection, polarized lenses and durable metal frame.", highlights: ["UV400 Protection", "Polarized Lenses", "Metal Frame", "Unisex Design"] },
    { id: 9, name: "Premium Makeup Kit", category: "Beauty & Health", image: "images/makeupkit.jpg", price: 599, mrp: 1499, discount: 60, rating: 4.6, reviews: 7450, desc: "All-in-one professional makeup kit with eyeshadow palette, lipsticks, foundation, blush and makeup brushes.", highlights: ["24 Shade Eyeshadow", "6 Lipstick Shades", "HD Foundation", "Professional Brushes"] },
    { id: 10, name: "Wireless Headphones", category: "Electronics", image: "images/wirelessheadphone.jpg", price: 2499, mrp: 5999, discount: 58, rating: 4.5, reviews: 9870, desc: "Over-ear wireless Bluetooth headphones with active noise cancellation, 40mm drivers and 30-hour battery life.", highlights: ["Active Noise Cancellation", "40mm Dynamic Drivers", "30-Hour Battery", "Bluetooth 5.2"] },
    { id: 11, name: "Bluetooth Earbuds TWS", category: "Electronics", image: "images/bluetoothearbud.jpg", price: 1299, mrp: 3499, discount: 63, rating: 4.3, reviews: 15200, desc: "True wireless stereo earbuds with touch controls, IPX5 water resistance, low-latency gaming mode and 28-hour total playtime.", highlights: ["True Wireless Stereo", "IPX5 Water Resistant", "Touch Controls", "28-Hour Battery Life"] },
    { id: 12, name: "Vitamin C Face Serum", category: "Beauty & Health", image: "images/vitamincserum.png", price: 299, mrp: 799, discount: 63, rating: 4.4, reviews: 11340, desc: "Brightening Vitamin C face serum with hyaluronic acid for glowing, hydrated skin. Reduces dark spots and fine lines.", highlights: ["20% Vitamin C", "Hyaluronic Acid", "Reduces Dark Spots", "Cruelty Free"] },
    { id: 13, name: "Sunscreen SPF 50+", category: "Beauty & Health", image: "images/sunscreenspf50.jpg", price: 199, mrp: 499, discount: 60, rating: 4.5, reviews: 18920, desc: "Broad-spectrum SPF 50+ sunscreen with PA+++ protection, lightweight non-greasy formula suitable for all skin types.", highlights: ["SPF 50+ PA+++", "Non-Greasy Formula", "Water Resistant", "All Skin Types"] },
    { id: 14, name: "Steel Kadai with Lid", category: "Home & Kitchen", image: "images/steelkadhai.webp", price: 799, mrp: 1999, discount: 60, rating: 4.3, reviews: 4210, desc: "Heavy-gauge stainless steel kadai with glass lid, tri-ply base for even heat distribution. Suitable for induction and gas.", highlights: ["Stainless Steel", "Glass Lid Included", "Tri-Ply Base", "Induction Compatible"] },
    { id: 15, name: "Induction Cooktop", category: "Home & Kitchen", image: "images/induction.png", price: 2199, mrp: 4999, discount: 56, rating: 4.1, reviews: 3890, desc: "2000W induction cooktop with crystal glass top, 8 preset menus, auto-shut off and LED display panel.", highlights: ["2000W Power", "Crystal Glass Top", "8 Preset Menus", "Energy Efficient"] },
    { id: 16, name: "Cosmetics Combo Set", category: "Beauty & Health", image: "images/cosmetic.jpg", price: 299, mrp: 799, discount: 63, rating: 4.2, reviews: 6780, desc: "Complete beauty combo set including foundation, compact powder, mascara, eyeliner and lip gloss.", highlights: ["5-Product Combo", "Long Lasting", "Skin-Friendly", "Travel Friendly"] },
  ];

  const searchDropdown = document.getElementById('searchDropdown');

  if (searchInput) {
    // Show dropdown on focus (trending items when empty)
    searchInput.addEventListener('focus', () => {
      const query = searchInput.value.trim();
      if (query.length === 0) {
        showTrendingSuggestions();
      } else {
        renderSearchResults(query);
      }
    });

    // Dismiss dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        searchDropdown.classList.remove('visible');
      }
    });

    // Debounced smart search handler
    const handleSmartSearch = debounce((searchTerm) => {
      if (searchTerm.length === 0) {
        showTrendingSuggestions();
        return;
      }
      renderSearchResults(searchTerm);

      // Also filter main products grid
      const filtered = allProducts.filter(p =>
        p.title.toLowerCase().includes(searchTerm)
      );
      displayProducts(filtered);
    }, 200);

    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      clearSearch.style.display = searchTerm.length > 0 ? 'block' : 'none';
      handleSmartSearch(searchTerm);
    });

    clearSearch.addEventListener('click', () => {
      searchInput.value = '';
      clearSearch.style.display = 'none';
      displayProducts(allProducts);
      showTrendingSuggestions();
      searchInput.focus();
    });
  }

  /** Show trending suggestions when search is empty */
  function showTrendingSuggestions() {
    const trending = [
      { text: "Saree for women", cat: "Women's Fashion" },
      { text: "Kitchen cookware set", cat: "Home & Kitchen" },
      { text: "Men's sports shoes", cat: "Men's Fashion" },
      { text: "Smartphone under 10000", cat: "Electronics" },
      { text: "Travel backpack", cat: "Bags & Luggage" },
      { text: "Wireless headphones", cat: "Electronics" },
    ];

    // Show 4 random recommended products
    const shuffled = [...searchCatalog].sort(() => 0.5 - Math.random());
    const recommended = shuffled.slice(0, 4);

    let html = `
      <div class="search-dd-section"><div class="search-dd-label"><i class="fas fa-fire"></i> Trending Searches</div></div>
    `;

    for (const item of trending) {
      html += `
        <div class="search-dd-text-item" onclick="fillSearch('${item.text}')">
          <i class="fas fa-arrow-trend-up"></i>
          <span class="sdd-text">${item.text}</span>
          <span class="sdd-category">${item.cat}</span>
        </div>
      `;
    }

    html += `<div class="search-dd-section"><div class="search-dd-label"><i class="fas fa-star"></i> Recommended For You</div></div>`;
    html += `<div class="search-dd-products">`;
    for (const p of recommended) {
      html += buildSearchProductCard(p);
    }
    html += `</div>`;

    searchDropdown.innerHTML = html;
    searchDropdown.classList.add('visible');
  }

  /** Render filtered search results */
  function renderSearchResults(query) {
    const lower = query.toLowerCase();

    // Text matches (name or category)
    const textMatches = searchCatalog.filter(p =>
      p.name.toLowerCase().includes(lower) || p.category.toLowerCase().includes(lower)
    );

    if (textMatches.length === 0) {
      searchDropdown.innerHTML = `
        <div class="search-dd-empty">
          <i class="fas fa-search"></i>
          <span>No products found for "<strong>${query}</strong>"</span>
        </div>
      `;
      searchDropdown.classList.add('visible');
      return;
    }

    // Split into text suggestions (first 4) and product cards (first 4)
    const textSuggestions = textMatches.slice(0, 4);
    const productCards = textMatches.slice(0, 4);

    let html = `<div class="search-dd-section"><div class="search-dd-label"><i class="fas fa-search"></i> Suggestions</div></div>`;

    for (const item of textSuggestions) {
      const highlighted = item.name.replace(
        new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
        '<em>$1</em>'
      );
      html += `
        <div class="search-dd-text-item" onclick="fillSearch('${item.name}')">
          <i class="fas fa-search"></i>
          <span class="sdd-text">${highlighted}</span>
          <span class="sdd-category">${item.category}</span>
        </div>
      `;
    }

    html += `<div class="search-dd-section"><div class="search-dd-label"><i class="fas fa-box-open"></i> Products</div></div>`;
    html += `<div class="search-dd-products">`;
    for (const p of productCards) {
      html += buildSearchProductCard(p);
    }
    html += `</div>`;

    searchDropdown.innerHTML = html;
    searchDropdown.classList.add('visible');
  }

  /** Build a single product card for the search dropdown */
  function buildSearchProductCard(p) {
    return `
      <div class="search-dd-product" onclick="openProductDetail(${p.id})">
        <div class="search-dd-product-img">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="search-dd-product-info">
          <span class="search-dd-product-name">${p.name}</span>
          <span class="search-dd-product-price">₹${p.price.toLocaleString('en-IN')} <del>₹${p.mrp.toLocaleString('en-IN')}</del></span>
          <span class="search-dd-product-discount">${p.discount}% OFF</span>
        </div>
      </div>
    `;
  }

  // Expose functions globally for inline onclick
  window.fillSearch = function(text) {
    searchInput.value = text;
    clearSearch.style.display = 'block';
    renderSearchResults(text);
    searchInput.focus();
  };

  window.searchCatalogData = searchCatalog;

  // ==========================================
  //  CAROUSEL (crossfade-based)
  // ==========================================
  const slideLinks = document.querySelectorAll('.slide-link');

  function showSlide(i) {
    if (slideLinks.length === 0) return;

    // Remove active from all slides
    slideLinks.forEach(sl => sl.classList.remove('active'));

    // Activate the target slide
    if (slideLinks[i]) slideLinks[i].classList.add('active');

    // Update dots – force reflow so the ::after animation restarts cleanly
    if (dots.length > 0) {
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[i]) {
        void dots[i].offsetWidth; // trigger reflow to restart CSS animation
        dots[i].classList.add('active');
      }
    }
  }

  function nextSlide() {
    if (slideLinks.length === 0) return;
    carouselIndex = (carouselIndex + 1) % slideLinks.length;
    showSlide(carouselIndex);
  }

  function prevSlide() {
    if (slideLinks.length === 0) return;
    carouselIndex = (carouselIndex - 1 + slideLinks.length) % slideLinks.length;
    showSlide(carouselIndex);
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 1500);
  }

  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Navigation buttons
  if (carouselNext) carouselNext.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); startAutoSlide(); });
  if (carouselPrev) carouselPrev.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); startAutoSlide(); });

  // Dot click navigation
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      carouselIndex = idx;
      showSlide(carouselIndex);
      startAutoSlide();
    });
  });

  // Pause on hover
  if (carouselElement) {
    carouselElement.addEventListener('mouseenter', stopAutoSlide);
    carouselElement.addEventListener('mouseleave', startAutoSlide);
  }

  // Keyboard navigation (arrow keys)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { nextSlide(); startAutoSlide(); }
    if (e.key === 'ArrowLeft')  { prevSlide(); startAutoSlide(); }
  });

  // Touch / swipe support for mobile
  if (carouselElement) {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    carouselElement.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    }, { passive: true });

    carouselElement.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > minSwipeDistance) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      startAutoSlide();
    }, { passive: true });
  }

  // Pause when browser tab is hidden (saves CPU)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });

  // ==========================================
  //  INIT
  // ==========================================
  // Slide 0 is already marked active in HTML — don't call showSlide(0)
  // as it would strip+re-add the active class, causing a flicker and
  // restarting the Ken Burns zoom before the first auto-advance fires.
  // Just kick off the timer directly.
  startAutoSlide();
  fetchProducts();

  // ==========================================
  //  SHOWCASE SECTIONS (Scroll + Click)
  // ==========================================
  initShowcaseSections();

  function initShowcaseSections() {
    // --- Scroll arrows for all showcase sections ---
    const wrappers = document.querySelectorAll('.showcase-scroll-wrapper');
    wrappers.forEach(wrapper => {
      const track = wrapper.querySelector('.showcase-track');
      const leftBtn = wrapper.querySelector('.showcase-arrow-left');
      const rightBtn = wrapper.querySelector('.showcase-arrow-right');
      if (!track) return;

      const scrollAmount = 340; // px to scroll per click

      if (rightBtn) {
        rightBtn.addEventListener('click', () => {
          track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
      }
      if (leftBtn) {
        leftBtn.addEventListener('click', () => {
          track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
      }

      // Touch/drag horizontal scroll for desktop
      let isDown = false;
      let startX, scrollLeft;

      track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.style.cursor = 'grabbing';
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
      });

      track.addEventListener('mouseleave', () => {
        isDown = false;
        track.style.cursor = 'grab';
      });

      track.addEventListener('mouseup', () => {
        isDown = false;
        track.style.cursor = 'grab';
      });

      track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        track.scrollLeft = scrollLeft - walk;
      });
    });

    // --- Card click → open product detail modal ---
    const showcaseCards = document.querySelectorAll('.showcase-card[data-product-id]');
    showcaseCards.forEach(card => {
      card.addEventListener('click', () => {
        const productId = parseInt(card.getAttribute('data-product-id'));
        if (productId && typeof openProductDetail === 'function') {
          openProductDetail(productId);
        }
      });
    });
  }

  // ==========================================
  //  SCROLL-REVEAL ANIMATIONS
  // ==========================================
  initScrollReveal();

  function initScrollReveal() {
    const revealElements = document.querySelectorAll(
      '.showcase-section, .deal-section, .service-container, .app-banner'
    );

    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('reveal-on-scroll');
      revealObserver.observe(el);
    });
  }

  // ==========================================
  //  PRODUCT CARD CLICK (Deal of the Day)
  // ==========================================
  // Make Deal of the Day product cards clickable too
  function attachProductCardClicks() {
    const dealCards = document.querySelectorAll('.product-card');
    dealCards.forEach(card => {
      card.style.cursor = 'pointer';

      card.addEventListener('click', () => {
        // Match by product title to catalog
        const titleEl = card.querySelector('.product-title');
        if (!titleEl) return;
        const title = titleEl.textContent.toLowerCase();
        const catalog = window.searchCatalogData || [];
        const matched = catalog.find(p => p.name.toLowerCase().includes(title) || title.includes(p.name.toLowerCase().substring(0, 10)));
        if (matched) {
          openProductDetail(matched.id);
        }
      });
    });
  }

  // Attach after products render (observer to wait for products)
  const productsObserver = new MutationObserver(() => {
    const cards = document.querySelectorAll('.product-card');
    if (cards.length > 0) {
      attachProductCardClicks();
      productsObserver.disconnect();
    }
  });
  if (productsContainer) {
    productsObserver.observe(productsContainer, { childList: true });
  }

});

// ==========================================
//  LOGIN MODAL (global scope for inline handlers)
// ==========================================

/** Open the login modal */
function openLoginModal() {
  const overlay = document.getElementById('loginModalOverlay');
  const modal = overlay.querySelector('.login-modal');

  // Reset to login tab each time
  switchModalTab('login');

  // Show overlay
  overlay.classList.add('active');
  document.body.classList.add('login-modal-open');

  // Remove any leftover closing animation class
  modal.classList.remove('closing');

  // Focus the first input after animation
  setTimeout(() => {
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
  }, 350);
}

/** Close the login modal */
function closeLoginModal(event, force) {
  // If called from overlay click, only close when clicking the overlay itself
  if (event && !force && event.target !== document.getElementById('loginModalOverlay')) return;

  const overlay = document.getElementById('loginModalOverlay');
  const modal = overlay.querySelector('.login-modal');

  // Animate out
  modal.classList.add('closing');

  setTimeout(() => {
    overlay.classList.remove('active');
    modal.classList.remove('closing');
    document.body.classList.remove('login-modal-open');
  }, 250);
}

/** Switch between login and signup tabs */
function switchModalTab(type) {
  const loginForm = document.getElementById('modal-login-form');
  const signupForm = document.getElementById('modal-signup-form');
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');

  if (!loginForm || !signupForm) return;

  loginTab.classList.remove('active');
  signupTab.classList.remove('active');

  if (type === 'login') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    loginTab.classList.add('active');
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    signupTab.classList.add('active');
  }
}

/** Toggle password visibility */
function togglePasswordVisibility(inputId, icon) {
  const input = document.getElementById(inputId);
  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const loginOverlay = document.getElementById('loginModalOverlay');
    if (loginOverlay && loginOverlay.classList.contains('active')) {
      closeLoginModal(null, true);
    }
    const pdOverlay = document.getElementById('productDetailOverlay');
    if (pdOverlay && pdOverlay.classList.contains('active')) {
      closeProductDetail(null, true);
    }
  }
});

// ==========================================
//  PRODUCT DETAIL MODAL
// ==========================================

let currentDetailProduct = null;

/** Open the product detail modal */
function openProductDetail(productId) {
  const catalog = window.searchCatalogData || [];
  const product = catalog.find(p => p.id === productId);
  if (!product) return;

  currentDetailProduct = product;

  // Hide search dropdown
  const dd = document.getElementById('searchDropdown');
  if (dd) dd.classList.remove('visible');

  // Fill modal content
  document.getElementById('pdImage').src = product.image;
  document.getElementById('pdImage').alt = product.name;
  document.getElementById('pdTitle').textContent = product.name;
  document.getElementById('pdDesc').textContent = product.desc;
  document.getElementById('pdPrice').textContent = `₹${product.price.toLocaleString('en-IN')}`;
  document.getElementById('pdMrp').textContent = `₹${product.mrp.toLocaleString('en-IN')}`;
  document.getElementById('pdDiscountTag').textContent = `${product.discount}% OFF`;

  // Star ratings
  const starsContainer = document.querySelector('#pdRating .stars');
  let starsHtml = '';
  const fullStars = Math.floor(product.rating);
  const halfStar = product.rating % 1 >= 0.5;
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) starsHtml += '<i class="fas fa-star"></i>';
    else if (i === fullStars && halfStar) starsHtml += '<i class="fas fa-star-half-alt"></i>';
    else starsHtml += '<i class="fas fa-star empty"></i>';
  }
  starsContainer.innerHTML = starsHtml;
  document.querySelector('#pdRating .rating-count').textContent = `${product.rating} (${product.reviews.toLocaleString('en-IN')} reviews)`;

  // Highlights
  const highlightsList = document.getElementById('pdHighlights');
  highlightsList.innerHTML = product.highlights.map(h => `<li>${h}</li>`).join('');

  // Delivery date (3-5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3 + Math.floor(Math.random() * 3));
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  document.getElementById('pdDeliveryDate').textContent = deliveryDate.toLocaleDateString('en-IN', options);

  // Thumbnails (show main image as a thumbnail)
  document.getElementById('pdThumbnails').innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="active" onclick="document.getElementById('pdImage').src=this.src">
  `;

  // Badge
  document.getElementById('pdBadge').textContent = product.category.toUpperCase();

  // Show overlay
  const overlay = document.getElementById('productDetailOverlay');
  const modal = overlay.querySelector('.product-detail-modal');
  modal.classList.remove('closing');
  overlay.classList.add('active');
  document.body.classList.add('pd-modal-open');
}

/** Close the product detail modal */
function closeProductDetail(event, force) {
  if (event && !force && event.target !== document.getElementById('productDetailOverlay')) return;

  const overlay = document.getElementById('productDetailOverlay');
  const modal = overlay.querySelector('.product-detail-modal');
  modal.classList.add('closing');

  setTimeout(() => {
    overlay.classList.remove('active');
    modal.classList.remove('closing');
    document.body.classList.remove('pd-modal-open');
    currentDetailProduct = null;
  }, 250);
}

/** Add current product to cart from detail modal */
function addToCartFromDetail() {
  if (!currentDetailProduct) return;

  // Use the existing addToCart function
  if (typeof window.addToCart === 'function') {
    window.addToCart();
  }

  showToast('success', `<i class="fas fa-check-circle"></i> ${currentDetailProduct.name} added to cart!`);
}

/** Buy now from detail modal */
function buyNowFromDetail() {
  if (!currentDetailProduct) return;

  // Add to cart
  if (typeof window.addToCart === 'function') {
    window.addToCart();
  }

  showToast('info', `<i class="fas fa-bolt"></i> Redirecting to checkout...`);

  // Close modal after brief delay, then redirect to cart
  setTimeout(() => {
    closeProductDetail(null, true);
    setTimeout(() => {
      window.location.href = 'cart.html';
    }, 300);
  }, 1200);
}

/** Show a toast notification */
function showToast(type, message) {
  // Remove any existing toast
  const existing = document.querySelector('.snapdeal-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `snapdeal-toast ${type}`;
  toast.innerHTML = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto-remove after 2.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

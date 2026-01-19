// ============================================
// NEXUSBUILD PRODUCTS - LUXURY EDITION
// Complete Integration with Admin Dashboard
// ============================================
// ============================================
// NEXUSBUILD PRODUCTS - LUXURY EDITION
// ============================================

// Wait for DOM AND database to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏗️ Products Page Loading...');
    
    // Wait for database to be fully loaded
    function initApp() {
        console.log('💎 Starting Luxury Products System...');
        
        // Now safely access the database
        const db = window.NexusDB;
        
        if (!db || db._isPlaceholder) {
            console.error('❌ Database not ready yet, retrying...');
            setTimeout(initApp, 500);
            return;
        }
        
        console.log('✅ Database connected successfully!');
        
        // ====================
        // STATE MANAGEMENT
        // ====================
        const state = {
            products: [],
            basket: [],
            filteredProducts: [],
            currentPage: 1,
            productsPerPage: 12,
            searchQuery: '',
            categoryFilter: 'all',
            sortFilter: 'name',
            isBasketExpanded: false,
            isCalculatorExpanded: true,
            isMobile: window.innerWidth < 768,
            selectedProduct: null,
            deliveryCost: 0
        };

        // ... rest of your existing code ...
        
          // ELEMENT REFERENCES
    // ====================
    const elements = {
        // Basket
        basketContainer: document.getElementById('basketContainer'),
        basketHeader: document.getElementById('basketHeader'),
        basketContent: document.getElementById('basketContent'),
        basketToggle: document.getElementById('basketToggle'),
        basketItems: document.getElementById('basketItems'),
        basketCount: document.getElementById('basketCount'),
        basketTotal: document.getElementById('basketTotal'),
        basketSubtitle: document.getElementById('basketSubtitle'),
        basketSubtotal: document.getElementById('basketSubtotal'),
        basketDelivery: document.getElementById('basketDelivery'),
        basketFinalTotal: document.getElementById('basketFinalTotal'),
        clearBasket: document.getElementById('clearBasket'),
        calculateTotal: document.getElementById('calculateTotal'),
        orderNow: document.getElementById('orderNow'),
        browseProducts: document.getElementById('browseProducts'),
        
        // Mini basket
        miniBasket: document.getElementById('miniBasket'),
        miniCount: document.getElementById('miniCount'),
        miniTotal: document.getElementById('miniTotal'),
        
        // Order modal
        orderModal: document.getElementById('orderModal'),
        closeOrderModal: document.getElementById('closeOrderModal'),
        orderDetails: document.getElementById('orderDetails'),
        customerName: document.getElementById('customerName'),
        customerPhone: document.getElementById('customerPhone'),
        customerLocation: document.getElementById('customerLocation'),
        sendWhatsapp: document.getElementById('sendWhatsapp'),
        callNow: document.getElementById('callNow'),
        sendSMS: document.getElementById('sendSMS'),
        printOrder: document.getElementById('printOrder'),
        
        // Navigation
        navToggle: document.getElementById('navToggle'),
        mobileMenu: document.getElementById('mobileMenu'),
        mobileClose: document.getElementById('mobileClose'),
        mobileBasketCount: document.getElementById('mobileBasketCount'),
        mobileBasketTotal: document.getElementById('mobileBasketTotal'),
        mobileOrder: document.getElementById('mobileOrder'),
        
        // Search & filters
        productSearch: document.getElementById('productSearch'),
        clearSearch: document.getElementById('clearSearch'),
        categoryFilter: document.getElementById('categoryFilter'),
        sortFilter: document.getElementById('sortFilter'),
        applyFilters: document.getElementById('applyFilters'),
        resetFilters: document.getElementById('resetFilters'),
        
        // Calculator
        calculatorWidget: document.getElementById('calculatorWidget'),
        calculatorToggle: document.getElementById('calculatorToggle'),
        calculatorBody: document.getElementById('calculatorBody'),
        calcProduct: document.getElementById('calcProduct'),
        calcQuantity: document.getElementById('calcQuantity'),
        calcMinus: document.getElementById('calcMinus'),
        calcPlus: document.getElementById('calcPlus'),
        calcUnit: document.getElementById('calcUnit'),
        calcDelivery: document.getElementById('calcDelivery'),
        calcProductCost: document.getElementById('calcProductCost'),
        calcDeliveryCost: document.getElementById('calcDeliveryCost'),
        calcTotalCost: document.getElementById('calcTotalCost'),
        addToBasketCalc: document.getElementById('addToBasketCalc'),
        clearCalculator: document.getElementById('clearCalculator'),
        
        // Products grid
        productsGrid: document.getElementById('productsGrid'),
        productsCount: document.getElementById('productsCount'),
        totalValue: document.getElementById('totalValue'),
        productsPagination: document.getElementById('productsPagination'),
        noProducts: document.getElementById('noProducts'),
        
        // Footer
        footerBasketCount: document.getElementById('footerBasketCount'),
        footerBasketTotal: document.getElementById('footerBasketTotal'),
        footerOrderBtn: document.getElementById('footerOrderBtn'),
        scrollTop: document.getElementById('scrollTop'),
        refreshProducts: document.getElementById('refreshProducts'),
        
        // Contact stats
        productsAvailable: document.getElementById('productsAvailable'),
        ordersToday: document.getElementById('ordersToday'),
        
        // WhatsApp
        whatsappBtn: document.getElementById('whatsappBtn'),
        adminBtn: document.getElementById('adminBtn')
    };

    // ====================
    // INITIALIZATION
    // ====================
    function init() {
        console.log('🚀 Initializing Luxury Products System...');
        
        // Load luxury particles
        loadLuxuryParticles();
        
        // Setup event listeners
        setupEventListeners();
        
        // Load products from database
        loadProducts();
        
        // Load basket from localStorage
        loadBasket();
        
        // Setup real-time sync with admin
        setupRealTimeSync();
        
        // Setup scroll animations
        setupScrollAnimations();
        
        console.log('✅ Luxury Products System Ready');
    }

    // ====================
    // LUXURY EFFECTS
    // ====================
    function loadLuxuryParticles() {
        const particleCount = 30;
        const luxuryBg = document.querySelector('.luxury-bg');
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: ${getRandomLuxuryColor()};
                border-radius: 50%;
                opacity: ${Math.random() * 0.3 + 0.1};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particle-float ${Math.random() * 10 + 10}s linear infinite;
                --x: ${Math.random() * 2 - 1};
                --y: ${Math.random() * 2 - 1};
            `;
            luxuryBg.appendChild(particle);
        }
    }

    function getRandomLuxuryColor() {
        const colors = [
            'var(--luxury-pink)',
            'var(--luxury-purple)',
            'var(--luxury-red)',
            'var(--luxury-green)',
            'var(--luxury-gold)',
            'var(--luxury-teal)',
            'var(--luxury-cyan)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // ====================
    // EVENT LISTENERS
    // ====================
    function setupEventListeners() {
        // Basket controls
        elements.basketToggle.addEventListener('click', toggleBasket);
        elements.basketHeader.addEventListener('click', toggleBasket);
        elements.clearBasket.addEventListener('click', clearBasket);
        elements.calculateTotal.addEventListener('click', calculateBasketTotal);
        elements.orderNow.addEventListener('click', openOrderModal);
        elements.browseProducts.addEventListener('click', () => {
            toggleBasket();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Mini basket
        elements.miniBasket.addEventListener('click', toggleBasket);
        
        // Order modal
        elements.closeOrderModal.addEventListener('click', closeOrderModal);
        elements.sendWhatsapp.addEventListener('click', sendWhatsappOrder);
        elements.callNow.addEventListener('click', callToOrder);
        elements.sendSMS.addEventListener('click', sendSMSOrder);
        elements.printOrder.addEventListener('click', printOrderSummary);
        
        // Mobile navigation
        elements.navToggle.addEventListener('click', toggleMobileMenu);
        elements.mobileClose.addEventListener('click', toggleMobileMenu);
        elements.mobileOrder.addEventListener('click', openOrderModal);
        
        // Search & filters
        elements.productSearch.addEventListener('input', handleSearch);
        elements.clearSearch.addEventListener('click', clearSearch);
        elements.categoryFilter.addEventListener('change', handleFilterChange);
        elements.sortFilter.addEventListener('change', handleFilterChange);
        elements.applyFilters.addEventListener('click', applyFilters);
        elements.resetFilters.addEventListener('click', resetFilters);
        
        // Calculator
        elements.calculatorToggle.addEventListener('click', toggleCalculator);
        elements.calcProduct.addEventListener('change', updateCalculator);
        elements.calcMinus.addEventListener('click', () => adjustQuantity(-1));
        elements.calcPlus.addEventListener('click', () => adjustQuantity(1));
        elements.calcQuantity.addEventListener('input', updateCalculator);
        elements.calcDelivery.addEventListener('change', updateCalculator);
        elements.addToBasketCalc.addEventListener('click', addFromCalculator);
        elements.clearCalculator.addEventListener('click', clearCalculator);
        
        // Footer
        elements.footerOrderBtn.addEventListener('click', openOrderModal);
        elements.scrollTop.addEventListener('click', scrollToTop);
        elements.refreshProducts.addEventListener('click', refreshProducts);
        
        // Window events
        window.addEventListener('resize', handleResize);
        window.addEventListener('nexusDataChange', handleDataChange);
        window.addEventListener('nexusExternalUpdate', handleExternalUpdate);
        
        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target === elements.orderModal) {
                closeOrderModal();
            }
        });
        
        // Close modals with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeOrderModal();
                closeMobileMenu();
            }
        });
    }

    // ====================
    // PRODUCTS MANAGEMENT
    // ====================
    function loadProducts() {
        console.log('📦 Loading products from database...');
        
        // Get all products from shared database
        state.products = db.getAllProducts();
        state.productsAvailable.textContent = state.products.length;
        
        // Filter out-of-stock products based on settings
        const settings = db.getSettings();
        if (!settings.showOutOfStock) {
            state.products = state.products.filter(p => p.status !== 'out-of-stock');
        }
        
        console.log(`✅ Loaded ${state.products.length} products`);
        
        // Apply initial filters
        applyFilters();
        
        // Populate calculator dropdown
        populateCalculatorDropdown();
    }

    function applyFilters() {
        let filtered = [...state.products];
        
        // Apply category filter
        if (state.categoryFilter !== 'all') {
            filtered = filtered.filter(p => p.category === state.categoryFilter);
        }
        
        // Apply search query
        if (state.searchQuery) {
            const query = state.searchQuery.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }
        
        // Apply sorting
        switch(state.sortFilter) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'stock':
                filtered.sort((a, b) => {
                    if (a.status === 'in-stock' && b.status !== 'in-stock') return -1;
                    if (a.status !== 'in-stock' && b.status === 'in-stock') return 1;
                    return b.stock - a.stock;
                });
                break;
            case 'name':
            default:
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        
        state.filteredProducts = filtered;
        
        // Update UI
        updateProductsCount();
        renderProductsGrid();
        updatePagination();
    }

    function renderProductsGrid() {
        const container = elements.productsGrid;
        const startIndex = (state.currentPage - 1) * state.productsPerPage;
        const endIndex = startIndex + state.productsPerPage;
        const productsToShow = state.filteredProducts.slice(startIndex, endIndex);
        
        if (productsToShow.length === 0) {
            elements.noProducts.style.display = 'block';
            container.innerHTML = '';
            return;
        }
        
        elements.noProducts.style.display = 'none';
        
        container.innerHTML = productsToShow.map((product, index) => `
            <div class="product-card ${product.status === 'out-of-stock' ? 'out-of-stock' : ''} staggered-item" data-product-id="${product.id}">
                <div class="product-header">
                    <div class="product-icon">
                        <i class="${product.icon || 'fas fa-cube'}"></i>
                    </div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-category">${product.category.toUpperCase()}</div>
                    </div>
                </div>
                
                <div class="product-body">
                    <p class="product-description">${product.description || 'Premium construction material'}</p>
                    
                    <div class="product-specs">
                        <div class="product-price">Ksh ${product.price.toLocaleString()}</div>
                        <div class="product-stock">
                            <div class="stock-indicator ${product.status}"></div>
                            <span>${product.stock} ${product.unit}</span>
                        </div>
                    </div>
                    
                    <div class="product-actions">
                        <button class="btn-add-to-basket" 
                                onclick="addToBasket('${product.id}')"
                                ${product.status === 'out-of-stock' ? 'disabled' : ''}>
                            <i class="fas fa-cart-plus"></i>
                            ${product.status === 'out-of-stock' ? 'Out of Stock' : 'Add to Basket'}
                        </button>
                        <button class="btn-quick-order" onclick="quickOrder('${product.id}')">
                            <i class="fas fa-bolt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Update total value
        const totalValue = state.filteredProducts.reduce((sum, p) => sum + (p.value || 0), 0);
        elements.totalValue.textContent = `Total Value: Ksh ${totalValue.toLocaleString()}`;
    }

    function updateProductsCount() {
        const count = state.filteredProducts.length;
        elements.productsCount.textContent = `${count} Product${count !== 1 ? 's' : ''}`;
    }

    function updatePagination() {
        const totalPages = Math.ceil(state.filteredProducts.length / state.productsPerPage);
        const container = elements.productsPagination;
        
        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button class="pagination-btn ${state.currentPage === 1 ? 'disabled' : ''}" 
                    onclick="goToPage(${state.currentPage - 1})" 
                    ${state.currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Page numbers
        const maxVisible = 5;
        let startPage = Math.max(1, state.currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="pagination-btn ${i === state.currentPage ? 'active' : ''}" 
                        onclick="goToPage(${i})">
                    ${i}
                </button>
            `;
        }
        
        // Next button
        paginationHTML += `
            <button class="pagination-btn ${state.currentPage === totalPages ? 'disabled' : ''}" 
                    onclick="goToPage(${state.currentPage + 1})" 
                    ${state.currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        container.innerHTML = paginationHTML;
    }

    // ====================
    // BASKET MANAGEMENT
    // ====================
    function loadBasket() {
        const savedBasket = localStorage.getItem('nexus_basket');
        if (savedBasket) {
            try {
                state.basket = JSON.parse(savedBasket);
                updateBasketUI();
            } catch (error) {
                console.error('Error loading basket:', error);
                state.basket = [];
            }
        }
    }

    function saveBasket() {
        localStorage.setItem('nexus_basket', JSON.stringify(state.basket));
        updateBasketUI();
    }

    function updateBasketUI() {
        const itemCount = state.basket.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = state.basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery = state.deliveryCost;
        const total = subtotal + delivery;
        
        // Update basket counts
        elements.basketCount.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
        elements.basketTotal.textContent = `Ksh ${total.toLocaleString()}`;
        elements.basketSubtitle.textContent = itemCount > 0 ? 
            `${itemCount} premium item${itemCount !== 1 ? 's' : ''} selected` : 
            'Add premium materials';
        
        // Update mini basket
        elements.miniCount.textContent = itemCount;
        elements.miniTotal.textContent = `Ksh ${total.toLocaleString()}`;
        
        // Update mobile basket
        elements.mobileBasketCount.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
        elements.mobileBasketTotal.textContent = `Ksh ${total.toLocaleString()}`;
        
        // Update footer
        elements.footerBasketCount.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
        elements.footerBasketTotal.textContent = `Ksh ${total.toLocaleString()}`;
        
        // Update basket items
        renderBasketItems();
        
        // Update summary
        elements.basketSubtotal.textContent = `Ksh ${subtotal.toLocaleString()}`;
        elements.basketDelivery.textContent = `Ksh ${delivery.toLocaleString()}`;
        elements.basketFinalTotal.textContent = `Ksh ${total.toLocaleString()}`;
    }

    function renderBasketItems() {
        const container = elements.basketItems;
        
        if (state.basket.length === 0) {
            container.innerHTML = `
                <div class="empty-basket">
                    <div class="empty-icon">
                        <i class="fas fa-gem"></i>
                    </div>
                    <h3>Your Luxury Basket is Empty</h3>
                    <p>Add premium construction materials to begin</p>
                    <button class="btn-browse" id="browseProducts">
                        <i class="fas fa-store"></i> Browse Products
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = state.basket.map(item => {
            const product = db.getProduct(item.productId);
            if (!product) return '';
            
            const itemTotal = item.price * item.quantity;
            
            return `
                <div class="basket-item" data-item-id="${item.id}">
                    <div class="basket-item-icon">
                        <i class="${product.icon || 'fas fa-cube'}"></i>
                    </div>
                    
                    <div class="basket-item-details">
                        <div class="basket-item-name">${product.name}</div>
                        <div class="basket-item-price">Ksh ${item.price.toLocaleString()} per ${product.unit}</div>
                    </div>
                    
                    <div class="basket-item-controls">
                        <div class="qty-control">
                            <button class="qty-btn minus" onclick="adjustBasketQuantity('${item.id}', -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn plus" onclick="adjustBasketQuantity('${item.id}', 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        
                        <div class="basket-item-total">
                            Ksh ${itemTotal.toLocaleString()}
                        </div>
                        
                        <button class="btn-remove" onclick="removeFromBasket('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Basket functions (global for onclick handlers)
    window.addToBasket = function(productId) {
        const product = db.getProduct(productId);
        if (!product || product.status === 'out-of-stock') return;
        
        // Check if already in basket
        const existingItem = state.basket.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.basket.push({
                id: 'basket_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                productId: productId,
                name: product.name,
                price: product.price,
                quantity: 1,
                unit: product.unit,
                icon: product.icon
            });
        }
        
        saveBasket();
        showNotification('Added to basket!', 'success');
        
        // Animate basket icon
        animateElement(elements.miniBasket, 'bounce-in');
    };

    window.quickOrder = function(productId) {
        const product = db.getProduct(productId);
        if (!product) return;
        
        // Clear basket and add single item
        state.basket = [{
            id: 'basket_' + Date.now(),
            productId: productId,
            name: product.name,
            price: product.price,
            quantity: 1,
            unit: product.unit,
            icon: product.icon
        }];
        
        saveBasket();
        openOrderModal();
        showNotification('Ready to order!', 'success');
    };

    window.adjustBasketQuantity = function(itemId, change) {
        const item = state.basket.find(i => i.id === itemId);
        if (!item) return;
        
        const newQuantity = item.quantity + change;
        
        if (newQuantity < 1) {
            removeFromBasket(itemId);
        } else {
            item.quantity = newQuantity;
            saveBasket();
            showNotification('Quantity updated', 'info');
        }
    };

    window.removeFromBasket = function(itemId) {
        state.basket = state.basket.filter(item => item.id !== itemId);
        saveBasket();
        showNotification('Removed from basket', 'info');
    };

    function clearBasket() {
        if (state.basket.length === 0) return;
        
        if (confirm('Clear all items from your basket?')) {
            state.basket = [];
            saveBasket();
            showNotification('Basket cleared', 'info');
        }
    }

    function calculateBasketTotal() {
        const subtotal = state.basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery = state.deliveryCost;
        const total = subtotal + delivery;
        
        showNotification(`Total: Ksh ${total.toLocaleString()} (Delivery: Ksh ${delivery.toLocaleString()})`, 'info');
        
        // Animate calculator
        animateElement(elements.calculateTotal, 'pulse');
    }

    // ====================
    // ORDER MANAGEMENT
    // ====================
    function openOrderModal() {
        if (state.basket.length === 0) {
            showNotification('Your basket is empty!', 'error');
            return;
        }
        
        elements.orderModal.style.display = 'flex';
        renderOrderDetails();
        
        // Load saved customer info
        const savedName = localStorage.getItem('nexus_customer_name');
        const savedPhone = localStorage.getItem('nexus_customer_phone');
        const savedLocation = localStorage.getItem('nexus_customer_location');
        
        if (savedName) elements.customerName.value = savedName;
        if (savedPhone) elements.customerPhone.value = savedPhone;
        if (savedLocation) elements.customerLocation.value = savedLocation;
    }

    function closeOrderModal() {
        elements.orderModal.style.display = 'none';
    }

    function renderOrderDetails() {
        const container = elements.orderDetails;
        const subtotal = state.basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery = state.deliveryCost;
        const total = subtotal + delivery;
        
        const orderHTML = `
            <div class="order-summary">
                <div class="order-items">
                    ${state.basket.map(item => {
                        const product = db.getProduct(item.productId);
                        const itemTotal = item.price * item.quantity;
                        return `
                            <div class="order-item">
                                <div class="order-item-name">
                                    <i class="${product?.icon || 'fas fa-cube'}"></i>
                                    ${product?.name || item.name}
                                </div>
                                <div class="order-item-qty">${item.quantity} ${product?.unit || 'unit'}</div>
                                <div class="order-item-price">Ksh ${itemTotal.toLocaleString()}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="order-totals">
                    <div class="order-total-row">
                        <span>Subtotal:</span>
                        <span>Ksh ${subtotal.toLocaleString()}</span>
                    </div>
                    <div class="order-total-row">
                        <span>Delivery:</span>
                        <span>Ksh ${delivery.toLocaleString()}</span>
                    </div>
                    <div class="order-total-row total">
                        <span>Total:</span>
                        <span>Ksh ${total.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = orderHTML;
    }

    function sendWhatsappOrder() {
        const name = elements.customerName.value.trim();
        const phone = elements.customerPhone.value.trim();
        const location = elements.customerLocation.value.trim();
        
        if (!name || !phone) {
            showNotification('Please enter your name and phone number', 'error');
            return;
        }
        
        // Save customer info
        localStorage.setItem('nexus_customer_name', name);
        localStorage.setItem('nexus_customer_phone', phone);
        localStorage.setItem('nexus_customer_location', location);
        
        // Format order message
        const subtotal = state.basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery = state.deliveryCost;
        const total = subtotal + delivery;
        
        let message = `*NEW ORDER - NEXUSBUILD LUXURY*\n\n`;
        message += `*Customer:* ${name}\n`;
        message += `*Phone:* ${phone}\n`;
        message += `*Location:* ${location || 'Not specified'}\n\n`;
        message += `*Order Details:*\n`;
        
        state.basket.forEach(item => {
            const product = db.getProduct(item.productId);
            message += `• ${item.quantity}x ${product?.name || item.name} - Ksh ${(item.price * item.quantity).toLocaleString()}\n`;
        });
        
        message += `\n*Subtotal:* Ksh ${subtotal.toLocaleString()}\n`;
        message += `*Delivery:* Ksh ${delivery.toLocaleString()}\n`;
        message += `*TOTAL:* Ksh ${total.toLocaleString()}\n\n`;
        message += `_Order generated from NexusBuild Luxury Website_`;
        
        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/254705455312?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Log order to database
        const order = {
            customerName: name,
            customerPhone: phone,
            customerLocation: location,
            items: state.basket,
            subtotal: subtotal,
            delivery: delivery,
            total: total,
            source: 'website'
        };
        
        db.logActivity('ORDER_CREATED', `New order from ${name} (Ksh ${total.toLocaleString()})`);
        
        // Show success message
        showNotification('Order sent via WhatsApp!', 'success');
        
        // Clear basket after successful order
        setTimeout(() => {
            state.basket = [];
            saveBasket();
            closeOrderModal();
        }, 2000);
    }

    function callToOrder() {
        const name = elements.customerName.value.trim();
        const phone = elements.customerPhone.value.trim();
        
        if (name) {
            localStorage.setItem('nexus_customer_name', name);
        }
        if (phone) {
            localStorage.setItem('nexus_customer_phone', phone);
        }
        
        // Simply open phone dialer
        window.location.href = 'tel:0705455312';
    }

    function sendSMSOrder() {
        const name = elements.customerName.value.trim();
        const phone = elements.customerPhone.value.trim();
        const location = elements.customerLocation.value.trim();
        
        if (!name || !phone) {
            showNotification('Please enter your name and phone number', 'error');
            return;
        }
        
        // Save customer info
        localStorage.setItem('nexus_customer_name', name);
        localStorage.setItem('nexus_customer_phone', phone);
        localStorage.setItem('nexus_customer_location', location);
        
        // Format SMS message
        const subtotal = state.basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery = state.deliveryCost;
        const total = subtotal + delivery;
        
        let message = `NEXUSBUILD ORDER\n\n`;
        message += `Customer: ${name}\n`;
        message += `Phone: ${phone}\n`;
        message += `Location: ${location || 'Not specified'}\n\n`;
        message += `Order Summary:\n`;
        
        state.basket.forEach(item => {
            const product = db.getProduct(item.productId);
            message += `${item.quantity}x ${product?.name || item.name}\n`;
        });
        
        message += `\nTotal: Ksh ${total.toLocaleString()}`;
        
        // Open SMS app
        const smsUrl = `sms:0705455312?body=${encodeURIComponent(message)}`;
        window.location.href = smsUrl;
        
        // Log order
        db.logActivity('SMS_ORDER', `SMS order from ${name}`);
    }

    function printOrderSummary() {
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>NexusBuild Order Summary</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #333; }
                    .order-details { margin: 20px 0; }
                    .order-item { display: flex; justify-content: space-between; margin: 5px 0; }
                    .total { font-weight: bold; font-size: 1.2em; margin-top: 20px; }
                </style>
            </head>
            <body>
                <h1>NexusBuild Luxury Order Summary</h1>
                ${elements.orderDetails.innerHTML}
            </body>
            </html>
        `;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    }

    // ====================
    // CALCULATOR
    // ====================
    function populateCalculatorDropdown() {
        const select = elements.calcProduct;
        select.innerHTML = '<option value="">Select a product</option>';
        
        state.products.forEach(product => {
            if (product.status !== 'out-of-stock') {
                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = `${product.name} - Ksh ${product.price.toLocaleString()}/${product.unit}`;
                option.dataset.price = product.price;
                option.dataset.unit = product.unit;
                select.appendChild(option);
            }
        });
    }

    function updateCalculator() {
        const productId = elements.calcProduct.value;
        const quantity = parseInt(elements.calcQuantity.value) || 1;
        const delivery = parseInt(elements.calcDelivery.value) || 0;
        
        if (productId) {
            const product = db.getProduct(productId);
            if (product) {
                const productCost = product.price * quantity;
                const totalCost = productCost + delivery;
                
                elements.calcProductCost.textContent = `Ksh ${productCost.toLocaleString()}`;
                elements.calcDeliveryCost.textContent = `Ksh ${delivery.toLocaleString()}`;
                elements.calcTotalCost.textContent = `Ksh ${totalCost.toLocaleString()}`;
                elements.calcUnit.textContent = product.unit;
                
                state.selectedProduct = product;
                state.deliveryCost = delivery;
            }
        } else {
            elements.calcProductCost.textContent = 'Ksh 0';
            elements.calcDeliveryCost.textContent = 'Ksh 0';
            elements.calcTotalCost.textContent = 'Ksh 0';
            state.selectedProduct = null;
        }
    }

    function adjustQuantity(change) {
        const current = parseInt(elements.calcQuantity.value) || 1;
        const newValue = Math.max(1, current + change);
        elements.calcQuantity.value = newValue;
        updateCalculator();
    }

    function addFromCalculator() {
        if (!state.selectedProduct) {
            showNotification('Please select a product first', 'error');
            return;
        }
        
        const quantity = parseInt(elements.calcQuantity.value) || 1;
        
        window.addToBasket(state.selectedProduct.id);
        
        // Animate calculator button
        animateElement(elements.addToBasketCalc, 'scale-up');
    }

    function clearCalculator() {
        elements.calcProduct.selectedIndex = 0;
        elements.calcQuantity.value = 1;
        elements.calcDelivery.selectedIndex = 0;
        updateCalculator();
        showNotification('Calculator cleared', 'info');
    }

    // ====================
    // UI CONTROLS
    // ====================
    function toggleBasket() {
        state.isBasketExpanded = !state.isBasketExpanded;
        elements.basketContainer.classList.toggle('expanded', state.isBasketExpanded);
        elements.basketToggle.querySelector('i').className = 
            state.isBasketExpanded ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
    }

    function toggleCalculator() {
        state.isCalculatorExpanded = !state.isCalculatorExpanded;
        elements.calculatorWidget.classList.toggle('expanded', state.isCalculatorExpanded);
        elements.calculatorBody.style.display = state.isCalculatorExpanded ? 'block' : 'none';
        elements.calculatorToggle.querySelector('i').className = 
            state.isCalculatorExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
    }

    function toggleMobileMenu() {
        elements.mobileMenu.classList.toggle('active');
    }

    function closeMobileMenu() {
        elements.mobileMenu.classList.remove('active');
    }

    function handleSearch(e) {
        state.searchQuery = e.target.value;
        state.currentPage = 1;
        
        // Show/hide clear button
        elements.clearSearch.style.opacity = state.searchQuery ? '1' : '0';
        elements.clearSearch.style.pointerEvents = state.searchQuery ? 'all' : 'none';
    }

    function clearSearch() {
        elements.productSearch.value = '';
        state.searchQuery = '';
        state.currentPage = 1;
        applyFilters();
        elements.clearSearch.style.opacity = '0';
        elements.clearSearch.style.pointerEvents = 'none';
    }

    function handleFilterChange() {
        state.categoryFilter = elements.categoryFilter.value;
        state.sortFilter = elements.sortFilter.value;
        state.currentPage = 1;
    }

    function resetFilters() {
        elements.productSearch.value = '';
        elements.categoryFilter.value = 'all';
        elements.sortFilter.value = 'name';
        
        state.searchQuery = '';
        state.categoryFilter = 'all';
        state.sortFilter = 'name';
        state.currentPage = 1;
        
        applyFilters();
        showNotification('Filters reset', 'info');
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function refreshProducts() {
        loadProducts();
        showNotification('Products refreshed', 'success');
        animateElement(elements.refreshProducts, 'spin');
    }

    function handleResize() {
        state.isMobile = window.innerWidth < 768;
        if (!state.isMobile) {
            closeMobileMenu();
        }
    }

    // ====================
    // REAL-TIME SYNC
    // ====================
    function setupRealTimeSync() {
        // Listen for data changes from admin
        window.addEventListener('storage', function(e) {
            if (e.key === db.STORAGE_KEY) {
                console.log('🔄 Products updated from admin');
                loadProducts();
                showNotification('Products updated from admin', 'info');
            }
        });
        
        // Listen for broadcast channel messages
        window.addEventListener('message', function(e) {
            if (e.data && e.data.type === 'nexus_update') {
                handleExternalUpdate(e.data);
            }
        });
        
        // Sync with admin every 30 seconds
        setInterval(() => {
            db.syncAcrossPages();
        }, 30000);
    }

    function handleDataChange(event) {
        console.log('📦 Data changed:', event.detail);
        loadProducts();
    }

    function handleExternalUpdate(update) {
        console.log('🔄 External update received:', update);
        
        if (update.dataType === 'products') {
            loadProducts();
            showNotification('Products updated from admin', 'info');
        }
    }

    // ====================
    // ANIMATIONS
    // ====================
    function setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    function animateElement(element, animation) {
        element.classList.add(animation);
        setTimeout(() => {
            element.classList.remove(animation);
        }, 1000);
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type} slide-in-right`;
        notification.innerHTML = `
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            backdrop-filter: blur(10px);
            font-family: 'Exo 2', sans-serif;
            max-width: 400px;
            background: ${type === 'success' ? 'rgba(100, 255, 218, 0.1)' : 
                         type === 'error' ? 'rgba(255, 107, 107, 0.1)' : 
                         'rgba(157, 78, 221, 0.1)'};
            border: 1px solid ${type === 'success' ? 'var(--luxury-teal)' : 
                               type === 'error' ? 'var(--luxury-red)' : 
                               'var(--luxury-purple)'};
            color: var(--luxury-silver);
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }

    // ====================
    // PAGINATION
    // ====================
    window.goToPage = function(page) {
        const totalPages = Math.ceil(state.filteredProducts.length / state.productsPerPage);
        if (page >= 1 && page <= totalPages) {
            state.currentPage = page;
            renderProductsGrid();
            updatePagination();
            
            // Scroll to products section
            document.querySelector('.products-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // ====================
    // INITIALIZE
    // ====================
    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            backdrop-filter: blur(10px);
            font-family: 'Exo 2', sans-serif;
            max-width: 400px;
        }
        
        .notification.success {
            background: rgba(100, 255, 218, 0.1);
            border: 1px solid var(--luxury-teal);
            color: var(--luxury-silver);
        }
        
        .notification.error {
            background: rgba(255, 107, 107, 0.1);
            border: 1px solid var(--luxury-red);
            color: var(--luxury-silver);
        }
        
        .notification.info {
            background: rgba(157, 78, 221, 0.1);
            border: 1px solid var(--luxury-purple);
            color: var(--luxury-silver);
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification.success i {
            color: var(--luxury-teal);
        }
        
        .notification.error i {
            color: var(--luxury-red);
        }
        
        .notification.info i {
            color: var(--luxury-purple);
        }
    `;
    document.head.appendChild(animationStyles);

    // Start the application
    init();

}
    
                         
                         
               
    // Start the initialization
    initApp();
});             



       

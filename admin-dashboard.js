// ============================================
// NEXUSBUILD ADMIN DASHBOARD - LUXURY EDITION
// Premium Admin Interface with Animations
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏢 NexusBuild Admin Dashboard - Luxury Edition');
    console.log('💎 Premium Features Loaded');
    
    // Initialize database
    const db = window.NexusDB;
    




    // State management
    const state = {
        currentSection: 'dashboard',
        editingProduct: null,
        currentPage: 1,
        productsPerPage: 10,
        filterCategory: 'all',
        filterStock: 'all',
        searchQuery: '',
        chartInstances: {},
        notifications: [],
        sessionTimer: null,
        sessionDuration: 30 * 60, // 30 minutes in seconds
        isMobile: window.innerWidth < 768
    };

    // ====================
    // ELEMENT REFERENCES
    // ====================
    const elements = {
        // Sidebar
        menuToggle: document.getElementById('menuToggle'),
        adminSidebar: document.querySelector('.admin-sidebar'),
        menuItems: document.querySelectorAll('.menu-item'),
        
        // Sections
        sections: {
            dashboard: document.getElementById('dashboardSection'),
            products: document.getElementById('productsSection'),
            inventory: document.getElementById('inventorySection'),
            orders: document.getElementById('ordersSection'),
            settings: document.getElementById('settingsSection')
        },
        
        // Page titles
        pageTitle: document.getElementById('pageTitle'),
        pageSubtitle: document.getElementById('pageSubtitle'),
        
        // Dashboard stats
        totalRevenue: document.getElementById('totalRevenue'),
        totalOrders: document.getElementById('totalOrders'),
        totalProducts: document.getElementById('totalProducts'),
        lowStockCount: document.getElementById('lowStockCount'),
        
        // Sidebar stats
        sidebarRevenue: document.getElementById('sidebarRevenue'),
        sidebarOrders: document.getElementById('sidebarOrders'),
        sidebarProducts: document.getElementById('sidebarProducts'),
        
        // Products management
        addProductForm: document.getElementById('addProductForm'),
        addProductBtn: document.getElementById('addProductBtn'),
        closeProductForm: document.getElementById('closeProductForm'),
        saveProductBtn: document.getElementById('saveProductBtn'),
        cancelProductBtn: document.getElementById('cancelProductBtn'),
        productsTableBody: document.getElementById('productsTableBody'),
        productsCount: document.getElementById('productsCount'),
        tableTotalValue: document.getElementById('tableTotalValue'),
        
        // Settings
        businessName: document.getElementById('businessName'),
        contactPhone: document.getElementById('contactPhone'),
        whatsappNumber: document.getElementById('whatsappNumber'),
        businessEmail: document.getElementById('businessEmail'),
        saveGeneralSettings: document.getElementById('saveGeneralSettings'),
        
        // Sync settings
        autoSync: document.getElementById('autoSync'),
        showOutOfStock: document.getElementById('showOutOfStock'),
        enableCategories: document.getElementById('enableCategories'),
        syncNow: document.getElementById('syncNow'),
        resetProducts: document.getElementById('resetProducts'),
        
        // Export/Import
        exportData: document.getElementById('exportData'),
        importData: document.getElementById('importData'),
        importFile: document.getElementById('importFile'),
        clearData: document.getElementById('clearData'),
        
        // Session
        sessionTimer: document.getElementById('sessionTimer'),
        extendSession: document.getElementById('extendSession'),
        logoutBtn: document.getElementById('logoutBtn'),
        logoutDropdown: document.getElementById('logoutDropdown'),
        
        // Notifications
        notificationsBtn: document.getElementById('notificationsBtn'),
        notificationsPanel: document.getElementById('notificationsPanel'),
        mobileNotification: document.getElementById('mobileNotification'),
        
        // Search and filters
        searchProducts: document.getElementById('searchProducts'),
        filterCategory: document.getElementById('filterCategory'),
        filterStock: document.getElementById('filterStock'),
        applyFilters: document.getElementById('applyFilters')
    };

    // ====================
    // LUXURY INITIALIZATION
    // ====================
    function init() {
        console.log('🚀 Initializing Luxury Dashboard...');
        
        // Load animations
        loadParticles();
        
        // Setup event listeners
        setupEventListeners();
        
        // Initialize charts
        initCharts();
        
        // Load initial data
        loadDashboardData();
        loadProductsData();
        loadSettings();
        
        // Setup session timer
        setupSessionTimer();
        
        // Setup real-time updates
        setupRealTimeUpdates();
        
        // Check for updates
        checkForUpdates();
        
        // Show welcome animation
        showWelcomeAnimation();
        
        console.log('✅ Luxury Dashboard Ready');
        console.log('✨ Features:');
        console.log('  • Real-time product sync');
        console.log('  • Luxury animations');
        console.log('  • Advanced analytics');
        console.log('  • Multi-tab support');
        console.log('  • Auto-save functionality');
    }

    // ====================
    // LUXURY ANIMATIONS
    // ====================
    function loadParticles() {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: ${i % 3 === 0 ? 'var(--luxury-gold)' : 
                              i % 3 === 1 ? 'var(--luxury-teal)' : 'var(--luxury-cyan)'};
                opacity: ${Math.random() * 0.3 + 0.1};
                animation-delay: ${Math.random() * 10}s;
                animation-duration: ${Math.random() * 10 + 10}s;
            `;
            document.body.appendChild(particle);
        }
    }

    function showWelcomeAnimation() {
        const welcome = document.createElement('div');
        welcome.className = 'welcome-animation';
        welcome.innerHTML = `
            <div class="welcome-content">
                <div class="welcome-logo">
                    <i class="fas fa-gem"></i>
                </div>
                <h1>WELCOME TO NEXUS ADMIN</h1>
                <p>Luxury Construction Management System</p>
            </div>
        `;
        
        document.body.appendChild(welcome);
        
        // Remove after animation
        setTimeout(() => {
            welcome.classList.add('fade-out');
            setTimeout(() => welcome.remove(), 1000);
        }, 2000);
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            .welcome-animation {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 10, 15, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeIn 0.5s ease;
            }
            
            .welcome-content {
                text-align: center;
                animation: bounceIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .welcome-logo {
                width: 100px;
                height: 100px;
                background: linear-gradient(135deg, var(--luxury-gold), var(--luxury-gold-light));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 2rem;
                font-size: 3rem;
                color: var(--luxury-black);
                animation: float 3s ease-in-out infinite;
            }
            
            .welcome-content h1 {
                font-family: 'Orbitron', sans-serif;
                font-size: 2.5rem;
                background: linear-gradient(135deg, var(--luxury-gold), var(--luxury-teal));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 1rem;
                letter-spacing: 3px;
            }
            
            .welcome-content p {
                color: var(--luxury-silver);
                font-size: 1.1rem;
                opacity: 0.8;
            }
            
            .fade-out {
                animation: fadeOut 0.5s ease forwards;
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    function animateElement(element, animation, duration = 1000) {
        element.classList.add(animation);
        setTimeout(() => {
            element.classList.remove(animation);
        }, duration);
    }

    // ====================
    // EVENT LISTENERS
    // ====================
    function setupEventListeners() {
        // Sidebar navigation
        elements.menuToggle.addEventListener('click', toggleSidebar);
        elements.menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                navigateToSection(section);
            });
        });

        // Products management
        elements.addProductBtn.addEventListener('click', showAddProductForm);
        elements.closeProductBtn.addEventListener('click', hideAddProductForm);
        elements.cancelProductBtn.addEventListener('click', hideAddProductForm);
        elements.saveProductBtn.addEventListener('click', saveProduct);
        
        // Search and filters
        elements.searchProducts.addEventListener('input', handleSearch);
        elements.filterCategory.addEventListener('change', handleFilterChange);
        elements.filterStock.addEventListener('change', handleFilterChange);
        elements.applyFilters.addEventListener('click', applyFilters);
        
        // Settings
        elements.saveGeneralSettings.addEventListener('click', saveGeneralSettings);
        elements.syncNow.addEventListener('click', syncNow);
        elements.resetProducts.addEventListener('click', resetProducts);
        elements.exportData.addEventListener('click', exportData);
        elements.importData.addEventListener('click', importData);
        elements.clearData.addEventListener('click', clearAllData);
        
        // Session management
        elements.extendSession.addEventListener('click', extendSession);
        elements.logoutBtn.addEventListener('click', logout);
        elements.logoutDropdown.addEventListener('click', logout);
        
        // Notifications
        elements.notificationsBtn.addEventListener('click', toggleNotifications);
        elements.mobileNotification.addEventListener('click', toggleNotifications);
        
        // Refresh data
        document.getElementById('refreshData').addEventListener('click', refreshAllData);
        
        // Quick actions
        document.querySelectorAll('.action-card').forEach(card => {
            card.addEventListener('click', handleQuickAction);
        });
        
        // Settings tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', handleTabClick);
        });
        
        // Window events
        window.addEventListener('resize', handleResize);
        window.addEventListener('nexusDataChange', handleDataChange);
        window.addEventListener('nexusExternalUpdate', handleExternalUpdate);
        
        // Add luxury hover effects
        addLuxuryHoverEffects();
    }

    // ====================
    // NAVIGATION
    // ====================
    function toggleSidebar() {
        elements.adminSidebar.classList.toggle('active');
        elements.menuToggle.innerHTML = elements.adminSidebar.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    }

    function navigateToSection(section) {
        // Update active menu item
        elements.menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === section) {
                item.classList.add('active');
            }
        });

        // Hide all sections
        Object.values(elements.sections).forEach(sec => {
            sec.classList.remove('active');
        });

        // Show selected section with animation
        const targetSection = elements.sections[section];
        if (targetSection) {
            targetSection.classList.add('active');
            state.currentSection = section;
            
            // Update page title
            updatePageTitle(section);
            
            // Load section data
            switch(section) {
                case 'dashboard':
                    loadDashboardData();
                    break;
                case 'products':
                    loadProductsData();
                    break;
                case 'inventory':
                    loadInventoryData();
                    break;
                case 'settings':
                    loadSettings();
                    break;
            }
            
            // Add entrance animation
            animateElement(targetSection, 'slide-in-bottom');
        }
    }

    function updatePageTitle(section) {
        const titles = {
            dashboard: 'DASHBOARD',
            products: 'PRODUCTS MANAGEMENT',
            inventory: 'INVENTORY MANAGEMENT',
            orders: 'ORDERS MANAGEMENT',
            settings: 'SYSTEM SETTINGS'
        };
        
        const subtitles = {
            dashboard: 'Real-time system overview',
            products: 'Manage construction materials',
            inventory: 'Stock levels and alerts',
            orders: 'Customer orders and processing',
            settings: 'Configure system preferences'
        };
        
        elements.pageTitle.textContent = titles[section] || 'DASHBOARD';
        elements.pageTitle.classList.add('text-shimmer');
        setTimeout(() => {
            elements.pageTitle.classList.remove('text-shimmer');
        }, 1000);
        
        elements.pageSubtitle.textContent = subtitles[section] || 'System overview';
    }

    // ====================
    // DASHBOARD FUNCTIONS
    // ====================
    function loadDashboardData() {
        const analytics = db.getAnalytics();
        
        // Update main stats
        animateNumber(elements.totalRevenue, analytics.revenue, 'Ksh ', true);
        animateNumber(elements.totalOrders, analytics.orders);
        animateNumber(elements.totalProducts, analytics.products);
        animateNumber(elements.lowStockCount, analytics.lowStock + analytics.criticalStock);
        
        // Update sidebar stats
        const today = new Date().toDateString();
        const todayData = analytics.chartData.find(d => d.date === today);
        elements.sidebarRevenue.textContent = `Ksh ${(todayData?.revenue || 0).toLocaleString()}`;
        elements.sidebarOrders.textContent = todayData?.orders || 0;
        elements.sidebarProducts.textContent = analytics.products;
        
        // Update charts
        updateRevenueChart(analytics.chartData);
        updateCategoryChart();
        
        // Load activities
        loadRecentActivities();
        
        // Load top products
        loadTopProducts();
    }

    function updateRevenueChart(data) {
        const ctx = document.getElementById('revenueChart').getContext('2d');
        
        if (state.chartInstances.revenue) {
            state.chartInstances.revenue.destroy();
        }
        
        const labels = data.map(d => {
            const date = new Date(d.date);
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        });
        
        const revenueData = data.map(d => d.revenue);
        const ordersData = data.map(d => d.orders * 1000); // Scale for visibility
        
        state.chartInstances.revenue = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Revenue (Ksh)',
                        data: revenueData,
                        borderColor: 'var(--luxury-gold)',
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Orders (scaled)',
                        data: ordersData,
                        borderColor: 'var(--luxury-teal)',
                        backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: 'var(--luxury-silver)',
                            font: {
                                family: "'Exo 2', sans-serif"
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(212, 175, 55, 0.1)'
                        },
                        ticks: {
                            color: 'var(--luxury-silver)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(212, 175, 55, 0.1)'
                        },
                        ticks: {
                            color: 'var(--luxury-silver)'
                        }
                    }
                }
            }
        });
    }

    function updateCategoryChart() {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        const categories = db.getCategories();
        
        if (state.chartInstances.category) {
            state.chartInstances.category.destroy();
        }
        
        const colors = [
            'rgba(212, 175, 55, 0.8)',
            'rgba(100, 255, 218, 0.8)',
            'rgba(87, 203, 255, 0.8)',
            'rgba(157, 78, 221, 0.8)',
            'rgba(255, 107, 157, 0.8)',
            'rgba(255, 167, 38, 0.8)',
            'rgba(76, 175, 80, 0.8)'
        ];
        
        state.chartInstances.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: categories.map(c => c.name.toUpperCase()),
                datasets: [{
                    data: categories.map(c => c.count),
                    backgroundColor: colors,
                    borderColor: colors.map(c => c.replace('0.8', '1')),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: 'var(--luxury-silver)',
                            font: {
                                family: "'Exo 2', sans-serif"
                            }
                        }
                    }
                }
            }
        });
    }

    function loadRecentActivities() {
        const activities = db.getRecentActivities(5);
        const container = document.getElementById('activityList');
        
        if (!container) return;
        
        container.innerHTML = activities.map(activity => `
            <div class="activity-item slide-in-left">
                <div class="activity-icon">
                    <i class="fas fa-${getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.message}</div>
                    <div class="activity-time">${formatTime(activity.timestamp)}</div>
                </div>
            </div>
        `).join('');
    }

    function loadTopProducts() {
        const products = db.getAllProducts()
            .sort((a, b) => (b.value || 0) - (a.value || 0))
            .slice(0, 5);
        
        const container = document.getElementById('topProductsList');
        
        if (!container) return;
        
        container.innerHTML = products.map((product, index) => `
            <div class="top-product slide-in-right">
                <div class="product-rank ${index < 3 ? 'glow-pulse' : ''}">
                    ${index + 1}
                </div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-stats">
                        <span class="product-sales">Stock: ${product.stock} ${product.unit}</span>
                        <span class="product-revenue">Value: Ksh ${(product.value || 0).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ====================
    // PRODUCTS MANAGEMENT
    // ====================
    function showAddProductForm() {
        elements.addProductForm.style.display = 'block';
        state.editingProduct = null;
        
        // Reset form
        document.getElementById('productName').value = '';
        document.getElementById('productCategory').value = '';
        document.getElementById('productDescription').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productStock').value = '';
        document.getElementById('productMinStock').value = '10';
        document.getElementById('productSupplier').value = '';
        document.getElementById('productUnit').value = 'bag';
        
        // Load icons
        loadProductIcons();
        
        // Animate form
        animateElement(elements.addProductForm, 'slide-in-top');
        
        // Scroll to form
        elements.addProductForm.scrollIntoView({ behavior: 'smooth' });
    }

    function hideAddProductForm() {
        animateElement(elements.addProductForm, 'slide-in-top');
        setTimeout(() => {
            elements.addProductForm.style.display = 'none';
        }, 500);
    }

    function loadProductIcons() {
        const icons = [
            'fas fa-cube', 'fas fa-box', 'fas fa-cubes', 'fas fa-home',
            'fas fa-layer-group', 'fas fa-grip-lines', 'fas fa-tint',
            'fas fa-bolt', 'fas fa-hammer', 'fas fa-paint-roller',
            'fas fa-ruler', 'fas fa-wrench', 'fas fa-screwdriver',
            'fas fa-toolbox', 'fas fa-tools', 'fas fa-weight-hanging'
        ];
        
        const container = document.getElementById('iconSelector');
        if (!container) return;
        
        container.innerHTML = icons.map(icon => `
            <div class="icon-option" data-icon="${icon}">
                <i class="${icon}"></i>
            </div>
        `).join('');
        
        // Add icon selection
        document.querySelectorAll('.icon-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.icon-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
            });
        });
    }

    function saveProduct() {
        // Get form values
        const productData = {
            name: document.getElementById('productName').value.trim(),
            category: document.getElementById('productCategory').value,
            description: document.getElementById('productDescription').value.trim(),
            price: parseFloat(document.getElementById('productPrice').value) || 0,
            stock: parseInt(document.getElementById('productStock').value) || 0,
            minStock: parseInt(document.getElementById('productMinStock').value) || 10,
            supplier: document.getElementById('productSupplier').value.trim(),
            unit: document.getElementById('productUnit').value,
            icon: document.querySelector('.icon-option.selected')?.getAttribute('data-icon') || 'fas fa-cube'
        };
        
        // Validate
        if (!productData.name || !productData.category || productData.price <= 0) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (state.editingProduct) {
            // Update existing product
            const updated = db.updateProduct(state.editingProduct.id, productData);
            if (updated) {
                showNotification('Product updated successfully!', 'success');
                hideAddProductForm();
                loadProductsData();
                
                // Animate updated row
                const row = document.querySelector(`[data-product-id="${state.editingProduct.id}"]`);
                if (row) animateElement(row, 'glow-pulse');
            }
        } else {
            // Add new product
            const product = db.addProduct(productData);
            if (product) {
                showNotification('Product added successfully!', 'success');
                hideAddProductForm();
                loadProductsData();
                
                // Show celebration animation
                showCelebration();
            }
        }
    }

    function loadProductsData() {
        let products = db.getAllProducts();
        
        // Apply filters
        if (state.filterCategory !== 'all') {
            products = products.filter(p => p.category === state.filterCategory);
        }
        
        if (state.filterStock !== 'all') {
            products = products.filter(p => p.status === state.filterStock);
        }
        
        // Apply search
        if (state.searchQuery) {
            const query = state.searchQuery.toLowerCase();
            products = products.filter(p => 
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }
        
        // Update summary
        updateProductsSummary(products);
        
        // Pagination
        const totalPages = Math.ceil(products.length / state.productsPerPage);
        const startIndex = (state.currentPage - 1) * state.productsPerPage;
        const paginatedProducts = products.slice(startIndex, startIndex + state.productsPerPage);
        
        // Render table
        renderProductsTable(paginatedProducts);
        
        // Update pagination
        updatePagination(totalPages);
        
        // Update counts
        elements.productsCount.textContent = `${products.length} products`;
        const totalValue = products.reduce((sum, p) => sum + (p.value || 0), 0);
        elements.tableTotalValue.textContent = `Ksh ${totalValue.toLocaleString()}`;
    }

    function updateProductsSummary(products) {
        const totalValue = products.reduce((sum, p) => sum + (p.value || 0), 0);
        const categories = [...new Set(products.map(p => p.category))];
        const lastUpdated = products.length > 0 
            ? new Date(products[0].updatedAt).toLocaleString()
            : 'Never';
        
        document.getElementById('totalProductsCount').textContent = products.length;
        document.getElementById('inventoryValue').textContent = `Ksh ${totalValue.toLocaleString()}`;
        document.getElementById('categoriesCount').textContent = categories.length;
        document.getElementById('lastUpdated').textContent = lastUpdated;
    }

    function renderProductsTable(products) {
        const container = elements.productsTableBody;
        if (!container) return;
        
        container.innerHTML = products.map(product => `
            <tr data-product-id="${product.id}" class="grid-item">
                <td class="product-icon-cell">
                    <div class="product-icon">
                        <i class="${product.icon || 'fas fa-cube'}"></i>
                    </div>
                </td>
                <td class="product-name-cell">${product.name}</td>
                <td class="product-category-cell">${product.category.toUpperCase()}</td>
                <td class="product-price-cell">Ksh ${product.price.toLocaleString()}</td>
                <td class="product-stock-cell ${product.stock <= product.minStock ? 'stock-low' : 'stock-ok'}">
                    ${product.stock} ${product.unit}
                </td>
                <td class="product-value-cell">Ksh ${(product.value || 0).toLocaleString()}</td>
                <td class="product-status-cell">
                    <span class="status-${product.status}">
                        ${product.status.replace('-', ' ').toUpperCase()}
                    </span>
                </td>
                <td class="product-actions-cell">
                    <button class="btn-action btn-edit" onclick="editProduct('${product.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action btn-delete" onclick="deleteProduct('${product.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn-action btn-restock" onclick="restockProduct('${product.id}')">
                        <i class="fas fa-plus"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    function editProduct(id) {
        const product = db.getProduct(id);
        if (!product) return;
        
        state.editingProduct = product;
        
        // Fill form with product data
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productMinStock').value = product.minStock;
        document.getElementById('productSupplier').value = product.supplier || '';
        document.getElementById('productUnit').value = product.unit;
        
        // Load and select icon
        loadProductIcons();
        setTimeout(() => {
            const iconOption = document.querySelector(`[data-icon="${product.icon}"]`);
            if (iconOption) iconOption.classList.add('selected');
        }, 100);
        
        // Show form
        elements.addProductForm.style.display = 'block';
        elements.addProductForm.scrollIntoView({ behavior: 'smooth' });
        
        showNotification(`Editing: ${product.name}`, 'info');
    }

    function deleteProduct(id) {
        if (!confirm('Are you sure you want to delete this product?')) return;
        
        const product = db.getProduct(id);
        if (!product) return;
        
        if (db.deleteProduct(id)) {
            showNotification('Product deleted successfully!', 'success');
            loadProductsData();
            
            // Show delete animation
            const deletedRow = document.querySelector(`[data-product-id="${id}"]`);
            if (deletedRow) {
                animateElement(deletedRow, 'fade-out');
                setTimeout(() => {
                    if (deletedRow.parentNode) {
                        deletedRow.parentNode.removeChild(deletedRow);
                    }
                }, 500);
            }
        }
    }

    function restockProduct(id) {
        const product = db.getProduct(id);
        if (!product) return;
        
        const quantity = prompt(`Restock ${product.name}\nCurrent stock: ${product.stock} ${product.unit}\nEnter quantity to add:`, '10');
        
        if (quantity && !isNaN(quantity) && parseInt(quantity) > 0) {
            const updated = db.restockProduct(id, parseInt(quantity));
            if (updated) {
                showNotification(`Restocked ${quantity} units of ${product.name}`, 'success');
                loadProductsData();
            }
        }
    }

    // ====================
    // INVENTORY MANAGEMENT
    // ====================
    function loadInventoryData() {
        const products = db.getAllProducts();
        const lowStock = products.filter(p => p.status === 'low-stock');
        const critical = products.filter(p => p.status === 'critical');
        const healthy = products.filter(p => p.status === 'in-stock');
        
        // Update counts
        document.getElementById('criticalCount').textContent = critical.length;
        document.getElementById('lowCount').textContent = lowStock.length;
        document.getElementById('healthyCount').textContent = healthy.length;
        
        // Load lists
        loadInventoryList('criticalList', critical);
        loadInventoryList('lowStockList', lowStock);
        loadInventoryList('healthyStockList', healthy);
        
        // Load table
        loadInventoryTable(products);
    }

    function loadInventoryList(elementId, products) {
        const container = document.getElementById(elementId);
        if (!container) return;
        
        container.innerHTML = products.map(product => `
            <div class="inventory-item">
                <div class="inventory-item-name">${product.name}</div>
                <div class="inventory-item-stock ${product.stock <= product.minStock ? 'text-danger' : ''}">
                    ${product.stock} ${product.unit}
                </div>
            </div>
        `).join('');
    }

    function loadInventoryTable(products) {
        const container = document.getElementById('inventoryTableBody');
        if (!container) return;
        
        container.innerHTML = products.map(product => `
            <tr class="${product.status}">
                <td>${product.name}</td>
                <td>${product.category.toUpperCase()}</td>
                <td>${product.stock} ${product.unit}</td>
                <td>${product.minStock} ${product.unit}</td>
                <td>${product.minStock * 2} ${product.unit}</td>
                <td>
                    <span class="status-${product.status}">
                        ${product.status.replace('-', ' ').toUpperCase()}
                    </span>
                </td>
                <td>${formatTime(product.updatedAt)}</td>
                <td>
                    <button class="btn-action btn-restock" onclick="restockProduct('${product.id}')">
                        <i class="fas fa-plus"></i> Restock
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // ====================
    // SETTINGS MANAGEMENT
    // ====================
    function loadSettings() {
        const settings = db.getSettings();
        
        // General settings
        elements.businessName.value = settings.businessName;
        elements.contactPhone.value = settings.contactPhone;
        elements.whatsappNumber.value = settings.whatsappNumber;
        elements.businessEmail.value = settings.businessEmail;
        
        // Sync settings
        elements.autoSync.checked = settings.autoSync;
        elements.showOutOfStock.checked = settings.showOutOfStock;
        elements.enableCategories.checked = settings.enableCategories;
    }

    function saveGeneralSettings() {
        const settings = {
            businessName: elements.businessName.value,
            contactPhone: elements.contactPhone.value,
            whatsappNumber: elements.whatsappNumber.value,
            businessEmail: elements.businessEmail.value
        };
        
        const updated = db.updateSettings(settings);
        if (updated) {
            showNotification('Settings saved successfully!', 'success');
            animateElement(elements.saveGeneralSettings, 'scale-up');
            
            // Sync with products.html
            db.syncAcrossPages();
        }
    }

    function syncNow() {
        if (db.syncAcrossPages()) {
            showNotification('Data synced successfully!', 'success');
            
            // Show sync animation
            const icon = elements.syncNow.querySelector('i');
            icon.classList.add('rotate-continuous-fast');
            setTimeout(() => {
                icon.classList.remove('rotate-continuous-fast');
            }, 1000);
        }
    }

    function resetProducts() {
        if (confirm('This will reset all products to default. Are you sure?')) {
            const defaultProducts = db.getDefaultData().products;
            db.data.products = defaultProducts;
            db.saveToStorage();
            db.broadcastChange('products', 'reset', defaultProducts);
            
            showNotification('Products reset to default!', 'success');
            loadProductsData();
        }
    }

    function exportData() {
        const data = db.exportData('json');
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `nexusbuild-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        showNotification('Data exported successfully!', 'success');
    }

    function importData() {
        const file = elements.importFile.files[0];
        if (!file) {
            showNotification('Please select a file to import', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const success = db.importData(e.target.result, 'json');
            if (success) {
                showNotification('Data imported successfully!', 'success');
                loadProductsData();
                loadDashboardData();
            } else {
                showNotification('Failed to import data', 'error');
            }
        };
        reader.readAsText(file);
    }

    function clearAllData() {
        if (db.clearAllData()) {
            showNotification('All data cleared!', 'success');
            loadProductsData();
            loadDashboardData();
        }
    }

    // ====================
    // SESSION MANAGEMENT
    // ====================
    function setupSessionTimer() {
        let timeLeft = state.sessionDuration;
        
        state.sessionTimer = setInterval(() => {
            timeLeft--;
            
            if (timeLeft <= 0) {
                logout();
                return;
            }
            
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            elements.sessionTimer.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Warning at 5 minutes
            if (timeLeft === 5 * 60) {
                showNotification('Session expires in 5 minutes', 'warning');
                elements.sessionTimer.classList.add('timer-warning');
            }
            
            // Critical at 1 minute
            if (timeLeft === 60) {
                elements.sessionTimer.classList.add('timer-critical');
            }
        }, 1000);
    }

    function extendSession() {
        state.sessionDuration = 30 * 60; // Reset to 30 minutes
        showNotification('Session extended by 30 minutes', 'success');
        elements.sessionTimer.classList.remove('timer-warning', 'timer-critical');
    }

    function logout() {
        if (confirm('Are you sure you want to logout?')) {
            clearInterval(state.sessionTimer);
            showNotification('Logging out...', 'info');
            
            // Show logout animation
            document.body.classList.add('logout-animation');
            
            setTimeout(() => {
                window.location.href = 'admin-login.html';
            }, 1000);
        }
    }

    // ====================
    // NOTIFICATIONS
    // ====================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type} slide-in-right`;
        notification.innerHTML = `
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('slide-out-right');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Add to notification panel
        addToNotificationPanel(message, type);
    }

    function addToNotificationPanel(message, type) {
        const notification = {
            id: Date.now(),
            title: type.charAt(0).toUpperCase() + type.slice(1),
            message: message,
            time: new Date().toLocaleTimeString(),
            type: type,
            read: false
        };
        
        state.notifications.unshift(notification);
        
        // Update badge
        const unreadCount = state.notifications.filter(n => !n.read).length;
        document.querySelectorAll('.notification-count, .notification-badge').forEach(badge => {
            badge.textContent = unreadCount;
            if (unreadCount > 0) {
                badge.classList.add('pulse');
            }
        });
        
        // Update panel if open
        updateNotificationsPanel();
    }

    function toggleNotifications() {
        elements.notificationsPanel.classList.toggle('active');
        
        if (elements.notificationsPanel.classList.contains('active')) {
            // Mark all as read
            state.notifications.forEach(n => n.read = true);
            updateNotificationsPanel();
            
            // Clear badges
            document.querySelectorAll('.notification-count, .notification-badge').forEach(badge => {
                badge.textContent = '0';
                badge.classList.remove('pulse');
            });
        }
    }

    function updateNotificationsPanel() {
        const container = document.getElementById('notificationsList');
        if (!container) return;
        
        container.innerHTML = state.notifications.map(notification => `
            <div class="notification-item ${notification.read ? '' : 'unread'}">
                <div class="notification-header">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-time">${notification.time}</div>
                </div>
                <div class="notification-message">${notification.message}</div>
            </div>
        `).join('');
    }

    // ====================
    // REAL-TIME UPDATES
    // ====================
    function setupRealTimeUpdates() {
        // Listen for data changes from other tabs
        window.addEventListener('storage', function(e) {
            if (e.key === db.STORAGE_KEY) {
                // Data changed in another tab, reload
                db.data = db.loadFromStorage();
                refreshCurrentSection();
            }
        });
        
        // Listen for broadcast channel messages
        window.addEventListener('message', function(e) {
            if (e.data && e.data.type === 'nexus_update') {
                handleExternalUpdate(e.data);
            }
        });
        
        // Setup periodic refresh
        setInterval(() => {
            if (state.currentSection === 'dashboard') {
                loadDashboardData();
            }
        }, 30000); // Every 30 seconds
    }

    function handleDataChange(event) {
        const { type, action } = event.detail;
        
        showNotification(`${type} ${action} successfully`, 'success');
        refreshCurrentSection();
    }

    function handleExternalUpdate(update) {
        console.log('External update received:', update);
        showNotification('Data updated from another tab', 'info');
        refreshCurrentSection();
    }

    function refreshCurrentSection() {
        switch(state.currentSection) {
            case 'dashboard':
                loadDashboardData();
                break;
            case 'products':
                loadProductsData();
                break;
            case 'inventory':
                loadInventoryData();
                break;
        }
    }

    function refreshAllData() {
        // Show refresh animation
        const refreshBtn = document.getElementById('refreshData');
        const icon = refreshBtn.querySelector('i');
        icon.classList.add('rotate-continuous-fast');
        
        // Refresh all sections
        loadDashboardData();
        loadProductsData();
        if (state.currentSection === 'inventory') {
            loadInventoryData();
        }
        
        showNotification('All data refreshed!', 'success');
        
        setTimeout(() => {
            icon.classList.remove('rotate-continuous-fast');
        }, 1000);
    }

    // ====================
    // SEARCH & FILTERS
    // ====================
    function handleSearch(e) {
        state.searchQuery = e.target.value;
        state.currentPage = 1;
        loadProductsData();
    }

    function handleFilterChange(e) {
        state.currentPage = 1;
        loadProductsData();
    }

    function applyFilters() {
        state.filterCategory = elements.filterCategory.value;
        state.filterStock = elements.filterStock.value;
        state.currentPage = 1;
        loadProductsData();
        
        // Animate filter button
        animateElement(elements.applyFilters, 'bounce-in');
    }

    // ====================
    // PAGINATION
    // ====================
    function updatePagination(totalPages) {
        const container = document.getElementById('productsPagination');
        if (!container) return;
        
        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button onclick="goToPage(${state.currentPage - 1})" 
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
                <button onclick="goToPage(${i})" 
                        class="${i === state.currentPage ? 'active' : ''}">
                    ${i}
                </button>
            `;
        }
        
        // Next button
        paginationHTML += `
            <button onclick="goToPage(${state.currentPage + 1})" 
                    ${state.currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        container.innerHTML = paginationHTML;
    }

    window.goToPage = function(page) {
        const totalPages = Math.ceil(db.getAllProducts().length / state.productsPerPage);
        if (page >= 1 && page <= totalPages) {
            state.currentPage = page;
            loadProductsData();
            
            // Scroll to top of table
            elements.productsTableBody.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // ====================
    // QUICK ACTIONS
    // ====================
    function handleQuickAction(e) {
        const action = e.currentTarget.getAttribute('data-action');
        
        switch(action) {
            case 'addProduct':
                showAddProductForm();
                break;
            case 'updatePrices':
                showUpdatePricesModal();
                break;
            case 'viewOrders':
                navigateToSection('orders');
                break;
            case 'generateQuote':
                generateQuote();
                break;
            case 'checkInventory':
                navigateToSection('inventory');
                break;
            case 'viewAnalytics':
                // Toggle analytics view
                const charts = document.querySelectorAll('.chart-container');
                charts.forEach(chart => chart.classList.toggle('expanded'));
                break;
        }
        
        // Add click animation
        animateElement(e.currentTarget, 'scale-up');
    }

    // ====================
    // SETTINGS TABS
    // ====================
    function handleTabClick(e) {
        const tab = e.currentTarget.getAttribute('data-tab');
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
        
        // Show tab content
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(`${tab}Tab`).classList.add('active');
        
        // Add animation
        animateElement(document.getElementById(`${tab}Tab`), 'fade-in');
    }

    // ====================
    // RESPONSIVE HANDLING
    // ====================
    function handleResize() {
        state.isMobile = window.innerWidth < 768;
        
        // Close sidebar on mobile when clicking outside
        if (state.isMobile && elements.adminSidebar.classList.contains('active')) {
            document.addEventListener('click', closeSidebarOnClickOutside);
        } else {
            document.removeEventListener('click', closeSidebarOnClickOutside);
        }
    }

    function closeSidebarOnClickOutside(e) {
        if (!elements.adminSidebar.contains(e.target) && 
            !elements.menuToggle.contains(e.target)) {
            toggleSidebar();
        }
    }

    // ====================
    // LUXURY EFFECTS
    // ====================
    function addLuxuryHoverEffects() {
        // Add hover effects to cards
        document.querySelectorAll('.stat-card, .action-card, .summary-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hover-lift');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hover-lift');
            });
        });
        
        // Add ripple effect to buttons
        document.querySelectorAll('.btn-primary, .btn-secondary, .btn-save').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                `;
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 1000);
            });
        });
    }

    function showCelebration() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration';
        celebration.innerHTML = `
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
        `;
        
        document.body.appendChild(celebration);
        
        setTimeout(() => celebration.remove(), 3000);
        
        // Add celebration styles
        if (!document.querySelector('#celebration-styles')) {
            const style = document.createElement('style');
            style.id = 'celebration-styles';
            style.textContent = `
                .celebration {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 10000;
                }
                
                .confetti {
                    position: absolute;
                    width: 10px;
                    height: 30px;
                    background: linear-gradient(45deg, var(--luxury-gold), var(--luxury-teal), var(--luxury-cyan));
                    top: -30px;
                    animation: fall linear forwards;
                }
                
                .confetti:nth-child(1) {
                    left: 10%;
                    animation-delay: 0s;
                    animation-duration: 2s;
                }
                
                .confetti:nth-child(2) {
                    left: 30%;
                    animation-delay: 0.5s;
                    animation-duration: 2.5s;
                }
                
                .confetti:nth-child(3) {
                    left: 50%;
                    animation-delay: 1s;
                    animation-duration: 2s;
                }
                
                .confetti:nth-child(4) {
                    left: 70%;
                    animation-delay: 1.5s;
                    animation-duration: 2.5s;
                }
                
                .confetti:nth-child(5) {
                    left: 90%;
                    animation-delay: 2s;
                    animation-duration: 2s;
                }
                
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ====================
    // UTILITY FUNCTIONS
    // ====================
    function animateNumber(element, target, prefix = '', isCurrency = false) {
        const current = parseInt(element.textContent.replace(/\D/g, '')) || 0;
        const increment = (target - current) / 30;
        let count = current;
        
        const timer = setInterval(() => {
            count += increment;
            if ((increment > 0 && count >= target) || (increment < 0 && count <= target)) {
                count = target;
                clearInterval(timer);
            }
            
            const displayValue = isCurrency 
                ? `${prefix}${Math.round(count).toLocaleString()}`
                : Math.round(count).toLocaleString();
                
            element.textContent = displayValue;
        }, 30);
    }

    function formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return date.toLocaleDateString();
    }

    function getActivityIcon(type) {
        const icons = {
            'PRODUCT_ADDED': 'plus-circle',
            'PRODUCT_UPDATED': 'edit',
            'PRODUCT_DELETED': 'trash',
            'PRODUCT_RESTOCKED': 'truck-loading',
            'ORDER_CREATED': 'shopping-cart',
            'ORDER_UPDATED': 'check-circle',
            'SETTINGS_UPDATED': 'cog',
            'DATA_IMPORTED': 'file-import',
            'DATA_CLEARED': 'exclamation-triangle'
        };
        
        return icons[type] || 'bell';
    }

    function getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        
        return icons[type] || 'bell';
    }

    function checkForUpdates() {
        // Check for data updates from products.html
        const lastSync = localStorage.getItem(db.SYNC_KEY);
        if (lastSync) {
            const syncData = JSON.parse(lastSync);
            if (syncData.timestamp > Date.now() - 30000) { // Within 30 seconds
                db.data = syncData.data;
                refreshCurrentSection();
            }
        }
    }

    function initCharts() {
        // Initialize empty charts that will be updated with data
        const revenueCtx = document.getElementById('revenueChart');
        const categoryCtx = document.getElementById('categoryChart');
        
        if (revenueCtx) {
            state.chartInstances.revenue = new Chart(revenueCtx, { type: 'line', data: { datasets: [] } });
        }
        
        if (categoryCtx) {
            state.chartInstances.category = new Chart(categoryCtx, { type: 'doughnut', data: { datasets: [] } });
        }
    }

    // ====================
    // GLOBAL FUNCTIONS
    // ====================
    // Make functions available globally for inline onclick handlers
    window.editProduct = editProduct;
    window.deleteProduct = deleteProduct;
    window.restockProduct = restockProduct;
    window.goToPage = goToPage;

    // ====================
    // INITIALIZE
    // ====================
    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .slide-in-left {
            animation: slideInLeft 0.5s ease forwards;
        }
        
        .slide-in-right {
            animation: slideInRight 0.5s ease forwards;
        }
        
        .slide-out-right {
            animation: slideInRight 0.5s ease reverse forwards;
        }
        
        .fade-out {
            animation: fadeOut 0.5s ease forwards;
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; transform: scale(0.9); }
        }
        
        .timer-warning {
            color: var(--luxury-gold) !important;
            animation: glow-pulse 1s infinite;
        }
        
        .timer-critical {
            color: var(--luxury-pink) !important;
            animation: glow-pulse 0.5s infinite;
        }
        
        .logout-animation {
            animation: fadeOut 1s ease forwards;
        }
        
        .pulse {
            animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(animationStyles);

    // Start the application
    init();
});



// DEBUG: Check if button exists
console.log('🔍 Looking for save button...');
const saveBtn = document.getElementById('saveProductBtn');
console.log('Save button found:', saveBtn);

if (saveBtn) {
    console.log('✅ Save button exists, adding click listener...');
    
    // Remove any existing listeners first
    const newSaveBtn = saveBtn.cloneNode(true);
    saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
    
    // Add direct event listener (most reliable)
    newSaveBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('💾 SAVE BUTTON CLICKED!');
        
        // Get form values
        const productData = {
            name: document.getElementById('productName')?.value?.trim() || '',
            category: document.getElementById('productCategory')?.value || '',
            description: document.getElementById('productDescription')?.value?.trim() || '',
            price: parseFloat(document.getElementById('productPrice')?.value) || 0,
            stock: parseInt(document.getElementById('productStock')?.value) || 0,
            minStock: parseInt(document.getElementById('productMinStock')?.value) || 10,
            supplier: document.getElementById('productSupplier')?.value?.trim() || '',
            unit: document.getElementById('productUnit')?.value || 'bag',
            icon: 'fas fa-cube' // Default icon
        };
        
        console.log('📝 Product data to save:', productData);
        
        // Simple validation
        if (!productData.name) {
            showNotification('Please enter product name', 'error');
            return;
        }
        
        if (!productData.category) {
            showNotification('Please select category', 'error');
            return;
        }
        
        if (productData.price <= 0) {
            showNotification('Please enter valid price', 'error');
            return;
        }
        
        // Show saving animation
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SAVING...';
        this.disabled = true;
        
        // Try to save using your database
        setTimeout(() => {
            try {
                // Check if database exists
                if (window.NexusDB) {
                    const result = window.NexusDB.addProduct(productData);
                    if (result) {
                        // Show success notification (no alert)
                        if (typeof showNotification === 'function') {
                            showNotification('✅ Product saved successfully!', 'success');
                        } else {
                            // Fallback notification
                            const notification = document.createElement('div');
                            notification.className = 'notification success';
                            notification.innerHTML = `
                                <i class="fas fa-check-circle"></i>
                                <span>Product saved successfully!</span>
                            `;
                            notification.style.cssText = `
                                position: fixed;
                                top: 20px;
                                right: 20px;
                                background: rgba(100, 255, 218, 0.1);
                                border: 1px solid var(--luxury-teal);
                                padding: 1rem 1.5rem;
                                border-radius: 8px;
                                display: flex;
                                align-items: center;
                                gap: 1rem;
                                z-index: 10000;
                                animation: slideInRight 0.3s ease-out;
                            `;
                            document.body.appendChild(notification);
                            setTimeout(() => notification.remove(), 3000);
                        }
                        
                        // Hide form with animation
                        const form = document.getElementById('addProductForm');
                        form.style.animation = 'slideOutTop 0.5s ease forwards';
                        setTimeout(() => {
                            form.style.display = 'none';
                            form.style.animation = '';
                        }, 500);
                        
                        // Refresh products table
                        if (typeof loadProductsData === 'function') {
                            loadProductsData();
                        }
                    } else {
                        showNotification('❌ Failed to save product', 'error');
                    }
                } else {
                    // Fallback: Save to localStorage
                    const products = JSON.parse(localStorage.getItem('nexus_products') || '[]');
                    productData.id = 'prod_' + Date.now();
                    productData.createdAt = new Date().toISOString();
                    products.push(productData);
                    localStorage.setItem('nexus_products', JSON.stringify(products));
                    
                    showNotification('✅ Product saved successfully!', 'success');
                    document.getElementById('addProductForm').style.display = 'none';
                    
                    if (typeof loadProductsData === 'function') {
                        loadProductsData();
                    }
                }
            } catch (error) {
                console.error('Save error:', error);
                showNotification('Error saving product: ' + error.message, 'error');
            } finally {
                // Reset button
                this.innerHTML = '<i class="fas fa-save"></i> SAVE PRODUCT';
                this.disabled = false;
            }
        }, 1000);
    });
} else {
    console.error('❌ Save button NOT FOUND! Check HTML ID');
}

// Add animation for notifications
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes slideOutTop {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100px);
            opacity: 0;
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
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
        color: var(--luxury-light);
    }
    
    .notification.error {
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid var(--luxury-pink);
        color: var(--luxury-light);
    }
    
    .notification i {
        font-size: 1.2rem;
    }
    
    .notification.success i {
        color: var(--luxury-teal);
    }
    
    .notification.error i {
        color: var(--luxury-pink);
    }
`;
document.head.appendChild(style);

// Helper function for notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
// ============================================
// NEXUSBUILD SHARED DATABASE - LUXURY EDITION
// Advanced Product & Data Management System
// ============================================

class NexusDatabase {
    constructor() {
        console.log('💎 Nexus Database Initialized - Luxury Edition');
        this.VERSION = '2.0.0';
        this.STORAGE_KEY = 'nexus_build_data';
        this.SYNC_KEY = 'nexus_last_sync';
        this.init();
    }

    init() {
        console.log('🚀 Loading Luxury Database System...');
        this.data = this.loadFromStorage();
        this.setupAutoSync();
        this.setupBroadcastChannel();
        this.initializeDefaultProducts();
        console.log('✅ Luxury Database Ready');
    }

    // ====================
    // LUXURY DATA STRUCTURE
    // ====================
    getDefaultData() {
        return {
            version: this.VERSION,
            lastUpdated: new Date().toISOString(),
            products: [],
            categories: [],
            orders: [],
            customers: [],
            settings: this.getDefaultSettings(),
            analytics: {
                totalRevenue: 0,
                totalOrders: 0,
                totalProducts: 0,
                monthlyData: [],
                dailyData: []
            },
            activities: []
        };
    }

    getDefaultSettings() {
        return {
            businessName: "NexusBuild Construction",
            contactPhone: "0705455312",
            whatsappNumber: "254705455312",
            businessEmail: "info@nexusbuild.co.ke",
            currency: "Ksh",
            autoSync: true,
            showOutOfStock: true,
            enableCategories: true,
            syncInterval: 30, // seconds
            theme: 'dark-luxury',
            notifications: {
                email: true,
                whatsapp: false,
                push: true
            }
        };
    }

    initializeDefaultProducts() {
        if (this.data.products.length === 0) {
            console.log('🛠️ Initializing luxury product catalog...');
            
            const defaultProducts = [
                {
                    id: this.generateId(),
                    name: "Bamburi Cement 50kg",
                    category: "cement",
                    description: "Premium quality cement for construction",
                    price: 850,
                    stock: 150,
                    minStock: 20,
                    unit: "bag",
                    icon: "fas fa-cube",
                    supplier: "Bamburi Cement Ltd",
                    status: "in-stock",
                    value: 127500,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    tags: ["cement", "premium", "construction"]
                },
                {
                    id: this.generateId(),
                    name: "Mabati Roofing Sheets",
                    category: "roofing",
                    description: "Durable galvanized iron sheets",
                    price: 1200,
                    stock: 80,
                    minStock: 10,
                    unit: "sheet",
                    icon: "fas fa-home",
                    supplier: "Mabati Rolling Mills",
                    status: "in-stock",
                    value: 96000,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    tags: ["roofing", "mabati", "galvanized"]
                },
                {
                    id: this.generateId(),
                    name: "Plywood 8x4",
                    category: "materials",
                    description: "Standard plywood sheets 8ft x 4ft",
                    price: 3500,
                    stock: 25,
                    minStock: 5,
                    unit: "sheet",
                    icon: "fas fa-layer-group",
                    supplier: "Timber Suppliers Ltd",
                    status: "low-stock",
                    value: 87500,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    tags: ["plywood", "timber", "construction"]
                },
                {
                    id: this.generateId(),
                    name: "Steel Bars 12mm",
                    category: "steel",
                    description: "High tensile steel reinforcement bars",
                    price: 15000,
                    stock: 8,
                    minStock: 5,
                    unit: "tonne",
                    icon: "fas fa-grip-lines",
                    supplier: "Steel Manufacturers",
                    status: "critical",
                    value: 120000,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    tags: ["steel", "rebars", "construction"]
                },
                {
                    id: this.generateId(),
                    name: "PVC Pipes 4-inch",
                    category: "plumbing",
                    description: "High quality PVC drainage pipes",
                    price: 2500,
                    stock: 40,
                    minStock: 10,
                    unit: "meter",
                    icon: "fas fa-tint",
                    supplier: "Plastic Manufacturers",
                    status: "in-stock",
                    value: 100000,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    tags: ["pvc", "pipes", "plumbing"]
                }
            ];

            this.data.products = defaultProducts;
            this.saveToStorage();
            console.log(`✅ Loaded ${defaultProducts.length} luxury products`);
        }
    }

    // ====================
    // CORE CRUD OPERATIONS
    // ====================
    
    // Products
    getAllProducts() {
        return this.data.products.sort((a, b) => 
            new Date(b.updatedAt) - new Date(a.updatedAt)
        );
    }

    getProduct(id) {
        return this.data.products.find(p => p.id === id);
    }

    addProduct(productData) {
        const product = {
            ...productData,
            id: this.generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: this.calculateStockStatus(productData.stock, productData.minStock),
            value: productData.price * productData.stock
        };

        this.data.products.unshift(product);
        this.saveToStorage();
        this.logActivity('PRODUCT_ADDED', `Added product: ${product.name}`);
        this.broadcastChange('products', 'add', product);
        
        return product;
    }

    updateProduct(id, updates) {
        const index = this.data.products.findIndex(p => p.id === id);
        if (index === -1) return null;

        const updatedProduct = {
            ...this.data.products[index],
            ...updates,
            updatedAt: new Date().toISOString(),
            status: this.calculateStockStatus(
                updates.stock || this.data.products[index].stock,
                updates.minStock || this.data.products[index].minStock
            ),
            value: (updates.price || this.data.products[index].price) * 
                   (updates.stock || this.data.products[index].stock)
        };

        this.data.products[index] = updatedProduct;
        this.saveToStorage();
        this.logActivity('PRODUCT_UPDATED', `Updated product: ${updatedProduct.name}`);
        this.broadcastChange('products', 'update', updatedProduct);
        
        return updatedProduct;
    }

    deleteProduct(id) {
        const index = this.data.products.findIndex(p => p.id === id);
        if (index === -1) return false;

        const deletedProduct = this.data.products[index];
        this.data.products.splice(index, 1);
        this.saveToStorage();
        this.logActivity('PRODUCT_DELETED', `Deleted product: ${deletedProduct.name}`);
        this.broadcastChange('products', 'delete', deletedProduct);
        
        return true;
    }

    // Categories
    getCategories() {
        const categories = {};
        this.data.products.forEach(product => {
            if (!categories[product.category]) {
                categories[product.category] = {
                    name: product.category,
                    count: 0,
                    totalValue: 0
                };
            }
            categories[product.category].count++;
            categories[product.category].totalValue += product.value || 0;
        });
        
        return Object.values(categories);
    }

    // Orders
    getAllOrders() {
        return this.data.orders;
    }

    addOrder(orderData) {
        const order = {
            ...orderData,
            id: this.generateId(),
            orderNumber: this.generateOrderNumber(),
            createdAt: new Date().toISOString(),
            status: 'pending'
        };

        this.data.orders.unshift(order);
        this.saveToStorage();
        this.updateAnalytics(order);
        this.logActivity('ORDER_CREATED', `New order #${order.orderNumber}`);
        
        return order;
    }

    updateOrderStatus(id, status) {
        const order = this.data.orders.find(o => o.id === id);
        if (!order) return null;

        order.status = status;
        order.updatedAt = new Date().toISOString();
        this.saveToStorage();
        this.logActivity('ORDER_UPDATED', `Order #${order.orderNumber} updated to ${status}`);
        
        return order;
    }

    // Analytics
    updateAnalytics(order) {
        const today = new Date().toDateString();
        const dayData = this.data.analytics.dailyData.find(d => d.date === today);
        
        if (dayData) {
            dayData.revenue += order.total;
            dayData.orders += 1;
        } else {
            this.data.analytics.dailyData.push({
                date: today,
                revenue: order.total,
                orders: 1
            });
        }

        this.data.analytics.totalRevenue += order.total;
        this.data.analytics.totalOrders += 1;
        this.data.analytics.totalProducts = this.data.products.length;
        
        this.saveToStorage();
    }

    getAnalytics(period = 'month') {
        const now = new Date();
        const data = {
            revenue: this.data.analytics.totalRevenue,
            orders: this.data.analytics.totalOrders,
            products: this.data.analytics.totalProducts,
            lowStock: this.data.products.filter(p => p.status === 'low-stock').length,
            criticalStock: this.data.products.filter(p => p.status === 'critical').length,
            chartData: this.getChartData(period)
        };

        return data;
    }

    getChartData(period) {
        const data = [];
        const days = period === 'week' ? 7 : period === 'month' ? 30 : 365;
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();
            
            const dayData = this.data.analytics.dailyData.find(d => d.date === dateStr);
            data.push({
                date: dateStr,
                revenue: dayData?.revenue || 0,
                orders: dayData?.orders || 0
            });
        }
        
        return data;
    }

    // ====================
    // STOCK MANAGEMENT
    // ====================
    calculateStockStatus(stock, minStock) {
        if (stock <= 0) return 'out-of-stock';
        if (stock <= minStock) return 'low-stock';
        if (stock <= minStock * 2) return 'critical';
        return 'in-stock';
    }

    getLowStockProducts() {
        return this.data.products.filter(p => 
            p.status === 'low-stock' || p.status === 'critical'
        );
    }

    restockProduct(id, quantity) {
        const product = this.getProduct(id);
        if (!product) return null;

        product.stock += quantity;
        product.updatedAt = new Date().toISOString();
        product.status = this.calculateStockStatus(product.stock, product.minStock);
        product.value = product.price * product.stock;
        
        this.saveToStorage();
        this.logActivity('PRODUCT_RESTOCKED', `Restocked ${quantity} units of ${product.name}`);
        
        return product;
    }

    // ====================
    // SETTINGS MANAGEMENT
    // ====================
    getSettings() {
        return this.data.settings;
    }

    updateSettings(newSettings) {
        this.data.settings = {
            ...this.data.settings,
            ...newSettings,
            updatedAt: new Date().toISOString()
        };
        
        this.saveToStorage();
        this.logActivity('SETTINGS_UPDATED', 'System settings updated');
        this.broadcastChange('settings', 'update', this.data.settings);
        
        return this.data.settings;
    }

    // ====================
    // ACTIVITY LOGGING
    // ====================
    logActivity(type, message) {
        const activity = {
            id: this.generateId(),
            type,
            message,
            timestamp: new Date().toISOString(),
            user: 'admin'
        };

        this.data.activities.unshift(activity);
        
        // Keep only last 100 activities
        if (this.data.activities.length > 100) {
            this.data.activities = this.data.activities.slice(0, 100);
        }
        
        this.saveToStorage();
        return activity;
    }

    getRecentActivities(limit = 10) {
        return this.data.activities.slice(0, limit);
    }

    // ====================
    // DATA IMPORT/EXPORT
    // ====================
    exportData(format = 'json') {
        const exportData = {
            ...this.data,
            exportDate: new Date().toISOString(),
            exportFormat: format
        };

        if (format === 'json') {
            return JSON.stringify(exportData, null, 2);
        } else if (format === 'csv') {
            return this.convertToCSV(exportData.products);
        }
        
        return null;
    }

    importData(data, type = 'json') {
        try {
            let importedData;
            
            if (type === 'json') {
                importedData = JSON.parse(data);
            } else if (type === 'csv') {
                importedData = this.parseCSV(data);
            }

            // Validate imported data
            if (!this.validateImportData(importedData)) {
                throw new Error('Invalid data format');
            }

            // Merge with existing data
            if (importedData.products) {
                this.data.products = [
                    ...this.data.products.filter(p => 
                        !importedData.products.some(ip => ip.id === p.id)
                    ),
                    ...importedData.products.map(p => ({
                        ...p,
                        id: p.id || this.generateId(),
                        updatedAt: new Date().toISOString()
                    }))
                ];
            }

            this.saveToStorage();
            this.logActivity('DATA_IMPORTED', 'Data imported successfully');
            this.broadcastChange('all', 'import', importedData);
            
            return true;
        } catch (error) {
            console.error('Import failed:', error);
            return false;
        }
    }

    clearAllData() {
        if (!confirm('Are you sure? This will delete ALL data including products, orders, and settings.')) {
            return false;
        }

        this.data = this.getDefaultData();
        this.saveToStorage();
        this.logActivity('DATA_CLEARED', 'All data cleared');
        this.broadcastChange('all', 'clear', null);
        
        return true;
    }

    // ====================
    // SYNC FUNCTIONALITY
    // ====================
    setupAutoSync() {
        if (this.data.settings.autoSync) {
            setInterval(() => {
                this.syncAcrossPages();
            }, this.data.settings.syncInterval * 1000);
        }
    }

    syncAcrossPages() {
        try {
            // Save current timestamp
            const syncData = {
                timestamp: Date.now(),
                data: this.data
            };
            
            localStorage.setItem(this.SYNC_KEY, JSON.stringify(syncData));
            
            // Trigger custom event for other tabs
            window.dispatchEvent(new CustomEvent('nexusDataSync', {
                detail: syncData
            }));
            
            console.log('🔄 Data synced across pages');
            return true;
        } catch (error) {
            console.error('Sync failed:', error);
            return false;
        }
    }

    setupBroadcastChannel() {
        if (typeof BroadcastChannel !== 'undefined') {
            this.broadcastChannel = new BroadcastChannel('nexus_data_channel');
            
            this.broadcastChannel.onmessage = (event) => {
                if (event.data.type === 'data_update') {
                    this.handleExternalUpdate(event.data);
                }
            };
        }
    }

    broadcastChange(type, action, data) {
        // Save to storage
        this.saveToStorage();
        
        // Sync across tabs
        this.syncAcrossPages();
        
        // Broadcast to other contexts
        if (this.broadcastChannel) {
            this.broadcastChannel.postMessage({
                type: 'data_update',
                timestamp: Date.now(),
                dataType: type,
                action: action,
                data: data
            });
        }
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('nexusDataChange', {
            detail: { type, action, data }
        }));
    }

    handleExternalUpdate(update) {
        console.log('🔄 Received external update:', update);
        
        // Reload data from storage to get latest
        this.data = this.loadFromStorage();
        
        // Trigger UI update
        window.dispatchEvent(new CustomEvent('nexusExternalUpdate', {
            detail: update
        }));
    }

    // ====================
    // UTILITY FUNCTIONS
    // ====================
    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateOrderNumber() {
        const prefix = 'NX';
        const date = new Date();
        const year = date.getFullYear().toString().substr(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const seq = (this.data.orders.length + 1).toString().padStart(4, '0');
        
        return `${prefix}${year}${month}${seq}`;
    }

    loadFromStorage() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Merge with default structure for backward compatibility
                return {
                    ...this.getDefaultData(),
                    ...parsed,
                    version: this.VERSION
                };
            }
        } catch (error) {
            console.error('Error loading from storage:', error);
        }
        
        return this.getDefaultData();
    }

    saveToStorage() {
        try {
            this.data.lastUpdated = new Date().toISOString();
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
            return true;
        } catch (error) {
            console.error('Error saving to storage:', error);
            return false;
        }
    }

    validateImportData(data) {
        return data && (
            Array.isArray(data.products) ||
            data.settings ||
            data.analytics
        );
    }

    convertToCSV(products) {
        if (!products || products.length === 0) return '';
        
        const headers = ['Name', 'Category', 'Price', 'Stock', 'Unit', 'Status'];
        const rows = products.map(p => [
            p.name,
            p.category,
            p.price,
            p.stock,
            p.unit,
            p.status
        ]);
        
        return [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        
        const products = lines.slice(1).map(line => {
            const values = line.split(',');
            const product = {};
            
            headers.forEach((header, index) => {
                product[header.toLowerCase()] = values[index] || '';
            });
            
            return {
                name: product.name,
                category: product.category,
                price: parseFloat(product.price) || 0,
                stock: parseInt(product.stock) || 0,
                unit: product.unit,
                status: product.status || 'in-stock'
            };
        }).filter(p => p.name);
        
        return { products };
    }

    // ====================
    // STATIC METHODS
    // ====================
    static getInstance() {
        if (!NexusDatabase.instance) {
            NexusDatabase.instance = new NexusDatabase();
        }
        return NexusDatabase.instance;
    }
}

// Create global instance
window.NexusDB = NexusDatabase.getInstance();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NexusDatabase;
}
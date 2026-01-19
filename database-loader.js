// database-loader.js
// This ensures the database is always available

(function() {
    console.log('🔄 Loading Nexus Database...');
    
    // Check if database already exists
    if (!window.NexusDB) {
        // Create a placeholder that will be replaced when the real DB loads
        window.NexusDB = {
            _isPlaceholder: true,
            _callbacks: [],
            
            // Temporary methods that queue calls until real DB loads
            getAllProducts: function() {
                console.warn('⚠️ Database not loaded yet, returning empty array');
                return [];
            },
            
            getProduct: function(id) {
                return null;
            },
            
            getSettings: function() {
                return {
                    showOutOfStock: true,
                    businessName: "NexusBuild Construction",
                    contactPhone: "0705455312",
                    whatsappNumber: "254705455312",
                    businessEmail: "info@nexusbuild.co.ke",
                    currency: "Ksh"
                };
            },
            
            logActivity: function(type, message) {
                console.log(`📝 [Queued]: ${type} - ${message}`);
            },
            
            syncAcrossPages: function() {
                // Do nothing for placeholder
            },
            
            // Wait for real DB to load
            onReady: function(callback) {
                if (!this._isPlaceholder) {
                    callback(this);
                } else {
                    this._callbacks.push(callback);
                }
            }
        };
        
        console.log('⏳ Database placeholder created');
    }
    
    // Listen for when the real database loads
    window.addEventListener('nexusDatabaseReady', function() {
        console.log('✅ Real database is now available!');
    });
})();

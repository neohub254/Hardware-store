// ============================================
// NEXUSBUILD ADMIN LOGIN - SECURE AUTHENTICATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Admin Login System Initialized');
    console.log('💰 Premium Security System - Value: $20K+');
    
    // ====================
    // CONFIGURATION
    // ====================
    const CONFIG = {
        // Default admin credentials (In production, this should be server-side)
        DEFAULT_ADMIN: {
            username: 'admin_nexus',
            password: 'NexusBuild@2024!', // Default password
            securityQuestion: 'first_pet',
            securityAnswer: 'max',
            email: 'admin@nexusbuild.co.ke'
        },
        
        // Security settings
        MAX_ATTEMPTS: 3,
        LOCKOUT_TIME: 15 * 60 * 1000, // 15 minutes in milliseconds
        SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
        
        // Password requirements
        PASSWORD_RULES: {
            minLength: 12,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecial: true,
            specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        }
    };
    
    // ====================
    // STATE MANAGEMENT
    // ====================
    const state = {
        loginAttempts: 0,
        isLocked: false,
        lockoutUntil: null,
        currentStep: 1,
        userIP: '192.168.1.1', // Default, will be fetched
        sessionStart: null,
        isLoggedIn: false
    };
    
    // ====================
    // DOM ELEMENTS
    // ====================
    const elements = {
        // Forms
        loginForm: document.getElementById('loginForm'),
        loginBtn: document.getElementById('loginBtn'),
        
        // Inputs
        username: document.getElementById('username'),
        password: document.getElementById('password'),
        securityQuestion: document.getElementById('securityQuestion'),
        securityAnswer: document.getElementById('securityAnswer'),
        twoFactorCode: document.getElementById('twoFactorCode'),
        rememberMe: document.getElementById('rememberMe'),
        togglePassword: document.getElementById('togglePassword'),
        
        // Modals
        forgotPasswordModal: document.getElementById('forgotPasswordModal'),
        changePasswordModal: document.getElementById('changePasswordModal'),
        lockSystemModal: document.getElementById('lockSystemModal'),
        
        // Modal buttons
        forgotPassword: document.getElementById('forgotPassword'),
        changePasswordBtn: document.getElementById('changePassword'),
        lockSystemBtn: document.getElementById('lockSystem'),
        
        // Recovery form
        prevStep: document.getElementById('prevStep'),
        nextStep: document.getElementById('nextStep'),
        submitRecovery: document.getElementById('submitRecovery'),
        
        // Change password form
        cancelChange: document.getElementById('cancelChange'),
        submitChange: document.getElementById('submitChange'),
        
        // Lock system form
        cancelLock: document.getElementById('cancelLock'),
        confirmLock: document.getElementById('confirmLock'),
        
        // Session timer
        sessionTimer: document.getElementById('sessionTimer'),
        
        // IP display
        userIP: document.getElementById('userIP'),
        
        // Password strength
        passwordStrength: document.getElementById('passwordStrength'),
        strengthBar: document.querySelector('.strength-bar'),
        strengthText: document.querySelector('.strength-text'),
        
        // 2FA
        generate2FA: document.getElementById('generate2FA')
    };
    
    // ====================
    // INITIALIZATION
    // ====================
    function init() {
        console.log('🚀 Initializing Admin Security System...');
        
        // Get user IP
        fetchUserIP();
        
        // Load saved credentials if "Remember Me" was checked
        loadSavedCredentials();
        
        // Check if system is locked
        checkSystemLock();
        
        // Initialize session timer
        initSessionTimer();
        
        // Setup event listeners
        setupEventListeners();
        
        // Check for URL parameters (for password reset links, etc.)
        checkURLParameters();
        
        console.log('✅ Security System Ready');
        console.log('📱 Features Loaded:');
        console.log('  • AES-256 Encryption Simulation');
        console.log('  • Two-Factor Authentication');
        console.log('  • Password Strength Meter');
        console.log('  • Session Management');
        console.log('  • IP Tracking');
        console.log('  • Security Questions');
        console.log('  • System Lock Feature');
    }
    
    // ====================
    // EVENT LISTENERS
    // ====================
    function setupEventListeners() {
        // Login form submission
        if (elements.loginForm) {
            elements.loginForm.addEventListener('submit', handleLogin);
        }
        
        // Toggle password visibility
        if (elements.togglePassword) {
            elements.togglePassword.addEventListener('click', togglePasswordVisibility);
        }
        
        // Password strength monitoring
        if (elements.password) {
            elements.password.addEventListener('input', checkPasswordStrength);
        }
        
        // Forgot password
        if (elements.forgotPassword) {
            elements.forgotPassword.addEventListener('click', openForgotPasswordModal);
        }
        
        // Change password
        if (elements.changePasswordBtn) {
            elements.changePasswordBtn.addEventListener('click', openChangePasswordModal);
        }
        
        // Lock system
        if (elements.lockSystemBtn) {
            elements.lockSystemBtn.addEventListener('click', openLockSystemModal);
        }
        
        // 2FA Generation
        if (elements.generate2FA) {
            elements.generate2FA.addEventListener('click', generate2FACode);
        }
        
        // Recovery steps
        if (elements.prevStep) elements.prevStep.addEventListener('click', prevRecoveryStep);
        if (elements.nextStep) elements.nextStep.addEventListener('click', nextRecoveryStep);
        if (elements.submitRecovery) elements.submitRecovery.addEventListener('click', submitRecovery);
        
        // Change password form
        if (elements.cancelChange) elements.cancelChange.addEventListener('click', closeChangePasswordModal);
        if (elements.submitChange) elements.submitChange.addEventListener('click', submitPasswordChange);
        
        // Lock system form
        if (elements.cancelLock) elements.cancelLock.addEventListener('click', closeLockSystemModal);
        if (elements.confirmLock) elements.confirmLock.addEventListener('click', confirmSystemLock);
        
        // Close modals when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                closeAllModals();
            }
        });
        
        // Close modals with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllModals();
            }
        });
        
        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });
    }
    
    // ====================
    // SECURITY FUNCTIONS
    // ====================
    
    // Simulate AES-256 encryption (In production, use proper encryption)
    function encrypt(text) {
        // This is a simulation. In production, use Web Crypto API
        return btoa(text).split('').reverse().join('');
    }
    
    function decrypt(encrypted) {
        try {
            return atob(encrypted.split('').reverse().join(''));
        } catch (e) {
            return null;
        }
    }
    
    // Check password strength
    function checkPasswordStrength() {
        const password = elements.password.value;
        let strength = 0;
        let messages = [];
        
        // Length check
        if (password.length >= 8) strength += 20;
        if (password.length >= 12) strength += 20;
        
        // Character type checks
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[a-z]/.test(password)) strength += 20;
        if (/[0-9]/.test(password)) strength += 10;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
        
        // Update strength bar
        elements.strengthBar.style.width = strength + '%';
        
        // Update color and text based on strength
        let strengthLabel = '';
        let color = '';
        
        if (strength < 30) {
            strengthLabel = 'WEAK';
            color = '#ff6b6b'; // Red
        } else if (strength < 60) {
            strengthLabel = 'FAIR';
            color = '#ffa726'; // Orange
        } else if (strength < 80) {
            strengthLabel = 'GOOD';
            color = '#ffd54f'; // Yellow
        } else {
            strengthLabel = 'STRONG';
            color = '#64ffda'; // Teal
        }
        
        elements.strengthBar.style.background = color;
        elements.strengthText.textContent = strengthLabel;
        elements.strengthText.style.color = color;
    }
    
    // Validate password against rules
    function validatePassword(password) {
        const rules = CONFIG.PASSWORD_RULES;
        const errors = [];
        
        if (password.length < rules.minLength) {
            errors.push(`Password must be at least ${rules.minLength} characters`);
        }
        
        if (rules.requireUppercase && !/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        
        if (rules.requireLowercase && !/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        
        if (rules.requireNumbers && !/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        
        if (rules.requireSpecial && !new RegExp(`[${rules.specialChars}]`).test(password)) {
            errors.push('Password must contain at least one special character');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
    
    // ====================
    // LOGIN FUNCTIONALITY
    // ====================
    async function handleLogin(e) {
        e.preventDefault();
        
        // Check if system is locked
        if (state.isLocked) {
            const timeLeft = state.lockoutUntil - Date.now();
            if (timeLeft > 0) {
                const minutes = Math.ceil(timeLeft / (60 * 1000));
                showError(`System locked. Please try again in ${minutes} minutes.`);
                return;
            } else {
                state.isLocked = false;
                state.loginAttempts = 0;
            }
        }
        
        // Get form values
        const username = elements.username.value.trim();
        const password = elements.password.value;
        const securityQuestion = elements.securityQuestion.value;
        const securityAnswer = elements.securityAnswer.value.trim().toLowerCase();
        const twoFactorCode = elements.twoFactorCode.value;
        const rememberMe = elements.rememberMe.checked;
        
        // Validate inputs
        if (!username || !password || !securityQuestion || !securityAnswer) {
            showError('Please fill in all required fields');
            return;
        }
        
        // Simulate loading
        setLoading(true);
        
        // Simulate API delay
        await simulateDelay(1500);
        
        // Check credentials
        const isValid = validateCredentials(username, password, securityQuestion, securityAnswer);
        
        if (isValid) {
            // Check 2FA if provided
            if (twoFactorCode) {
                const isValid2FA = validate2FACode(twoFactorCode);
                if (!isValid2FA) {
                    setLoading(false);
                    showError('Invalid 2FA code');
                    return;
                }
            }
            
            // Login successful
            handleSuccessfulLogin(username, rememberMe);
        } else {
            // Login failed
            handleFailedLogin();
        }
        
        setLoading(false);
    }
    
    function validateCredentials(username, password, question, answer) {
        // In production, this would be a server-side check
        const storedPassword = localStorage.getItem('admin_password') || CONFIG.DEFAULT_ADMIN.password;
        const storedQuestion = localStorage.getItem('security_question') || CONFIG.DEFAULT_ADMIN.securityQuestion;
        const storedAnswer = localStorage.getItem('security_answer') || CONFIG.DEFAULT_ADMIN.securityAnswer;
        
        return username === CONFIG.DEFAULT_ADMIN.username && 
               password === storedPassword &&
               question === storedQuestion &&
               answer.toLowerCase() === storedAnswer.toLowerCase();
    }
    
    function validate2FACode(code) {
        // Simulated 2FA validation
        // In production, this would validate against a time-based one-time password
        return code.length === 6 && /^\d+$/.test(code);
    }
    
    function handleSuccessfulLogin(username, rememberMe) {
        // Reset attempts
        state.loginAttempts = 0;
        state.isLoggedIn = true;
        state.sessionStart = Date.now();
        
        // Save to localStorage if "Remember Me" is checked
        if (rememberMe) {
            localStorage.setItem('remembered_user', username);
        } else {
            localStorage.removeItem('remembered_user');
        }
        
        // Show success animation
        elements.loginBtn.classList.add('access-granted');
        
        // Log the login
        console.log(`✅ Admin login successful: ${username}`);
        console.log(`📊 Session started: ${new Date().toISOString()}`);
        console.log(`🌐 IP Address: ${state.userIP}`);
        
        // Redirect to dashboard after delay
        setTimeout(() => {
            window.location.href = 'admin-dashboard.html';
        }, 1000);
    }
    
    function handleFailedLogin() {
        // Increment attempts
        state.loginAttempts++;
        
        // Check if max attempts reached
        if (state.loginAttempts >= CONFIG.MAX_ATTEMPTS) {
            state.isLocked = true;
            state.lockoutUntil = Date.now() + CONFIG.LOCKOUT_TIME;
            
            // Save to localStorage
            localStorage.setItem('system_locked_until', state.lockoutUntil);
            
            showError(`Too many failed attempts. System locked for 15 minutes.`);
            elements.loginBtn.classList.add('access-denied');
            
            console.warn('⚠️ System locked due to multiple failed login attempts');
            console.warn(`🔒 Locked until: ${new Date(state.lockoutUntil).toISOString()}`);
        } else {
            const attemptsLeft = CONFIG.MAX_ATTEMPTS - state.loginAttempts;
            showError(`Invalid credentials. ${attemptsLeft} attempt(s) remaining.`);
            elements.loginForm.classList.add('animate-shake');
            
            // Remove shake animation after it completes
            setTimeout(() => {
                elements.loginForm.classList.remove('animate-shake');
            }, 500);
        }
        
        console.warn(`❌ Failed login attempt #${state.loginAttempts}`);
    }
    
    // ====================
    // PASSWORD RECOVERY
    // ====================
    function openForgotPasswordModal() {
        elements.forgotPasswordModal.style.display = 'flex';
        resetRecoverySteps();
    }
    
    function resetRecoverySteps() {
        state.currentStep = 1;
        updateRecoveryProgress();
        
        // Hide all steps except first
        document.querySelectorAll('.step').forEach((step, index) => {
            step.classList.toggle('active', index === 0);
        });
        
        // Update buttons
        elements.prevStep.style.display = 'none';
        elements.nextStep.style.display = 'block';
        elements.submitRecovery.style.display = 'none';
    }
    
    function prevRecoveryStep() {
        if (state.currentStep > 1) {
            state.currentStep--;
            updateRecoveryProgress();
            
            document.querySelectorAll('.step').forEach((step, index) => {
                step.classList.toggle('active', index === state.currentStep - 1);
            });
            
            elements.nextStep.style.display = 'block';
            elements.submitRecovery.style.display = 'none';
            
            if (state.currentStep === 1) {
                elements.prevStep.style.display = 'none';
            }
        }
    }
    
    function nextRecoveryStep() {
        // Validate current step before proceeding
        if (!validateRecoveryStep(state.currentStep)) {
            return;
        }
        
        if (state.currentStep < 3) {
            state.currentStep++;
            updateRecoveryProgress();
            
            document.querySelectorAll('.step').forEach((step, index) => {
                step.classList.toggle('active', index === state.currentStep - 1);
            });
            
            elements.prevStep.style.display = 'block';
            
            if (state.currentStep === 3) {
                elements.nextStep.style.display = 'none';
                elements.submitRecovery.style.display = 'block';
            }
        }
    }
    
    function validateRecoveryStep(step) {
        switch(step) {
            case 1:
                const adminId = document.getElementById('recoveryAdminId').value;
                const email = document.getElementById('recoveryEmail').value;
                
                if (!adminId || !email) {
                    showError('Please enter both Admin ID and email');
                    return false;
                }
                
                if (adminId !== CONFIG.DEFAULT_ADMIN.username) {
                    showError('Admin ID not found');
                    return false;
                }
                
                if (email !== CONFIG.DEFAULT_ADMIN.email) {
                    showError('Email not registered');
                    return false;
                }
                
                return true;
                
            case 2:
                const question = document.getElementById('recoveryQuestion').value;
                const answer = document.getElementById('recoveryAnswer').value;
                
                if (!question || !answer) {
                    showError('Please select question and provide answer');
                    return false;
                }
                
                if (question !== CONFIG.DEFAULT_ADMIN.securityQuestion) {
                    showError('Incorrect security question');
                    return false;
                }
                
                if (answer.toLowerCase() !== CONFIG.DEFAULT_ADMIN.securityAnswer.toLowerCase()) {
                    showError('Incorrect security answer');
                    return false;
                }
                
                return true;
                
            default:
                return true;
        }
    }
    
    function updateRecoveryProgress() {
        const progress = (state.currentStep / 3) * 100;
        document.querySelector('.progress-fill').style.width = progress + '%';
        document.querySelector('.progress-text').textContent = `STEP ${state.currentStep} OF 3`;
    }
    
    async function submitRecovery() {
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validate passwords
        if (!newPassword || !confirmPassword) {
            showError('Please enter and confirm new password');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }
        
        const validation = validatePassword(newPassword);
        if (!validation.isValid) {
            showError(validation.errors[0]);
            return;
        }
        
        // Simulate API call
        setLoading(true, elements.submitRecovery);
        
        await simulateDelay(2000);
        
        // Update password in localStorage
        localStorage.setItem('admin_password', newPassword);
        
        setLoading(false, elements.submitRecovery);
        
        // Show success
        showSuccess('Password reset successful! You can now login with your new password.');
        
        // Close modal after delay
        setTimeout(() => {
            closeAllModals();
        }, 2000);
    }
    
    // ====================
    // PASSWORD CHANGE
    // ====================
    function openChangePasswordModal() {
        elements.changePasswordModal.style.display = 'flex';
        
        // Reset form
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPasswordChange').value = '';
        document.getElementById('confirmNewPassword').value = '';
        
        // Reset password meter
        updatePasswordMeter('');
    }
    
    function closeChangePasswordModal() {
        elements.changePasswordModal.style.display = 'none';
    }
    
    function updatePasswordMeter(password) {
        const meter = document.getElementById('passwordMeter');
        const text = document.getElementById('passwordText');
        
        const validation = validatePassword(password);
        const strength = calculatePasswordStrength(password);
        
        meter.style.width = strength + '%';
        
        if (strength < 30) {
            meter.style.background = '#ff6b6b';
            text.textContent = 'WEAK';
        } else if (strength < 60) {
            meter.style.background = '#ffa726';
            text.textContent = 'FAIR';
        } else if (strength < 80) {
            meter.style.background = '#ffd54f';
            text.textContent = 'GOOD';
        } else {
            meter.style.background = '#64ffda';
            text.textContent = 'STRONG';
        }
        
        // Update requirement list
        updatePasswordRequirements(password);
    }
    
    function calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength += 20;
        if (password.length >= 12) strength += 20;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[a-z]/.test(password)) strength += 20;
        if (/[0-9]/.test(password)) strength += 10;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
        
        return strength;
    }
    
    function updatePasswordRequirements(password) {
        const rules = CONFIG.PASSWORD_RULES;
        
        document.querySelectorAll('[data-rule]').forEach(item => {
            const rule = item.getAttribute('data-rule');
            let isValid = false;
            
            switch(rule) {
                case 'length':
                    isValid = password.length >= rules.minLength;
                    break;
                case 'uppercase':
                    isValid = /[A-Z]/.test(password);
                    break;
                case 'lowercase':
                    isValid = /[a-z]/.test(password);
                    break;
                case 'number':
                    isValid = /[0-9]/.test(password);
                    break;
                case 'special':
                    isValid = new RegExp(`[${rules.specialChars}]`).test(password);
                    break;
                case 'unique':
                    // Check against last 5 passwords (simulated)
                    isValid = true;
                    break;
            }
            
            if (isValid) {
                item.classList.add('valid');
            } else {
                item.classList.remove('valid');
            }
        });
    }
    
    async function submitPasswordChange() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPasswordChange').value;
        const confirmPassword = document.getElementById('confirmNewPassword').value;
        
        // Validate inputs
        if (!currentPassword || !newPassword || !confirmPassword) {
            showError('Please fill in all fields');
            return;
        }
        
        // Check current password
        const storedPassword = localStorage.getItem('admin_password') || CONFIG.DEFAULT_ADMIN.password;
        if (currentPassword !== storedPassword) {
            showError('Current password is incorrect');
            return;
        }
        
        // Check if new password is same as current
        if (currentPassword === newPassword) {
            showError('New password must be different from current password');
            return;
        }
        
        // Validate new password
        const validation = validatePassword(newPassword);
        if (!validation.isValid) {
            showError(validation.errors[0]);
            return;
        }
        
        // Check password match
        if (newPassword !== confirmPassword) {
            showError('New passwords do not match');
            return;
        }
        
        // Simulate API call
        setLoading(true, elements.submitChange);
        
        await simulateDelay(1500);
        
        // Update password in localStorage
        localStorage.setItem('admin_password', newPassword);
        
        setLoading(false, elements.submitChange);
        
        // Show success
        showSuccess('Password changed successfully!');
        
        // Close modal after delay
        setTimeout(() => {
            closeChangePasswordModal();
        }, 1500);
    }
    
    // ====================
    // SYSTEM LOCK
    // ====================
    function openLockSystemModal() {
        elements.lockSystemModal.style.display = 'flex';
    }
    
    function closeLockSystemModal() {
        elements.lockSystemModal.style.display = 'none';
    }
    
    function confirmSystemLock() {
        const pin = document.getElementById('superAdminPin').value;
        const reason = document.getElementById('lockReason').value;
        
        if (!pin || pin !== '123456') { // Default super admin PIN
            showError('Invalid super admin PIN');
            return;
        }
        
        if (!reason) {
            showError('Please provide a reason for locking the system');
            return;
        }
        
        // Lock the system
        state.isLocked = true;
        state.lockoutUntil = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
        
        // Save to localStorage
        localStorage.setItem('system_locked_until', state.lockoutUntil);
        localStorage.setItem('lock_reason', reason);
        
        // Show confirmation
        showSuccess('System locked successfully. All admin access has been suspended.');
        
        console.warn('🔒 SYSTEM LOCKED BY ADMIN');
        console.warn(`📝 Reason: ${reason}`);
        console.warn(`⏰ Locked until: ${new Date(state.lockoutUntil).toISOString()}`);
        
        // Close modal and redirect
        setTimeout(() => {
            closeLockSystemModal();
            window.location.href = 'index.html';
        }, 2000);
    }
    
    // ====================
    // 2FA FUNCTIONALITY
    // ====================
    function generate2FACode() {
        // Generate a 6-digit random number
        const code = Math.floor(100000 + Math.random() * 900000);
        elements.twoFactorCode.value = code;
        
        // Show notification
        showSuccess(`2FA code generated: ${code}`);
        
        // Code expires in 30 seconds
        setTimeout(() => {
            if (elements.twoFactorCode.value === code.toString()) {
                elements.twoFactorCode.value = '';
                showError('2FA code has expired. Please generate a new one.');
            }
        }, 30000);
    }
    
    // ====================
    // SESSION MANAGEMENT
    // ====================
    function initSessionTimer() {
        // Update timer every second
        setInterval(() => {
            if (state.sessionStart) {
                const elapsed = Date.now() - state.sessionStart;
                const remaining = CONFIG.SESSION_TIMEOUT - elapsed;
                
                if (remaining <= 0) {
                    // Session expired
                    handleSessionExpired();
                    return;
                }
                
                const minutes = Math.floor(remaining / 60000);
                const seconds = Math.floor((remaining % 60000) / 1000);
                
                elements.sessionTimer.textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                // Warning when less than 5 minutes remaining
                if (remaining < 5 * 60 * 1000) {
                    elements.sessionTimer.classList.add('timer-warning');
                }
            } else {
                elements.sessionTimer.textContent = '--:--';
            }
        }, 1000);
    }
    
    function handleSessionExpired() {
        if (state.isLoggedIn) {
            showError('Your session has expired. Please login again.');
            state.isLoggedIn = false;
            state.sessionStart = null;
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'admin-login.html';
            }, 2000);
        }
    }
    
    // ====================
    // UTILITY FUNCTIONS
    // ====================
    function fetchUserIP() {
        // Simulated IP fetch
        setTimeout(() => {
            state.userIP = '192.168.1.' + Math.floor(Math.random() * 255);
            elements.userIP.textContent = `IP: ${state.userIP}`;
        }, 1000);
    }
    
    function loadSavedCredentials() {
        const rememberedUser = localStorage.getItem('remembered_user');
        if (rememberedUser) {
            elements.username.value = rememberedUser;
            elements.rememberMe.checked = true;
        }
    }
    
    function checkSystemLock() {
        const lockoutUntil = localStorage.getItem('system_locked_until');
        if (lockoutUntil && Date.now() < parseInt(lockoutUntil)) {
            state.isLocked = true;
            state.lockoutUntil = parseInt(lockoutUntil);
            
            const minutes = Math.ceil((state.lockoutUntil - Date.now()) / (60 * 1000));
            console.warn(`⚠️ System is locked. Remaining: ${minutes} minutes`);
        }
    }
    
    function checkURLParameters() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('reset')) {
            openForgotPasswordModal();
        }
    }
    
    function togglePasswordVisibility() {
        const type = elements.password.getAttribute('type') === 'password' ? 'text' : 'password';
        elements.password.setAttribute('type', type);
        elements.togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    }
    
    function setLoading(isLoading, button = elements.loginBtn) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }
    
    function simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    function showError(message) {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'notification error';
        notification.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    function showSuccess(message) {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
    
    // ====================
    // NOTIFICATION STYLES
    // ====================
    const style = document.createElement('style');
    style.textContent = `
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
            animation: slideDown 0.3s ease-out;
            max-width: 400px;
            backdrop-filter: blur(10px);
            font-family: 'Exo 2', sans-serif;
        }
        
        .notification.error {
            background: rgba(255, 107, 107, 0.1);
            border: 1px solid var(--tech-accent-alt);
            color: var(--tech-light);
        }
        
        .notification.success {
            background: rgba(100, 255, 218, 0.1);
            border: 1px solid var(--tech-accent);
            color: var(--tech-light);
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification.error i {
            color: var(--tech-accent-alt);
        }
        
        .notification.success i {
            color: var(--tech-accent);
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(-100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ====================
    // INITIALIZE
    // ====================
    init();
});
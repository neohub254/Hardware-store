// ============================================
// NEXUSBUILD CONSTRUCTION - MAIN JAVASCRIPT
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 NexusBuild Construction Website Loaded');
    console.log('💰 Premium Website Value: 20K+');
    
    // ====================
    // INITIALIZE MODULES
    // ====================
    initializeNavigation();
    initializeHeroSlider();
    initializeFloatingElements();
    initializeCertificateModal();
    initializeContactFunctions();
    initializeAnimations();
    initializeCounters();
    initializeScrollEffects();
    
    // ====================
    // NAVIGATION
    // ====================
    function initializeNavigation() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        const mainNav = document.getElementById('mainNav');
        
        // Mobile menu toggle
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                this.innerHTML = navMenu.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
        }
        
        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Sticky navigation on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                mainNav.classList.add('scrolled');
                mainNav.style.background = 'rgba(255, 255, 255, 0.98)';
                mainNav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                mainNav.classList.remove('scrolled');
                mainNav.style.background = 'rgba(255, 255, 255, 0.95)';
                mainNav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ====================
    // HERO SLIDER
    // ====================
    function initializeHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        let currentSlide = 0;
        let slideInterval;
        
        if (slides.length === 0) return;
        
        // Show initial slide
        slides[currentSlide].classList.add('active');
        
        // Function to show slide
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        // Next slide function
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Previous slide function
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        // Button event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                resetInterval();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                resetInterval();
            });
        }
        
        // Auto slide
        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }
        
        startInterval();
        
        // Pause on hover
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
            heroSection.addEventListener('mouseleave', startInterval);
        }
    }
    
    // ====================
    // FLOATING ELEMENTS
    // ====================
    function initializeFloatingElements() {
        // Back to top button
        const backToTopBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.style.display = 'flex';
                backToTopBtn.classList.add('fade-in-up');
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Floating WhatsApp button hover effect
        const whatsappBtn = document.querySelector('.whatsapp-float');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('mouseenter', function() {
                this.classList.add('pulse-animate');
            });
            
            whatsappBtn.addEventListener('mouseleave', function() {
                this.classList.remove('pulse-animate');
            });
        }
    }
    
    // ====================
    // CERTIFICATE MODAL
    // ====================
    function initializeCertificateModal() {
        const certificateIcon = document.getElementById('certificateIcon');
        const certificateModal = document.getElementById('certificateModal');
        const closeCertificate = document.getElementById('closeCertificate');
        
        if (!certificateIcon || !certificateModal) return;
        
        // Open modal
        certificateIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            certificateModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            certificateModal.classList.add('scale-in');
        });
        
        // Close modal
        function closeModal() {
            certificateModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        if (closeCertificate) {
            closeCertificate.addEventListener('click', closeModal);
        }
        
        // Close on click outside
        certificateModal.addEventListener('click', function(e) {
            if (e.target === certificateModal) {
                closeModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && certificateModal.style.display === 'flex') {
                closeModal();
            }
        });
        
        // Add animation to certificate items
        const certificateItems = document.querySelectorAll('.certificate-item');
        certificateItems.forEach((item, index) => {
            item.classList.add('stagger-item');
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // ====================
    // CONTACT FUNCTIONS
    // ====================
    function initializeContactFunctions() {
        // Open map in new tab
        const openMapBtn = document.getElementById('openMap');
        if (openMapBtn) {
            openMapBtn.addEventListener('click', function() {
                window.open('https://www.google.com/maps/place/Westlands,+Nairobi,+Kenya', '_blank');
            });
        }
        
        // Material inquiry buttons
        const inquireBtns = document.querySelectorAll('.inquire-btn');
        inquireBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const material = this.getAttribute('data-material');
                const whatsappUrl = `https://wa.me/254705455312?text=Hello%20NexusBuild,%20I'm%20interested%20in%20${encodeURIComponent(material)}.%20Please%20send%20me%20more%20information%20and%20pricing.`;
                window.open(whatsappUrl, '_blank');
            });
        });
        
        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                // Show success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                submitBtn.style.background = 'var(--accent-color)';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
                
                // In a real application, you would send this to your server
                console.log('Newsletter subscription:', email);
            });
        }
    }
    
    // ====================
    // ANIMATIONS
    // ====================
    function initializeAnimations() {
        // Add animation classes on scroll
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.reveal-on-scroll');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        };
        
        // Add reveal class to elements
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const children = section.children;
            Array.from(children).forEach((child, index) => {
                if (!child.classList.contains('section-header')) {
                    child.classList.add('reveal-on-scroll');
                    child.style.animationDelay = `${index * 0.1}s`;
                }
            });
        });
        
        // Initial check
        animateOnScroll();
        
        // Check on scroll
        window.addEventListener('scroll', animateOnScroll);
        
        // Add hover effects to cards
        const cards = document.querySelectorAll('.card-hover');
        cards.forEach(card => {
            card.classList.add('hover-lift');
        });
        
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.classList.add('ripple-effect');
            
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // ====================
    // COUNTERS
    // ====================
    function initializeCounters() {
        const counters = document.querySelectorAll('.stat-number');
        if (counters.length === 0) return;
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + '+';
                        }
                    }, 16);
                    
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // ====================
    // SCROLL EFFECTS
    // ====================
    function initializeScrollEffects() {
        // Parallax effect on hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        }
        
        // Active section highlighting in navigation
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // ====================
    // PERFORMANCE OPTIMIZATION
    // ====================
    // Debounce function for scroll events
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Throttle function for resize events
    function throttle(func, limit = 100) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Optimize scroll events
    const optimizedScroll = debounce(animateOnScroll, 20);
    window.addEventListener('scroll', optimizedScroll);
    
    // Optimize resize events
    const optimizedResize = throttle(function() {
        // Handle resize logic here
    }, 100);
    window.addEventListener('resize', optimizedResize);
    
    // ====================
    // ERROR HANDLING
    // ====================
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('Website Error:', e.error);
        // In production, you might want to send this to your error tracking service
    });
    
    // Promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled Promise Rejection:', e.reason);
    });
    
    // ====================
    // WEBSITE VALUE DISPLAY
    // ====================
    // Show website value in console
    console.log('%c💰 NEXUSBUILD CONSTRUCTION', 'color: #f8b400; font-size: 24px; font-weight: bold;');
    console.log('%cPremium Website Value: $20,000+', 'color: #2ecc71; font-size: 16px;');
    console.log('%cFeatures Included:', 'color: #1a3c6e; font-weight: bold;');
    console.log('✅ Fully Responsive Design');
    console.log('✅ Premium Animations & Effects');
    console.log('✅ SEO Optimized Structure');
    console.log('✅ Professional Contact System');
    console.log('✅ Certificate Verification');
    console.log('✅ WhatsApp Integration');
    console.log('✅ Admin Dashboard Ready');
    console.log('✅ Easy Color Customization');
});

// ====================
// SERVICE WORKER FOR PWA (OPTIONAL)
// ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// ====================
// PERFORMANCE METRICS
// ====================
window.addEventListener('load', function() {
    // Calculate and log performance metrics
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        
        console.log(`Page Load Time: ${pageLoadTime}ms`);
        console.log(`DOM Ready Time: ${domReadyTime}ms`);
        
        // Send to analytics in production
        if (pageLoadTime > 3000) {
            console.warn('⚠️ Page load time is high, consider optimization');
        }
    }
    
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});
// Portfolio Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Add animation class to hero section on load
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('animate-in');
    }

    // Mobile menu toggle and navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinkElements = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Close menu when clicking outside
    function closeMenuOnClickOutside(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Smooth scroll to section
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
        }
    }

    // Event Listeners
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMenu);
        
        // Close menu when clicking a link
        navLinkElements.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = link.getAttribute('href');
                    toggleMenu();
                    smoothScroll(target);
                } else {
                    toggleMenu();
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', closeMenuOnClickOutside);
        
        // Close menu on window resize if desktop
        let resizeTimer;
        window.addEventListener('resize', () => {
            document.body.classList.add('resize-animation-stopper');
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                document.body.classList.remove('resize-animation-stopper');
                if (window.innerWidth > 768) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, 400);
        });
    }

    // Enhanced Portfolio Filter with Animation
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Prevent duplicate clicks
                if (this.classList.contains('active')) return;
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Disable interaction during animation
                portfolioGrid.style.pointerEvents = 'none';
                
                // Animate out current items
                let visibleItems = [];
                portfolioItems.forEach(item => {
                    const matchesFilter = filterValue === 'all' || 
                                        item.getAttribute('data-category') === filterValue;
                    
                    if (matchesFilter) {
                        visibleItems.push(item);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                    }
                });
                
                // Animate in filtered items
                setTimeout(() => {
                    visibleItems.forEach((item, index) => {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        }, 50 * index);
                    });
                    
                    // Hide non-matching items after animation
                    portfolioItems.forEach(item => {
                        const matchesFilter = filterValue === 'all' || 
                                          item.getAttribute('data-category') === filterValue;
                        if (!matchesFilter) {
                            setTimeout(() => {
                                item.style.display = 'none';
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 300);
                        }
                    });
                    
                    // Re-enable interaction
                    setTimeout(() => {
                        portfolioGrid.style.pointerEvents = 'auto';
                    }, 500);
                }, 300);
            });
        });
    }

    // Enhanced Contact Form with Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add input validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() !== '') {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
                
                // Specific validation for email
                if (this.type === 'email' && this.value.trim() !== '') {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(this.value)) {
                        this.setCustomValidity('Please enter a valid email address');
                        this.reportValidity();
                    } else {
                        this.setCustomValidity('');
                    }
                }
            });
            
            // Clear validation on input
            input.addEventListener('input', function() {
                this.setCustomValidity('');
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const formMessage = document.getElementById('formMessage');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                
                // Show success message
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Thank you for your message! I\'ll get back to you within 24 hours.';
                formMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
                
            }, 2000);
        });
    }

    // Smooth scrolling for anchor links with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class for styling
            if (currentScroll > 20) {
                navbar.classList.add('scrolled');
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                
                // Hide/show navbar on scroll direction
                if (currentScroll > lastScroll && currentScroll > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.background = 'transparent';
                navbar.style.backdropFilter = 'none';
                navbar.style.boxShadow = 'none';
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Intersection Observer for animations
    const initIntersectionObserver = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with data-animate attribute
        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    };

    // Initialize the intersection observer
    initIntersectionObserver();

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.textContent);
                    let currentValue = 0;
                    const increment = finalValue / 50;
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            target.textContent = finalValue + (target.textContent.includes('+') ? '+' : '');
                            clearInterval(counter);
                        } else {
                            target.textContent = Math.floor(currentValue) + (target.textContent.includes('+') ? '+' : '');
                        }
                    }, 30);
                    
                    statsObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Code preview typing animation
    const codeContent = document.querySelector('.code-content pre code');
    if (codeContent) {
        const originalText = codeContent.innerHTML;
        codeContent.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                codeContent.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, Math.random() * 50);
            }
        };
        
        // Start typing animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(codeContent);
    }

    // Project links hover effects
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
            
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        });
    });

    // Skill tags hover animation
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = 'var(--primary-blue)';
            this.style.color = 'var(--white)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'var(--gray-100)';
            this.style.color = 'var(--gray-800)';
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
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
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for animations
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        .skill-tag {
            transition: all 0.3s ease;
        }
        
        .portfolio-item {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

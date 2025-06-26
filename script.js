// Enhanced Bug Matrix Website Script with Modern Animations
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Bug Matrix Website Loaded Successfully! 🐞');

    // Enhanced Custom cursor follower with particle effects
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursorFollower && window.innerWidth > 1024) {
        document.addEventListener('mousemove', function(e) {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
            
            // Add particle trail effect
            createParticle(e.clientX, e.clientY);
        });
        
        // Enhanced hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .feature-card, .benefit-card, .review-card, .faq-question, .download-btn');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.backgroundColor = 'rgba(99, 102, 241, 0.3)';
                cursorFollower.style.mixBlendMode = 'difference';
                cursorFollower.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
            });
            
            element.addEventListener('mouseleave', function() {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
                cursorFollower.style.mixBlendMode = 'normal';
                cursorFollower.style.boxShadow = '0 0 10px rgba(99, 102, 241, 0.3)';
            });
        });
    }

    // Particle creation function
    function createParticle(x, y) {
        if (Math.random() > 0.8) { // Only create particles occasionally
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.animation = 'particleFade 1s ease-out forwards';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFade {
            0% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
            100% {
                opacity: 0;
                transform: scale(0) translateY(-20px);
            }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        
        .float-animation { animation: float 3s ease-in-out infinite; }
        .pulse-animation { animation: pulse 2s ease-in-out infinite; }
        .rotate-animation { animation: rotate 4s linear infinite; }
        .shimmer-animation { 
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
        }
    `;
    document.head.appendChild(style);

    // Enhanced Mobile menu toggle with animations
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // Add rotation animation to hamburger
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (this.classList.contains('active')) {
                    span.style.transform = index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                                         index === 1 ? 'opacity: 0' :
                                         'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // Enhanced Smooth scrolling with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
                
                // Enhanced smooth scroll with easing
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.offsetTop - 80;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });

    // Enhanced FAQ accordion with smooth animations
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Close all other items with animation
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0px';
                }
            });
            
            // Toggle current item with smooth animation
            const isActive = item.classList.contains('active');
            
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = '0px';
                answer.style.opacity = '0';
            }
        });
    });

    // Enhanced Form submission with better UX
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Enhanced validation with visual feedback
            if (!name || !email || !message) {
                showNotification('❌ Please fill in all fields', 'error');
                shakeForm();
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('❌ Please enter a valid email address', 'error');
                shakeForm();
                return;
            }
            
            // Prepare form data for submission
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);
            formData.append('_replyto', email);
            formData.append('_subject', 'New contact form submission from ' + name);
            
            // Enhanced loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending... 🚀';
            submitBtn.style.background = 'var(--gradient-2)';
            
            // Simulate form submission with better UX
            setTimeout(() => {
                // Show success message
                const successMessage = document.getElementById('index-success-message');
                if (successMessage) {
                    successMessage.style.display = 'flex';
                    contactForm.style.display = 'none';
                    
                    // Add celebration animation
                    createConfetti();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                } else {
                    showNotification('✅ Thank you for your message! We will get back to you soon. 🎉', 'success');
                }
                contactForm.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'var(--gradient-1)';
            }, 2000);
        });
    }

    // Contact form in contact.html with enhanced features
    const contactPageForm = document.getElementById('contact-form');
    
    if (contactPageForm) {
        contactPageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Enhanced validation
            if (!name || !email || !subject || !message) {
                showNotification('❌ Please fill in all fields', 'error');
                shakeForm();
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('❌ Please enter a valid email address', 'error');
                shakeForm();
                return;
            }
            
            // Prepare form data for submission
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('subject', subject);
            formData.append('message', message);
            formData.append('_replyto', email);
            formData.append('_subject', 'New contact form submission: ' + subject);
            
            // Enhanced loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending... 🚀';
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                const successMessage = document.getElementById('success-message');
                if (successMessage) {
                    successMessage.style.display = 'flex';
                    contactPageForm.style.display = 'none';
                    
                    // Add celebration animation
                    createConfetti();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                } else {
                    showNotification('✅ Thank you for your message! We will get back to you soon. 🎉', 'success');
                }
                contactPageForm.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 2000);
        });
    }

    // Enhanced notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--primary-color)'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Form shake animation
    function shakeForm() {
        const form = document.querySelector('.contact-form form') || document.getElementById('contact-form');
        if (form) {
            form.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                form.style.animation = '';
            }, 500);
        }
    }

    // Confetti celebration animation
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * window.innerWidth}px;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                animation: confettiFall 3s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }

    // Add confetti animation CSS
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(confettiStyle);

    // Enhanced scroll animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('features-grid') || 
                    entry.target.classList.contains('benefits-grid')) {
                    const items = entry.target.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .benefit-card, .testimonial, .faq-item, .contact-form, .features-grid, .benefits-grid');
    animateElements.forEach(el => observer.observe(el));

    // Enhanced header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Enhanced counter animation for stats
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
                }, 16);
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Enhanced hover effects for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02) rotateY(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add floating emojis to the page
    function addFloatingEmojis() {
        const emojis = ['🐞', '🚀', '💻', '🛡️', '🔍', '⚡', '🎯', '✨'];
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        
        for (let i = 0; i < 10; i++) {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: absolute;
                font-size: 2rem;
                opacity: 0.1;
                animation: float ${5 + Math.random() * 5}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            container.appendChild(emoji);
        }
        
        document.body.appendChild(container);
    }

    // Initialize floating emojis
    addFloatingEmojis();

    // Enhanced download button interactions
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    console.log('🎉 All animations and interactions loaded successfully! 🚀');
}); 
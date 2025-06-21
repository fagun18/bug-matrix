// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor follower
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursorFollower && window.innerWidth > 1024) {
        document.addEventListener('mousemove', function(e) {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });

        // Add pulse effect when hovering over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .feature-card, .benefit-card, .review-card, .faq-question');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.backgroundColor = 'rgba(66, 133, 244, 0.3)';
                cursorFollower.style.mixBlendMode = 'difference';
            });

            element.addEventListener('mouseleave', function() {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.backgroundColor = 'rgba(66, 133, 244, 0.2)';
                cursorFollower.style.mixBlendMode = 'normal';
            });
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
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

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Form submission - Contact form in index.html
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Prepare form data for submission
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);
            formData.append('_replyto', email);
            formData.append('_subject', 'New contact form submission from ' + name);

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Send to Formspree
            fetch('https://formspree.io/f/info@sqatesting.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                // Show success message
                const successMessage = document.getElementById('index-success-message');
                if (successMessage) {
                    successMessage.style.display = 'flex';
                    contactForm.style.display = 'none';

                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                } else {
                    showNotification('Thank you for your message! We will get back to you soon.', 'success');
                }
                contactForm.reset();
            })
            .catch(error => {
                showNotification('Oops! There was a problem submitting your form.', 'error');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
        });
    }

    // Contact form in contact.html
    const contactPageForm = document.getElementById('contact-form');

    if (contactPageForm) {
        contactPageForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
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

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Send to Formspree
            fetch('https://formspree.io/f/info@sqatesting.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                // Show success message
                const successMessage = document.getElementById('success-message');
                if (successMessage) {
                    successMessage.style.display = 'flex';
                    contactPageForm.style.display = 'none';

                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                } else {
                    showNotification('Thank you for your message! We will get back to you soon.', 'success');
                }
                contactPageForm.reset();
            })
            .catch(error => {
                showNotification('Oops! There was a problem submitting your form.', 'error');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
        });
    }

    // Job alert form in careers.html
    const jobAlertForm = document.getElementById('job-alert-form');

    if (jobAlertForm) {
        jobAlertForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const jobCategory = this.querySelector('#job-category').value;

            // Simple validation
            if (!name || !email || !jobCategory) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Prepare form data for submission
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('job-category', jobCategory);
            formData.append('_replyto', email);
            formData.append('_subject', 'New job alert subscription: ' + jobCategory);

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Send to Formspree
            fetch('https://formspree.io/f/info@sqatesting.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                showNotification('Thank you for subscribing to job alerts! We will notify you when new positions become available.', 'success');
                jobAlertForm.reset();
            })
            .catch(error => {
                showNotification('Oops! There was a problem submitting your form.', 'error');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
        });
    }

    // Custom notification function
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <p>${message}</p>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Add styles if not already in CSS
        const notificationStyle = document.createElement('style');
        notificationStyle.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                background: white;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 500px;
                transform: translateY(100px);
                opacity: 0;
                animation: slideUp 0.3s forwards;
            }

            .notification-content {
                display: flex;
                align-items: center;
            }

            .notification-content i {
                margin-right: 10px;
                font-size: 1.5rem;
            }

            .notification.success .notification-content i {
                color: #34a853;
            }

            .notification.error .notification-content i {
                color: #ea4335;
            }

            .notification.info .notification-content i {
                color: #4285f4;
            }

            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                color: #757575;
                padding: 5px;
            }

            @keyframes slideUp {
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes slideDown {
                to {
                    transform: translateY(100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(notificationStyle);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideDown 0.3s forwards';

            setTimeout(() => {
                notification.remove();
            }, 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideDown 0.3s forwards';

                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // Intersection Observer for animations
    const animateElements = document.querySelectorAll('.feature-card, .benefit-card, .testimonial, .browser-logo, .review-card, .contact-item, .social-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach((element, index) => {
        // Add delay based on index for staggered animation
        element.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(element);
    });

    // Sticky header
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.classList.add('sticky');

            if (scrollTop > lastScrollTop && scrollTop > 300) {
                // Scrolling down
                header.classList.add('hide');
            } else {
                // Scrolling up
                header.classList.remove('hide');
            }
        } else {
            header.classList.remove('sticky');
            header.classList.remove('hide');
        }

        lastScrollTop = scrollTop;
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroSection && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const heroHeight = heroSection.offsetHeight;

            if (scrollTop <= heroHeight) {
                const scrollPercentage = scrollTop / heroHeight;

                heroContent.style.transform = `translateY(${scrollPercentage * 50}px)`;
                heroImage.style.transform = `translateY(${scrollPercentage * -50}px)`;
            }
        });
    }

    // Initialize Particles.js for hero background
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#4285f4'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4285f4',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .benefit-card, .testimonial, .browser-logo, .review-card, .contact-item, .social-links a {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity var(--transition-slow), transform var(--transition-slow);
        }

        .feature-card.animate, .benefit-card.animate, .testimonial.animate, .browser-logo.animate, .review-card.animate, .contact-item.animate, .social-links a.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .sticky {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .hide {
            transform: translateY(-100%);
        }

        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }

        .nav-links.active li {
            margin: 10px 0;
        }

        .mobile-menu-btn.active i:before {
            content: "\\f00d";
        }

        /* Make footer links clickable */
        .footer-column a {
            display: inline-block;
            position: relative;
            padding: 5px 0;
            z-index: 1;
        }

        .footer-column a:hover {
            color: var(--primary-color);
        }

        /* Success message styling */
        .success-message {
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 40px;
            background: rgba(52, 168, 83, 0.05);
            border-radius: var(--border-radius);
            margin-bottom: 30px;
        }

        .success-message i {
            font-size: 3rem;
            color: #34a853;
            margin-bottom: 20px;
        }

        .success-message h3 {
            margin-bottom: 10px;
            color: var(--text-dark);
        }

        .success-message p {
            color: var(--text-muted);
        }
    `;
    document.head.appendChild(style);
});

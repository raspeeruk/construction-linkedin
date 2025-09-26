document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a, .cta-buttons a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that start with #
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            // Form validation
            let isValid = true;
            let errorMessage = '';
            
            if (!formData.name.trim()) {
                isValid = false;
                errorMessage += 'Please enter your name.\n';
            }
            
            if (!formData.company.trim()) {
                isValid = false;
                errorMessage += 'Please enter your company name.\n';
            }
            
            if (!formData.email.trim()) {
                isValid = false;
                errorMessage += 'Please enter your email address.\n';
            } else if (!isValidEmail(formData.email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            if (!formData.phone.trim()) {
                isValid = false;
                errorMessage += 'Please enter your phone number.\n';
            }
            
            if (!formData.message.trim()) {
                isValid = false;
                errorMessage += 'Please enter your message.\n';
            }
            
            if (!isValid) {
                alert('Please correct the following errors:\n' + errorMessage);
                return;
            }
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message
            alert('Thank you for your inquiry! We will contact you shortly.');
            contactForm.reset();
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Fixed header on scroll
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'white';
            }
        });
    }
    
    // Simple testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length > 1) {
        // Hide all testimonials except the first one
        for (let i = 1; i < testimonials.length; i++) {
            testimonials[i].style.display = 'none';
        }
        
        // Create navigation dots
        const testimonialSlider = document.querySelector('.testimonial-slider');
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        
        for (let i = 0; i < testimonials.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'testimonial-dot';
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', function() {
                showTestimonial(i);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        testimonialSlider.appendChild(dotsContainer);
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(nextTestimonial, 5000);
    }
    
    function showTestimonial(index) {
        // Hide current testimonial
        testimonials[currentTestimonial].style.display = 'none';
        
        // Update dots
        const dots = document.querySelectorAll('.testimonial-dot');
        if (dots.length) {
            dots[currentTestimonial].classList.remove('active');
            dots[index].classList.add('active');
        }
        
        // Show new testimonial
        currentTestimonial = index;
        testimonials[currentTestimonial].style.display = 'block';
    }
    
    function nextTestimonial() {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonials.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    }
    
    // Add CSS for testimonial dots
    const style = document.createElement('style');
    style.textContent = `
        .testimonial-dots {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        
        .testimonial-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #ddd;
            margin: 0 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .testimonial-dot.active {
            background-color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
});
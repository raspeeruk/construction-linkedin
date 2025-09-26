document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .process-step, .audience-card, .pain-card, .pricing-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Check for elements on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Mobile menu toggle
    const createMobileMenu = function() {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
        
        // Insert button before nav
        header.insertBefore(mobileMenuBtn, nav);
        
        // Add event listener to toggle menu
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    };
    
    // Only create mobile menu on smaller screens
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // Create mobile menu on resize if needed
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        }
    });
    
    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .process-step, .audience-card, .pain-card, .pricing-card, .testimonial-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .service-card.animate, .process-step.animate, .audience-card.animate, .pain-card.animate, .pricing-card.animate, .testimonial-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .mobile-menu-btn {
            display: none;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
                background: none;
                border: none;
                cursor: pointer;
                width: 30px;
                height: 25px;
                position: relative;
                z-index: 1001;
            }
            
            .mobile-menu-btn span {
                display: block;
                width: 100%;
                height: 3px;
                background-color: var(--primary);
                margin-bottom: 5px;
                transition: var(--transition);
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
            
            nav {
                position: fixed;
                top: 0;
                right: -100%;
                width: 80%;
                max-width: 300px;
                height: 100vh;
                background-color: var(--white);
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                padding: 80px 2rem 2rem;
                transition: right 0.3s ease;
                z-index: 1000;
            }
            
            nav.active {
                right: 0;
            }
            
            nav ul {
                flex-direction: column;
                gap: 1.5rem;
            }
        }
    `;
    
    document.head.appendChild(style);
});
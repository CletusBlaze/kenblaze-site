// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Portfolio Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);



// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.service || !data.message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send contact notification
    sendContactNotification(data);
    
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Add loading animation to images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Portfolio item click handler
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        // You can add lightbox functionality here
        const img = item.querySelector('img');
        const overlay = item.querySelector('.portfolio-overlay');
        
        // Simple zoom effect for now
        item.style.transform = 'scale(1.05)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 200);
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Skills animation
function animateSkills() {
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
        const skillPercent = fill.getAttribute('data-skill');
        fill.style.width = skillPercent + '%';
    });
}

// Booking form handling
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);
        
        // Validation
        if (!data.fullName || !data.email || !data.phone || !data.package || !data.date || !data.time || !data.location) {
            alert('Please fill in all required fields');
            return;
        }
        
        const submitBtn = bookingForm.querySelector('.booking-submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Send booking data to admin
        sendBookingNotification(data);
        
        setTimeout(() => {
            alert(`Thank you ${data.fullName}! Your booking request has been submitted. We'll contact you within 24 hours to confirm your ${data.package} package session.`);
            bookingForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Gallery lightbox effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
    });
});

// Pricing card interactions
document.querySelectorAll('.pricing-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const packageType = btn.closest('.pricing-card').querySelector('h3').textContent;
        const bookingSection = document.querySelector('#booking');
        const packageSelect = document.querySelector('select[name="package"]');
        
        if (packageSelect) {
            packageSelect.value = packageType.toLowerCase();
        }
        
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Initialize skills animation when about section is visible
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateSkills, 500);
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #e74c3c, #f39c12);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
addScrollProgress();

// Booking notification system
function sendBookingNotification(bookingData) {
    // Send WhatsApp notification
    const message = `🔔 NEW BOOKING REQUEST\n\nName: ${bookingData.fullName}\nEmail: ${bookingData.email}\nPhone: ${bookingData.phone}\nPackage: ${bookingData.package}\nDate: ${bookingData.date}\nTime: ${bookingData.time}\nLocation: ${bookingData.location}\nDetails: ${bookingData.details || 'None'}`;
    
    // Store booking locally
    storeBooking(bookingData);
    
    // Send to WhatsApp (opens WhatsApp with pre-filled message)
    const whatsappUrl = `https://wa.me/2347067385589?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function sendContactNotification(contactData) {
    const message = `📧 NEW CONTACT MESSAGE\n\nName: ${contactData.name}\nEmail: ${contactData.email}\nService: ${contactData.service}\nMessage: ${contactData.message}`;
    
    storeContact(contactData);
    
    const whatsappUrl = `https://wa.me/2347067385589?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Local storage for bookings
function storeBooking(data) {
    const bookings = JSON.parse(localStorage.getItem('kenblaze_bookings') || '[]');
    bookings.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('kenblaze_bookings', JSON.stringify(bookings));
}

function storeContact(data) {
    const contacts = JSON.parse(localStorage.getItem('kenblaze_contacts') || '[]');
    contacts.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('kenblaze_contacts', JSON.stringify(contacts));
}

// Update fade-in elements to include new sections
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.about, .gallery, .portfolio, .services, .pricing, .booking, .contact');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});
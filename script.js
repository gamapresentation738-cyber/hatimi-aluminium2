// WhatsApp Configuration
const WHATSAPP_NUMBER = '919876543210'; // Replace with your actual WhatsApp number

// Language Translation System
const translations = {
    en: {
        'Home': 'Home',
        'Services': 'Services',
        'Gallery': 'Gallery',
        'About': 'About',
        'Contact': 'Contact',
        'हिंदी': 'हिंदी',
        'English': 'English'
    },
    hi: {
        'Home': 'होम',
        'Services': 'सेवाएं',
        'Gallery': 'गैलरी',
        'About': 'के बारे में',
        'Contact': 'संपर्क करें',
        'हिंदी': 'English',
        'English': 'हिंदी'
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

// Initialize language on page load
window.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLanguage);
});

// Language Toggle Button
const langBtn = document.getElementById('langBtn');
if (langBtn) {
    langBtn.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
        localStorage.setItem('language', currentLanguage);
        setLanguage(currentLanguage);
    });
}

// Set Language Function
function setLanguage(language) {
    const elements = document.querySelectorAll('[data-en][data-hi]');
    
    elements.forEach(element => {
        if (language === 'en') {
            element.textContent = element.getAttribute('data-en');
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = element.getAttribute('data-en');
            }
        } else if (language === 'hi') {
            element.textContent = element.getAttribute('data-hi');
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = element.getAttribute('data-hi');
            }
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = language;

    // Update button text
    if (langBtn) {
        langBtn.textContent = language === 'en' ? 'हिंदी' : 'English';
    }

    // Update document direction if needed for Hindi
    if (language === 'hi') {
        document.body.style.fontFamily = "'Poppins', 'Devanagari', sans-serif";
    } else {
        document.body.style.fontFamily = "'Poppins', sans-serif";
    }
}

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

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.animation = 'fadeIn 0.6s ease-out';
                }, 0);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.animation = 'fadeIn 0.6s ease-out';
                    }, 0);
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
});

// WhatsApp Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const projectType = document.getElementById('projectType').value;
    const message = document.getElementById('message').value;

    // Create WhatsApp message based on current language
    let whatsappMessage;
    if (currentLanguage === 'hi') {
        whatsappMessage = encodeURIComponent(
            `नमस्ते अलुमिफैब,\n\n` +
            `मैं आपकी सेवाओं के बारे में पूछताछ करना चाहता हूं।\n\n` +
            `*ग्राहक विवरण:*\n` +
            `नाम: ${fullName}\n` +
            `ईमेल: ${email}\n` +
            `फोन: ${phone}\n` +
            `परियोजना प्रकार: ${projectType}\n\n` +
            `*परियोजना विवरण:*\n` +
            `${message}\n\n` +
            `आपकी प्रतिक्रिया की प्रतीक्षा है।`
        );
    } else {
        whatsappMessage = encodeURIComponent(
            `Hello AlumiFab,\n\n` +
            `I would like to inquire about your services.\n\n` +
            `*Customer Details:*\n` +
            `Name: ${fullName}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}\n` +
            `Project Type: ${projectType}\n\n` +
            `*Project Details:*\n` +
            `${message}\n\n` +
            `Looking forward to your response.`
        );
    }

    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

    // Show success message
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    const redirectText = currentLanguage === 'hi' ? '✓ व्हाट्सएप पर रीडायरेक्ट...' : '✓ Redirecting to WhatsApp...';
    submitButton.textContent = redirectText;
    submitButton.style.background = 'linear-gradient(135deg, #3A7D2D, #1F3A0B)';

    // Redirect to WhatsApp after a short delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 1000);
    }, 500);
});

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service items, gallery items, and feature cards
document.querySelectorAll('.service-item, .feature-card').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--royal-green)';
        } else {
            link.style.color = '';
        }
    });
});

// Add hover effect to floating shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.floating-shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const moveX = (x - 0.5) * (index + 1) * 20;
        const moveY = (y - 0.5) * (index + 1) * 20;
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Initialize animations
window.addEventListener('load', () => {
    // Add animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// CTA button click
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

console.log('✨ AlumiFab website loaded successfully with English-Hindi translation!');

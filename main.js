// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for Fade-in Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all gem cards
document.querySelectorAll('.gem-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe about section
const aboutSection = document.querySelector('.about-content');
if (aboutSection) {
    aboutSection.style.opacity = '0';
    aboutSection.style.transform = 'translateY(30px)';
    aboutSection.style.transition = 'all 0.8s ease';
    observer.observe(aboutSection);
}

// Contact Form Handling with EmailJS
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = contactForm.querySelector('input[name="from_name"]').value;
    const email = contactForm.querySelector('input[name="from_email"]').value;
    const phone = contactForm.querySelector('input[name="phone"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;

    // Validation
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Show loading notification
    showNotification('Sending message...', 'info');

    // Send email using EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
            contactForm.reset();
        }, function(error) {
            console.log('FAILED...', error);
            showNotification('Sorry, there was an error sending your message. Please try again or contact us directly at janinduchamika2002@gmail.com', 'error');
        });
});

// Notification Function
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Set color based on type
    let bgColor;
    if (type === 'success') {
        bgColor = '#27ae60';
    } else if (type === 'error') {
        bgColor = '#e74c3c';
    } else if (type === 'info') {
        bgColor = '#3498db';
    } else {
        bgColor = '#95a5a6';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background-color: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove notification after 4 seconds (except for info/loading type)
    if (type !== 'info') {
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Gem Details Modal (Optional Enhancement)
const gemCards = document.querySelectorAll('.gem-card');

gemCards.forEach(card => {
    const viewButton = card.querySelector('.btn-secondary');
    
    if (viewButton) {
        viewButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const gemName = card.querySelector('h3').textContent;
            const gemDescription = card.querySelector('.gem-description').textContent;
            const gemPrice = card.querySelector('.gem-price').textContent;
            const gemImage = card.querySelector('img').src;

            showGemModal(gemName, gemDescription, gemPrice, gemImage);
        });
    }
});

function showGemModal(name, description, price, image) {
    console.log('Opening modal for:', name);
    
    // Remove existing modal if any
    const existingModal = document.querySelector('.gem-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'gem-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${image}" alt="${name}">
                </div>
                <div class="modal-info">
                    <h2>${name}</h2>
                    <p class="modal-description">${description}</p>
                    <p class="modal-price">${price}</p>
                    <div class="modal-details">
                        <h4>Details:</h4>
                        <ul>
                            <li><strong>Certification:</strong> GIA Certified</li>
                            <li><strong>Origin:</strong> Natural</li>
                            <li><strong>Cut:</strong> Excellent</li>
                            <li><strong>Clarity:</strong> VVS</li>
                        </ul>
                    </div>
                    <button class="btn btn-primary" onclick="showNotification('Thank you for your interest! Our team will contact you shortly.', 'success')">
                        Request More Info
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close modal functionality
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
}

// Add modal styles
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
    }

    .modal-content {
        position: relative;
        background-color: white;
        border-radius: 10px;
        max-width: 900px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        z-index: 10000;
        animation: slideUp 0.3s ease;
    }

    .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 32px;
        cursor: pointer;
        color: #333;
        z-index: 10001;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    }

    .modal-close:hover {
        background-color: #f0f0f0;
        transform: rotate(90deg);
    }

    .modal-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        padding: 30px;
    }

    .modal-image img {
        width: 100%;
        border-radius: 10px;
    }

    .modal-info h2 {
        color: #2c3e50;
        margin-bottom: 15px;
    }

    .modal-description {
        color: #777;
        margin-bottom: 20px;
        line-height: 1.8;
    }

    .modal-price {
        font-size: 24px;
        font-weight: 600;
        color: #e74c3c;
        margin-bottom: 25px;
    }

    .modal-details {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 25px;
    }

    .modal-details h4 {
        color: #2c3e50;
        margin-bottom: 15px;
    }

    .modal-details ul {
        list-style: none;
    }

    .modal-details li {
        padding: 8px 0;
        border-bottom: 1px solid #e0e0e0;
    }

    .modal-details li:last-child {
        border-bottom: none;
    }

    .modal-info .btn {
        width: 100%;
        margin-top: 10px;
    }

    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    @media (max-width: 768px) {
        .modal-body {
            grid-template-columns: 1fr;
        }

        .modal-content {
            width: 95%;
        }
    }
`;
document.head.appendChild(modalStyle);

// Scroll to Top Button
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '↑';
scrollTopButton.className = 'scroll-top';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #e74c3c;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.opacity = '1';
        scrollTopButton.style.visibility = 'visible';
    } else {
        scrollTopButton.style.opacity = '0';
        scrollTopButton.style.visibility = 'hidden';
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopButton.addEventListener('mouseenter', () => {
    scrollTopButton.style.transform = 'scale(1.1)';
});

scrollTopButton.addEventListener('mouseleave', () => {
    scrollTopButton.style.transform = 'scale(1)';
});

console.log('Janindu Gems - Website Loaded Successfully! 💎');
console.log('Gem cards found:', document.querySelectorAll('.gem-card').length);
console.log('View Details buttons found:', document.querySelectorAll('.btn-secondary').length);
// Main JavaScript file for POK website
// This file handles the core functionality of the page

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

// Handle form submission with AJAX - prevents redirect
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const messageDiv = document.getElementById('formMessage');
    
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        // Formspree returns 200 on success
        if (response.ok || response.status === 200) {
            // Show success message
            messageDiv.textContent = '✓ ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.';
            messageDiv.className = 'success';
            messageDiv.style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Scroll to message
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
            
            return false;
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    })
    .catch(error => {
        // Show error message
        messageDiv.textContent = '✗ Error al enviar el mensaje. Por favor, intenta de nuevo o contáctanos directamente.';
        messageDiv.className = 'error';
        messageDiv.style.display = 'block';
        
        console.error('Error:', error);
    });
    
    return false;
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and other elements
document.querySelectorAll('.feature-card, .integration-card, .cert-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Handle demo button clicks
document.querySelectorAll('button[onclick*="demo"]').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.getAttribute('onclick').includes('alert')) {
            e.preventDefault();
            console.log('Demo button clicked');
        }
    });
});

// Handle free version button clicks
document.querySelectorAll('button[onclick*="gratis"]').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.getAttribute('onclick').includes('alert')) {
            e.preventDefault();
            console.log('Free version button clicked');
        }
    });
});

console.log('POK Website loaded successfully');

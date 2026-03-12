// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            navMenu.classList.remove('active');
        }
    });
});

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Navbar scroll effect (throttled)
const navbar = document.getElementById('navbar');
let lastScroll = 0;
let ticking = false;

function updateNavbar() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// Active navigation link highlighting (throttled)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
let navTicking = false;

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    navTicking = false;
}

window.addEventListener('scroll', () => {
    if (!navTicking) {
        window.requestAnimationFrame(updateActiveNav);
        navTicking = true;
    }
}, { passive: true });

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Scroll animation disabled - content is static and visible immediately
// All content is now displayed without scroll-based animations for faster page load

// Form validation (if contact form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Search Functionality
const searchToggle = document.getElementById('search-toggle');
const searchBox = document.getElementById('search-box');
const searchInput = document.getElementById('search-input');
const searchClose = document.getElementById('search-close');
const searchResultsContainer = document.getElementById('search-results-container');
const searchResultsBody = document.getElementById('search-results-body');

// Toggle search box
if (searchToggle) {
    searchToggle.addEventListener('click', () => {
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();
        }
    });
}

// Close search box
if (searchClose) {
    searchClose.addEventListener('click', () => {
        searchBox.classList.remove('active');
        searchInput.value = '';
        searchResultsContainer.classList.remove('active');
    });
}

// Close search box when clicking outside
document.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
        searchBox.classList.remove('active');
        searchResultsContainer.classList.remove('active');
    }
});

// Search functionality
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
        searchResultsBody.innerHTML = '<p class="search-placeholder">Enter at least 2 characters to search...</p>';
        searchResultsContainer.classList.remove('active');
        return;
    }
    
    searchTimeout = setTimeout(() => {
        performSearch(query);
    }, 500);
});

// Perform search
function performSearch(query) {
    const results = [];
    const searchableElements = document.querySelectorAll('section, .project-card, .cert-item, .award-card, .education-card, .membership-item, .timeline-item, .skill-category');
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query)) {
            const title = getElementTitle(element);
            const snippet = getSnippet(element, query);
            const section = getSectionName(element);
            const link = getElementLink(element);
            
            results.push({
                title,
                snippet,
                section,
                link,
                element
            });
        }
    });
    
    displayResults(results, query);
}

function getElementTitle(element) {
    const h2 = element.querySelector('h2');
    const h3 = element.querySelector('h3');
    const h4 = element.querySelector('h4');
    
    if (h2) return h2.textContent;
    if (h3) return h3.textContent;
    if (h4) return h4.textContent;
    
    return element.tagName === 'SECTION' ? element.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Content';
}

function getSnippet(element, query) {
    const text = element.textContent;
    const index = text.toLowerCase().indexOf(query);
    
    if (index === -1) return text.substring(0, 150) + '...';
    
    const start = Math.max(0, index - 50);
    const end = Math.min(text.length, index + query.length + 100);
    let snippet = text.substring(start, end);
    
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';
    
    // Highlight query in snippet
    const regex = new RegExp(`(${query})`, 'gi');
    snippet = snippet.replace(regex, '<mark>$1</mark>');
    
    return snippet;
}

function getSectionName(element) {
    let section = element.closest('section');
    if (!section) return 'General';
    
    const sectionId = section.id;
    const sectionTitle = section.querySelector('.section-title');
    
    if (sectionTitle) {
        return sectionTitle.textContent;
    }
    
    return sectionId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function getElementLink(element) {
    const section = element.closest('section');
    if (section && section.id) {
        return `#${section.id}`;
    }
    return '#home';
}

function displayResults(results, query) {
    if (results.length === 0) {
        searchResultsBody.innerHTML = `
            <div class="search-no-results">
                <strong>No results found</strong>
                <p style="font-size: 0.8125rem; margin-top: 0.5rem;">Try searching with different keywords</p>
            </div>
        `;
        searchResultsContainer.classList.add('active');
        return;
    }
    
    // Limit results to top 10 for better UX
    const limitedResults = results.slice(0, 10);
    
    let html = `<div style="font-size: 0.75rem; color: var(--text-light); padding: 0.5rem; border-bottom: 1px solid var(--border-color); margin-bottom: 0.5rem;">Found ${results.length} result${results.length > 1 ? 's' : ''}${results.length > 10 ? ' (showing top 10)' : ''}</div>`;
    
    limitedResults.forEach(result => {
        html += `
            <div class="search-result-item" data-link="${result.link}">
                <div class="search-result-title">${highlightText(result.title, query)}</div>
                <div class="search-result-snippet">${result.snippet}</div>
                <div style="font-size: 0.7rem; color: var(--text-light); margin-top: 0.375rem;">${result.section}</div>
            </div>
        `;
    });
    
    searchResultsBody.innerHTML = html;
    searchResultsContainer.classList.add('active');
    
    // Add click handlers to result items
    document.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const link = item.getAttribute('data-link');
            if (link) {
                const target = document.querySelector(link);
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    searchBox.classList.remove('active');
                    searchResultsContainer.classList.remove('active');
                    searchInput.value = '';
                }
            }
        });
    });
}

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchBox.classList.add('active');
        searchInput.focus();
    }
    
    // Escape to close search
    if (e.key === 'Escape') {
        if (searchBox.classList.contains('active')) {
            searchBox.classList.remove('active');
            searchResultsContainer.classList.remove('active');
            searchInput.value = '';
        }
    }
});

// Typing Animation
const typingText = document.getElementById('typing-text');
const technicalSkills = [
    'Java & Microservices',
    'Cloud-Native Architecture',
    'Enterprise Systems',
    'Full-Stack Development',
    'Oracle Commerce (ATG)',
    'Spring Framework',
    'ReactJS & Node.js',
    'Docker & Kubernetes',
    'AI & Machine Learning',
    'Generative AI',
    'Distributed Systems',
    'E-commerce Platforms'
];

let currentSkillIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseTime = 2000;

function typeText() {
    if (!typingText) return;
    
    const currentSkill = technicalSkills[currentSkillIndex];
    
    if (isDeleting) {
        // Delete characters
        typingText.textContent = currentSkill.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = deletingSpeed;
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentSkillIndex = (currentSkillIndex + 1) % technicalSkills.length;
            typingSpeed = 100;
        }
    } else {
        // Type characters
        typingText.textContent = currentSkill.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
        
        if (currentCharIndex === currentSkill.length) {
            isDeleting = true;
            typingSpeed = pauseTime;
        }
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation when page loads
if (typingText) {
    setTimeout(() => {
        typeText();
    }, 1000);
}

// Animated Statistics Counter
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, statsObserverOptions);

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 18 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 18 ? '+' : '');
        }
    }, 30);
}

// Scroll Progress Indicator (throttled)
const scrollProgress = document.getElementById('scroll-progress');
let progressTicking = false;

function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
    progressTicking = false;
}

window.addEventListener('scroll', () => {
    if (!progressTicking) {
        window.requestAnimationFrame(updateScrollProgress);
        progressTicking = true;
    }
}, { passive: true });

// Back to Top Button (throttled)
const backToTop = document.getElementById('back-to-top');
let backToTopTicking = false;

function updateBackToTop() {
    if (window.pageYOffset > 300) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
    backToTopTicking = false;
}

window.addEventListener('scroll', () => {
    if (!backToTopTicking) {
        window.requestAnimationFrame(updateBackToTop);
        backToTopTicking = true;
    }
}, { passive: true });

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Modal Functionality
const contactModal = document.getElementById('contact-modal');
const contactMeBtn = document.getElementById('contact-me-btn');
const modalClose = document.getElementById('modal-close');
const cancelBtn = document.getElementById('cancel-btn');
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const submitBtn = document.getElementById('submit-btn');

// Email API Configuration
const EMAIL_API_URL = 'http://localhost:6080/service/v1/email/send';
const EMAIL_API_AUTH = '••••••'; // TODO: Replace with actual authorization token
const EMAIL_CLIENT_ID = '1c6eccc7-2049-4286-87ed-016c54fa114b';
const EMAIL_GROUP_NAME = 'default';
const EMAIL_TO = ['aneesh1985@gmail.com'];
const EMAIL_FROM_NAME = 'Aneeshkumar';

// Open modal
if (contactMeBtn) {
    contactMeBtn.addEventListener('click', () => {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close modal functions
function closeModal() {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
    // Reset form after animation
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        successMessage.style.display = 'none';
        submitBtn.disabled = false;
    }, 300);
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
        closeModal();
    }
});

// Form submission handler
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const fromName = formData.get('fromName');
        const fromEmail = formData.get('fromEmail');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Disable submit button
        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) {
            btnText.textContent = 'Sending...';
        } else {
            submitBtn.textContent = 'Sending...';
        }
        
        try {
            // Escape HTML in message to prevent XSS
            const escapeHtml = (text) => {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            };
            
            // Prepare email payload matching the curl command structure exactly
            const emailPayload = {
                header: {
                    clientId: EMAIL_CLIENT_ID,
                    groupName: EMAIL_GROUP_NAME
                },
                fromName: EMAIL_FROM_NAME,
                to: EMAIL_TO,
                cc: [],
                bcc: [],
                subject: subject,
                plainText: `Contact Form Message\n\nFrom: ${fromName} (${fromEmail})\nSubject: ${subject}\n\nMessage:\n${message}`,
                htmlContent: `<h3>New Contact Form Message</h3><p><strong>From:</strong> ${escapeHtml(fromName)} (${escapeHtml(fromEmail)})</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><hr><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`
            };
            
            console.log('Sending email request:', {
                url: EMAIL_API_URL,
                payload: emailPayload
            });
            
            // Send email using fetch API
            const response = await fetch(EMAIL_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': EMAIL_API_AUTH
                },
                body: JSON.stringify(emailPayload),
                mode: 'cors' // Explicitly set CORS mode
            });
            
            // Check if response is ok
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', {
                    status: response.status,
                    statusText: response.statusText,
                    body: errorText
                });
                throw new Error(`Email send failed: ${response.status} ${response.statusText}. ${errorText}`);
            }
            
            // Try to parse JSON response
            let responseData;
            try {
                responseData = await response.json();
                console.log('Email sent successfully:', responseData);
            } catch (e) {
                // If response is not JSON, that's okay
                console.log('Email sent successfully (no JSON response)');
            }
            
            // Show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Auto-close modal after 3 seconds
            setTimeout(() => {
                closeModal();
            }, 3000);
            
        } catch (error) {
            console.error('Error sending email:', error);
            
            // Show user-friendly error message
            let errorMessage = 'Sorry, there was an error sending your message. ';
            
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                errorMessage += 'Please check your connection and ensure the email service is running.';
            } else if (error.message.includes('401') || error.message.includes('403')) {
                errorMessage += 'Authentication failed. Please contact the administrator.';
            } else if (error.message.includes('CORS')) {
                errorMessage += 'CORS error. Please ensure the email service allows requests from this origin.';
            } else {
                errorMessage += 'Please try again later or contact me directly at aneesh1985@gmail.com';
            }
            
            alert(errorMessage);
            
            // Reset button state
            submitBtn.disabled = false;
            const btnText = submitBtn.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = 'Send Message';
            } else {
                submitBtn.textContent = 'Send Message';
            }
        }
    });
}

// Tech Skills Rotation Animation
function initTechSkillsRotation() {
    const techSkills = document.querySelectorAll('.tech-skill');
    
    techSkills.forEach((skillElement, index) => {
        const skillsData = skillElement.getAttribute('data-skills');
        if (!skillsData) return;
        
        try {
            const skills = JSON.parse(skillsData);
            const badge = skillElement.querySelector('.tech-badge');
            if (!badge || skills.length === 0) return;
            
            let currentIndex = 0;
            
            // Rotate skills every 2 seconds
            setInterval(() => {
                currentIndex = (currentIndex + 1) % skills.length;
                
                // Fade out
                badge.style.opacity = '0';
                badge.style.transform = 'translateY(10px) scale(0.9)';
                
                setTimeout(() => {
                    // Update text
                    badge.textContent = skills[currentIndex];
                    
                    // Fade in
                    badge.style.opacity = '1';
                    badge.style.transform = 'translateY(0) scale(1)';
                }, 200);
            }, 2000 + (index * 200)); // Stagger animations slightly
            
        } catch (e) {
            console.error('Error parsing skills data:', e);
        }
    });
}

// Initialize tech skills rotation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTechSkillsRotation);
} else {
    initTechSkillsRotation();
}

// Console welcome message
console.log('%cWelcome to Aneeshkumar Sundareswaran\'s Portfolio', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cStaff Software Engineer | Enterprise Architect', 'color: #64748b; font-size: 12px;');
console.log('%cPress Ctrl+K (or Cmd+K) to search', 'color: #64748b; font-size: 11px;');


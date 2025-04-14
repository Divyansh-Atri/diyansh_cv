// Wait for the loading screen to finish
window.addEventListener('load', function() {
    // Hide loading screen
    setTimeout(function() {
        document.querySelector('.loading-screen').classList.add('hidden');
    }, 1000);
    
    // Initialize the website after loading
    initWebsite();
});
document.addEventListener('click', function(event) {
    console.log(`Clicked element: ${event.target} with time ${new Date()}`);
});

document.addEventListener('mouseover', function(event) {
    console.log(`View element: ${event.target} with time ${new Date()}`);
});



function initWebsite() {
    // Handle scroll animations
    handleScrollAnimations();
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Set up dark mode toggle
    setupDarkMode();
    
    // Set up scroll indicator
    setupScrollIndicator();
    
    // Initialize skill progress bars
    initSkillBars();
    
    // Set up gallery modal
    setupGalleryModal();
    
    // Set up back to top button
    setupBackToTop();
    
    // Handle sticky navigation
    handleStickyNav();
}

// Handle scroll animations for fade-in elements
function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    // Check all fade elements on scroll
    function checkFadeElements() {
        fadeElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check on page load
    checkFadeElements();
    
    // Check on scroll
    window.addEventListener('scroll', checkFadeElements);
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for fixed nav
                behavior: 'smooth'
            });
        });
    });
}

// Handle active class for navigation items when scrolling
function handleStickyNav() {
    const nav = document.getElementById('mainNav');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Initial check on page load
    checkActiveSection();
    
    window.addEventListener('scroll', function() {
        // Add scrolled class to navigation with animation effect
        if (window.pageYOffset > 100) {
            if (!nav.classList.contains('scrolled')) {
                nav.classList.add('scrolled');
                // Add slick animation effect to the nav items when scrolled
                navLinks.forEach((link, index) => {
                    link.style.transitionDelay = (index * 0.05) + 's';
                    link.classList.add('scrolled-item');
                });
            }
        } else {
            nav.classList.remove('scrolled');
            navLinks.forEach((link) => {
                link.style.transitionDelay = '0s';
                link.classList.remove('scrolled-item');
            });
        }
        
        // Check active section on scroll
        checkActiveSection();
    });
    
    // Function to check which section is active
    function checkActiveSection() {
        // Set active class on current section's nav link
        let currentSection = '';
        let passedSections = 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
                passedSections++;
            }
        });
        
        // Remove active class from all links first
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current link
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
                
                // Add highlight effect (temporarily add a class to create a flash effect)
                link.classList.add('highlight-flash');
                setTimeout(() => {
                    link.classList.remove('highlight-flash');
                }, 700);
            }
        });
    }
}

// Dark mode toggle setup
function setupDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply initial theme
    applyTheme(savedTheme);
    
    // Listen for toggle changes
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    function applyTheme(theme) {
        // Update data attribute
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update checkbox state
        themeToggle.checked = theme === 'dark';
        
        // Update body class
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(`${theme}-theme`);
        
        // Store preference
        localStorage.setItem('theme', theme);
        
        // Update meta theme-color
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', 
            theme === 'dark' ? '#1a1f25' : '#ffffff');
    }
}

// Initialize dark mode when DOM is loaded
document.addEventListener('DOMContentLoaded', setupDarkMode);

// Scroll down indicator setup
function setupScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollDown');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: document.getElementById('about').offsetTop - 70,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize skill progress bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Animate the skill bars when they come into view
    function checkSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
                bar.classList.add('animated');
            }
        });
    }
    
    // Initial check
    checkSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', checkSkillBars);
}

// Set up gallery modal
function setupGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close-modal');
    
    // Open modal when gallery item is clicked
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgCaption = this.querySelector('p').textContent;
            
            modal.style.display = 'flex';
            modalImg.src = imgSrc;
            modalCaption.textContent = imgCaption;
            
            // Disable scrolling on body
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when 'x' is clicked
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Set up back to top button
function setupBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'inline-block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
}

// Text Analysis Functions
function analyzeText() {
    const text = document.getElementById('textInput').value;
    
    // Basic Statistics
    const stats = getBasicStats(text);
    displayBasicStats(stats);

    // Pronouns Analysis
    const pronounCounts = countPronouns(text);
    displayPronounStats(pronounCounts);

    // Prepositions Analysis
    const prepositionCounts = countPrepositions(text);
    displayPrepositionStats(prepositionCounts);

    // Articles Analysis
    const articleCounts = countArticles(text);
    displayArticleStats(articleCounts);
}

function getBasicStats(text) {
    return {
        letters: (text.match(/[a-zA-Z]/g) || []).length,
        words: text.trim().split(/\s+/).length,
        spaces: (text.match(/\s/g) || []).length,
        newlines: (text.match(/\n/g) || []).length,
        specialSymbols: (text.match(/[^a-zA-Z0-9\s]/g) || []).length
    };
}

function countPronouns(text) {
    const pronouns = {
        personal: ['i', 'me', 'my', 'mine', 'you', 'your', 'yours', 'he', 'him', 'his', 'she', 'her', 'hers', 'it', 'its', 'we', 'us', 'our', 'ours', 'they', 'them', 'their', 'theirs'],
        relative: ['who', 'whom', 'whose', 'which', 'that'],
        demonstrative: ['this', 'that', 'these', 'those'],
        reflexive: ['myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'yourselves', 'themselves']
    };

    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const counts = {};

    for (const type in pronouns) {
        pronouns[type].forEach(pronoun => {
            const count = words.filter(word => word === pronoun).length;
            if (count > 0) {
                counts[pronoun] = count;
            }
        });
    }

    return counts;
}

function countPrepositions(text) {
    const prepositions = ['about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by', 'down', 'during', 'except', 'for', 'from', 'in', 'inside', 'into', 'near', 'of', 'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 'through', 'throughout', 'to', 'toward', 'under', 'underneath', 'until', 'up', 'upon', 'with', 'within', 'without'];
    
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const counts = {};

    prepositions.forEach(prep => {
        const count = words.filter(word => word === prep).length;
        if (count > 0) {
            counts[prep] = count;
        }
    });

    return counts;
}

function countArticles(text) {
    const articles = ['a', 'an', 'the'];
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const counts = {};

    articles.forEach(article => {
        counts[article] = words.filter(word => word === article).length;
    });

    return counts;
}

function displayBasicStats(stats) {
    document.getElementById('basicStats').innerHTML = `
        <h3>📊 Basic Statistics</h3>
        <ul>
            <li>Letters <span class="stat-value">${stats.letters}</span></li>
            <li>Words <span class="stat-value">${stats.words}</span></li>
            <li>Spaces <span class="stat-value">${stats.spaces}</span></li>
            <li>Newlines <span class="stat-value">${stats.newlines}</span></li>
            <li>Special Symbols <span class="stat-value">${stats.specialSymbols}</span></li>
        </ul>
    `;
}

function displayPronounStats(counts) {
    let html = '<h3>🔤 Pronoun Analysis</h3><ul>';
    for (const [pronoun, count] of Object.entries(counts)) {
        html += `<li>${pronoun} <span class="stat-value">${count}</span></li>`;
    }
    html += '</ul>';
    document.getElementById('pronounStats').innerHTML = html;
}

function displayPrepositionStats(counts) {
    let html = '<h3>📝 Preposition Analysis</h3><ul>';
    for (const [prep, count] of Object.entries(counts)) {
        html += `<li>${prep} <span class="stat-value">${count}</span></li>`;
    }
    html += '</ul>';
    document.getElementById('prepositionStats').innerHTML = html;
}

function displayArticleStats(counts) {
    let html = '<h3>📚 Article Analysis</h3><ul>';
    for (const [article, count] of Object.entries(counts)) {
        html += `<li>${article} <span class="stat-value">${count}</span></li>`;
    }
    html += '</ul>';
    document.getElementById('articleStats').innerHTML = html;
}

// Email sending function
function sendEmail(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create mailto URL
    const mailtoLink = `mailto:divyansh.atri@research.iiit.ac.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    const form = document.getElementById('emailForm');
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = 'Email client opened! If nothing happened, please make sure you have an email client configured.';
    form.appendChild(successMsg);
    
    // Reset form
    form.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

// Email Form Handler
function sendDirectEmail(event) {
    event.preventDefault();
    
    // Show loading state
    const submitBtn = document.querySelector('.send-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Get form data
    const templateParams = {
        from_name: document.getElementById('senderName').value,
        from_email: document.getElementById('senderEmail').value,
        subject: document.getElementById('emailSubject').value,
        message: document.getElementById('emailMessage').value,
        to_name: 'Divyansh Atri',
        reply_to: document.getElementById('senderEmail').value
    };

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            showEmailAlert('Message sent successfully!', 'success');
            document.getElementById('directEmailForm').reset();
        }, function(error) {
            showEmailAlert('Failed to send message. Please try again.', 'error');
        })
        .finally(() => {
            // Restore button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
}

function showEmailAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.email-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create new alert
    const alert = document.createElement('div');
    alert.className = `email-alert email-alert-${type}`;
    alert.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;

    // Insert alert before the form
    const form = document.getElementById('directEmailForm');
    form.parentNode.insertBefore(alert, form);

    // Remove alert after 5 seconds
    setTimeout(() => alert.remove(), 5000);
}

// Ensure the styles for alerts are included in your CSS file or inline in your HTML.
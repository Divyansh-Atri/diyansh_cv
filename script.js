// Wait for the loading screen to finish
window.addEventListener('load', function() {
    // Hide loading screen
    setTimeout(function() {
        document.querySelector('.loading-screen').classList.add('hidden');
    }, 1000);
    
    // Initialize the website after loading
    initWebsite();
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
    const toggleButton = document.querySelector('#theme-toggle');
    const toggleText = document.querySelector('.toggle-text');
    const currentTheme = localStorage.getItem('theme');
    
    // Check if a theme preference exists in local storage
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            toggleText.textContent = 'Dark Mode';
        }
    }
    
    // Handle toggle button click
    toggleButton.addEventListener('click', function() {
        if (document.body.classList.contains('dark-theme')) {
            // Switch to light mode
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            toggleText.textContent = 'Light Mode';
        } else {
            // Switch to dark mode
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            toggleText.textContent = 'Dark Mode';
        }
        
        // Add transition animation for smooth theme change
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    });
}

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
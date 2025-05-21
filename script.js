document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Initialize highlight on page load
    highlightNavLink();

    // Theme Toggle Functionality
    const themeToggleButton = document.getElementById('theme-toggle');
    const bodyElement = document.body;
    const themeIcon = themeToggleButton ? themeToggleButton.querySelector('i') : null; // Get the icon element

    const updateThemeIcon = (theme) => {
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }
    };

    // Load saved theme from localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        bodyElement.classList.add('dark-mode');
        updateThemeIcon('dark');
    } else {
        bodyElement.classList.remove('dark-mode'); // Default to light
        updateThemeIcon('light');
    }

    // Add event listener for theme toggle button
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            bodyElement.classList.toggle('dark-mode');
            let newTheme = 'light';
            if (bodyElement.classList.contains('dark-mode')) {
                newTheme = 'dark';
            }
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
});
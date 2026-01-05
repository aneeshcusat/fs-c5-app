// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Calculate header and nav heights and set navigation positions
    function setNavigationPosition() {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        const sidebar = document.querySelector('.sidebar');
        
        if (header && nav) {
            const headerHeight = header.offsetHeight;
            const navHeight = nav.offsetHeight;
            
            // Set CSS variables
            document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
            document.documentElement.style.setProperty('--nav-height', navHeight + 'px');
            
            // Set nav top position (sticky below header)
            nav.style.top = headerHeight + 'px';
            
            // Update sidebar position (below header + nav)
            if (sidebar) {
                const totalTopHeight = headerHeight + navHeight;
                sidebar.style.top = totalTopHeight + 'px';
                sidebar.style.height = `calc(100vh - ${totalTopHeight}px)`;
            }
        }
    }
    
    // Set initial position
    setNavigationPosition();
    
    // Update on window resize
    window.addEventListener('resize', setNavigationPosition);
    
    // Update after content loads (in case header height changes)
    setTimeout(setNavigationPosition, 100);
    setTimeout(setNavigationPosition, 500);
    
    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Update sidebar active state
    document.querySelectorAll('.sidebar a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Update top nav active state
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage && currentPage.includes(linkPage.replace('#', ''))) {
            link.classList.add('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const header = document.querySelector('header');
                    const nav = document.querySelector('nav');
                    const headerHeight = header ? header.offsetHeight : 110;
                    const navHeight = nav ? nav.offsetHeight : 60;
                    const offset = headerHeight + navHeight + 20; // Account for header, nav, and padding
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Highlight current section in navigation
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        const headerHeight = header ? header.offsetHeight : 110;
        const navHeight = nav ? nav.offsetHeight : 60;
        const offset = headerHeight + navHeight + 100;
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - offset) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});


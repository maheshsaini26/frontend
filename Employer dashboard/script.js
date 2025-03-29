document.addEventListener("DOMContentLoaded", function () {
    // Initialize AOS animations
    AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger: 'hover'
        });
    });

    // Mobile sidebar toggle
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('[data-bs-toggle="collapse"][data-bs-target="#sidebarMenu"]');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const overlay = document.querySelector('.overlay');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    function toggleSidebar() {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('show') ? 'hidden' : '';
    }

    // Initialize sidebar toggle if the element exists
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSidebar();
            
            // Close navbar if open
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    }

    // Handle overlay click
    if (overlay) {
        overlay.addEventListener('click', function() {
            if (sidebar.classList.contains('show')) {
                toggleSidebar();
            }
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Close sidebar/navbar when clicking on a link (for mobile)
    document.querySelectorAll('.sidebar a, .navbar-collapse a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                if (sidebar.classList.contains('show')) {
                    toggleSidebar();
                }
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Theme toggler with localStorage support
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.classList.remove('btn-outline-secondary');
        themeToggle.classList.add('btn-outline-warning');
        // Set toggler icon for dark mode
        const toggler = document.querySelector('.navbar-toggler-icon');
        if (toggler) {
            toggler.style.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")";
        }
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const toggler = document.querySelector('.navbar-toggler-icon');
        
        if (document.body.classList.contains('dark-mode')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            this.classList.remove('btn-outline-secondary');
            this.classList.add('btn-outline-warning');
            localStorage.setItem('darkMode', 'enabled');
            // Set toggler icon for dark mode
            if (toggler) {
                toggler.style.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")";
            }
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            this.classList.remove('btn-outline-warning');
            this.classList.add('btn-outline-secondary');
            localStorage.setItem('darkMode', 'disabled');
            // Reset toggler icon for light mode
            if (toggler) {
                toggler.style.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")";
            }
        }
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        updateNavbarGlassEffect();
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.classList.add('show');
            this.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
            this.querySelector('.dropdown-menu').classList.add('show');
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.classList.remove('show');
            this.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
            this.querySelector('.dropdown-menu').classList.remove('show');
        });
    });

    // Ripple effect for buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Only add ripple if not the theme toggle button
            if (!this.id === 'themeToggle') {
                const x = e.clientX - e.target.getBoundingClientRect().left;
                const y = e.clientY - e.target.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });

    // Dynamic Table Row Click Handling with animation
    const jobListingsTable = document.querySelector(".table-responsive tbody");
    if (jobListingsTable) {
        jobListingsTable.addEventListener("click", function (event) {
            let row = event.target.closest("tr");
            if (row && !event.target.matches('button')) {
                // Add animation class
                row.classList.add('table-active');
                setTimeout(() => {
                    row.classList.remove('table-active');
                    alert(`You clicked on job: ${row.cells[0].innerText}`);
                }, 300);
            }
        });
    }

    // Button hover effects
    document.querySelectorAll('.btn, .card, .list-group-item').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Form input focus effects
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Add glass effect to navbar in dark mode
    function updateNavbarGlassEffect() {
        const navbar = document.querySelector('.navbar');
        if (document.body.classList.contains('dark-mode')) {
            navbar.classList.add('glass-effect');
        } else {
            navbar.classList.remove('glass-effect');
        }
    }

    // Initialize navbar glass effect
    updateNavbarGlassEffect();
    
    // Update navbar glass effect when theme changes
    themeToggle.addEventListener('click', updateNavbarGlassEffect);

    // Add 3D effect to dashboard cards
    document.querySelectorAll('.dashboard-cards .card').forEach(card => {
        card.classList.add('btn-3d');
    });

    // Add pulse glow effect to important buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('Connect') || btn.textContent.includes('New Job')) {
            btn.classList.add('pulse-glow');
        }
    });

    // Global Functions for Onclick Events with animations
    window.viewJob = function() {
        const btn = event.target;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-eye me-1"></i> View';
            alert("Job details viewed!");
        }, 800);
    };

    window.renewJob = function() {
        const btn = event.target;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-sync-alt me-1"></i> Renew';
            alert("Job renewed successfully!");
        }, 1000);
    };

    window.connectCandidate = function(candidateName) {
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Connecting...';
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check me-1"></i> Connected';
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-success');
            alert(`Connecting with candidate: ${candidateName}`);
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('btn-success');
                btn.classList.add('btn-primary');
            }, 2000);
        }, 1200);
    };

    // Add favicon
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = "favicon.ico";
    document.head.appendChild(favicon);
    
    // Create floating action button
    const fab = document.createElement('button');
    fab.className = 'fab hover-scale pulse-glow';
    fab.innerHTML = '<i class="fas fa-plus"></i>';
    fab.setAttribute('title', 'Create New Job');
    fab.addEventListener('click', function() {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
            alert('Create new job clicked!');
        }, 600);
    });
    document.body.appendChild(fab);

    // Add hover-grow effect to dashboard cards
    document.querySelectorAll('.dashboard-cards .card').forEach(card => {
        card.classList.add('hover-grow');
    });

    // Add hover-rotate effect to profile image
    const profileImg = document.querySelector('.sidebar img.rounded-circle');
    if (profileImg) {
        profileImg.classList.add('hover-rotate');
    }

    // Mobile viewport height fix
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
});
document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const menuContainer = document.querySelector('.menu-container');
    const body = document.body;
    
    if (hamburger && menuContainer) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.classList.toggle('active');
            menuContainer.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Toggle body scroll
            if (menuContainer.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.menu a, .auth-buttons a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                menuContainer.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            });
        });
    }
  
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (menuContainer && menuContainer.classList.contains('active')) {
            if (!event.target.closest('.navbar') && !event.target.closest('.menu-container')) {
                hamburger.classList.remove('active');
                menuContainer.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }
        }
    });

    // Enhanced FAQ functionality
    document.querySelectorAll(".faq-question").forEach((item) => {
        item.addEventListener("click", () => {
            const answer = item.nextElementSibling;
            const isOpen = answer.style.display === "block";
            
            // Close all other FAQs
            document.querySelectorAll(".faq-answer").forEach(el => {
                if (el !== answer) {
                    el.style.display = "none";
                    el.previousElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            answer.style.display = isOpen ? "none" : "block";
            item.classList.toggle('active', !isOpen);
            
            // Smooth scroll to keep FAQ in view
            if (!isOpen) {
                answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
  
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.animate__animated');
    animateElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
        }, 100 * index);
    });
  
    // Enhanced scrolling behavior
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (menuContainer && menuContainer.classList.contains('active')) return;
        
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll down
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.boxShadow = 'none';
        } else if (currentScroll < lastScroll) {
            // Scroll up
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
  
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Initialize jobs fetch if container exists
    if (document.getElementById('jobs-container')) {
        fetchJobs();
    }

    // Enhanced video card interactions
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const video = card.querySelector('video');
            if (video) {
                video.play().catch(e => console.log("Autoplay prevented:", e));
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const video = card.querySelector('video');
            if (video) {
                video.pause();
            }
        });
    });
    
    // Enhanced job card interactions
    document.querySelectorAll('.job-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.apply-button')) {
                // Navigate to job details if not clicking the apply button
                window.location.href = 'jobs.html';
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            
            // Here you would typically send the email to your server
            console.log("Subscribed email:", email);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'newsletter-success';
            successMsg.textContent = 'Thank you for subscribing!';
            this.parentNode.insertBefore(successMsg, this.nextSibling);
            
            // Reset form
            this.reset();
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        });
    }
    
    // Enhanced hover effects for buttons
    document.querySelectorAll('button, .apply-button, .search-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 7px 14px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
    });

    // Initialize counters when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.5});
    
    document.querySelectorAll('.hero-stats').forEach(el => {
        observer.observe(el);
    });

    // Initialize testimonial slider adjustments
    adjustTestimonialCards();
});

// Enhanced fetch jobs functionality
function fetchJobs() {
    fetch('http://localhost:5000/jobs')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const jobsContainer = document.getElementById('jobs-container');
            if (jobsContainer) {
                jobsContainer.innerHTML = "";
                data.forEach((job, index) => {
                    const jobElement = document.createElement('div');
                    jobElement.classList.add('job');
                    jobElement.style.animationDelay = `${index * 0.1}s`;
                    jobElement.innerHTML = `
                        <h2>${job.title}</h2>
                        <p>${job.description}</p>
                        <p><strong>${job.company}</strong> - ${job.location}</p>
                        <p>Salary: ${job.salary}</p>
                    `;
                    jobsContainer.appendChild(jobElement);
                });
            }
        })
        .catch(err => {
            console.error('Error fetching jobs:', err);
            const jobsContainer = document.getElementById('jobs-container');
            if (jobsContainer) {
                jobsContainer.innerHTML = `<p class="error">Failed to load jobs. Please try again later.</p>`;
            }
        });
}

// Handle window resize for menu and testimonials
window.addEventListener('resize', function() {
    const menuContainer = document.querySelector('.menu-container');
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;
    
    if (window.innerWidth > 1024) {
        if (menuContainer && menuContainer.classList.contains('active')) {
            menuContainer.classList.remove('active');
        }
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
        }
        body.style.overflow = '';
        body.classList.remove('menu-open');
    }
    
    adjustTestimonialCards();
});

// Animated counter for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target + '+';
        }
    });
}

// Enhanced FAQ functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(el => {
            if (el !== item) {
                el.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active', !isActive);
        
        // Smooth scroll to keep FAQ in view
        if (!isActive) {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});

// Video hover effects
document.querySelectorAll('.video-wrapper').forEach(video => {
    video.addEventListener('mouseenter', () => {
        const playButton = video.querySelector('.play-overlay');
        playButton.style.opacity = '1';
    });
    
    video.addEventListener('mouseleave', () => {
        const playButton = video.querySelector('.play-overlay');
        playButton.style.opacity = '0';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Adjust testimonial cards based on screen size
function adjustTestimonialCards() {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (!testimonialsSlider) return;

    const containerWidth = testimonialsSlider.offsetWidth;
    const cards = document.querySelectorAll('.testimonial-card');
    
    cards.forEach(card => {
        if (window.innerWidth < 768) {
            card.style.minWidth = `${containerWidth - 40}px`;
        } else if (window.innerWidth < 1024) {
            card.style.minWidth = `${containerWidth / 2 - 30}px`;
        } else {
            card.style.minWidth = '350px';
        }
    });
}
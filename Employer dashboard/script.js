// Toggle mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navCenter = document.getElementById('nav-center');
    const navRight = document.getElementById('nav-right');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navCenter.classList.toggle('active');
            navRight.classList.toggle('active');
        });
    }
    
    // Sidebar buttons click event
    const sidebarButtons = document.querySelectorAll('.sidebar button');
    sidebarButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            sidebarButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Responsive dropdown for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            const content = dropdown.querySelector('.dropdown-content');
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }
});

// Job functions
function viewJob() {
    alert("Viewing job details");
}

function renewJob() {
    alert("Renewing job listing");
}

function connectCandidate(name) {
    alert("Connecting with " + name);
}
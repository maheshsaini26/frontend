document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const menuContainer = document.querySelector('.menu-container');
    
    if (hamburger && menuContainer) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            menuContainer.classList.toggle('active');
        });
    }

    // Initialize CAPTCHA on page load
    initializeCAPTCHA();

    // Form submission event listener
    const registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.addEventListener("submit", handleFormSubmission);
    }

    // Add real-time validation to input fields
    addRealTimeValidation();

    // Add input animations
    addInputAnimations();
});

// CAPTCHA Generation Function
function initializeCAPTCHA() {
    const captchaElement = document.getElementById("captchaText");
    if (captchaElement) {
        captchaElement.textContent = generateCAPTCHA();
        
        // Refresh CAPTCHA on click
        captchaElement.addEventListener('click', function() {
            this.textContent = generateCAPTCHA();
            this.style.animation = "shake 0.5s";
            setTimeout(() => this.style.animation = "", 500);
        });
    }
}

// Generate CAPTCHA with math problem
function generateCAPTCHA() {
    const operators = ['+', '-', '*'];
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let mathAnswer;
    switch(operator) {
        case '+':
            mathAnswer = num1 + num2;
            break;
        case '-':
            mathAnswer = num1 - num2;
            break;
        case '*':
            mathAnswer = num1 * num2;
            break;
    }

    window.mathAnswer = mathAnswer;
    return `${num1} ${operator} ${num2} = ?`;
}

// Form Submission Handler
function handleFormSubmission(event) {
    event.preventDefault();
    const form = event.target;

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    // Validate form step by step
    setTimeout(() => {
        // Password validation
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;
        if (!validatePasswords(password, confirmPassword)) {
            resetSubmitButton(submitBtn, originalBtnText);
            return;
        }

        // CAPTCHA validation
        if (!validateCAPTCHA()) {
            resetSubmitButton(submitBtn, originalBtnText);
            return;
        }

        // Basic form validation
        if (!validateRequiredFields()) {
            resetSubmitButton(submitBtn, originalBtnText);
            return;
        }

        // Email validation
        const emailInput = document.getElementById("email");
        if (!validateEmail(emailInput.value)) {
            resetSubmitButton(submitBtn, originalBtnText);
            return;
        }

        // Phone number validation
        const phoneInput = document.getElementById("phone");
        if (!validatePhoneNumber(phoneInput.value)) {
            resetSubmitButton(submitBtn, originalBtnText);
            return;
        }

        // If all validations pass, proceed with registration
        handleSuccessfulRegistration(form, submitBtn, originalBtnText);
    }, 800);
}

function resetSubmitButton(btn, originalText) {
    btn.innerHTML = originalText;
    btn.disabled = false;
}

// Password Validation
function validatePasswords(password, confirmPassword) {
    if (password !== confirmPassword) {
        showAlert("Passwords do not match!", "error");
        return false;
    }

    if (password.length < 8) {
        showAlert("Password must be at least 8 characters long!", "error");
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        showAlert("Password must contain at least one uppercase letter!", "error");
        return false;
    }

    if (!/[0-9]/.test(password)) {
        showAlert("Password must contain at least one number!", "error");
        return false;
    }

    return true;
}

// CAPTCHA Validation
function validateCAPTCHA() {
    const userCaptcha = document.getElementById("captcha").value;
    if (parseInt(userCaptcha) !== window.mathAnswer) {
        showAlert("Incorrect math answer! Please try again.", "error");
        document.getElementById("captchaText").textContent = generateCAPTCHA();
        return false;
    }
    return true;
}

// Required Fields Validation
function validateRequiredFields() {
    const requiredFields = document.querySelectorAll('#registrationForm [required]');
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            showAlert(`Please fill in the ${field.name.replace('_', ' ')} field.`, "error");
            field.focus();
            field.classList.add('input-error');
            setTimeout(() => field.classList.remove('input-error'), 2000);
            return false;
        }
    }
    return true;
}

// Email Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert("Please enter a valid email address.", "error");
        return false;
    }
    return true;
}

// Phone Number Validation
function validatePhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        showAlert("Please enter a valid 10-digit phone number.", "error");
        return false;
    }
    return true;
}

// Handle Successful Registration
function handleSuccessfulRegistration(form, submitBtn, originalBtnText) {
    // Simulate API call
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
        showAlert("Employer registered successfully! Redirecting to login...", "success");
        
        // Reset form and button after success
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            window.location.href = "employerlogin.html";
        }, 1500);
    }, 1000);
}

// Show Alert Function (custom alert)
function showAlert(message, type = "info") {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) existingAlert.remove();

    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button class="close-alert">&times;</button>
    `;
    
    // Add to body
    document.body.appendChild(alert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        alert.classList.add('fade-out');
        setTimeout(() => alert.remove(), 300);
    }, 5000);
    
    // Close button event
    alert.querySelector('.close-alert').addEventListener('click', () => {
        alert.classList.add('fade-out');
        setTimeout(() => alert.remove(), 300);
    });
}

// Real-time Input Validation
function addRealTimeValidation() {
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.classList.add('input-error');
            } else {
                this.classList.remove('input-error');
            }
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 10);
        });
        
        phoneInput.addEventListener('blur', function() {
            if (this.value && !validatePhoneNumber(this.value)) {
                this.classList.add('input-error');
            } else {
                this.classList.remove('input-error');
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            if (this.value.length > 0 && this.value.length < 8) {
                this.classList.add('input-error');
            } else {
                this.classList.remove('input-error');
            }
        });
    }

    if (passwordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if (passwordInput.value !== this.value) {
                this.classList.add('input-error');
            } else {
                this.classList.remove('input-error');
            }
        });
    }
}

// Add input animations
function addInputAnimations() {
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// Add this to your existing script.js
window.addEventListener('resize', function() {
    const menuContainer = document.querySelector('.menu-container');
    const hamburger = document.querySelector('.hamburger');
    
    // Close mobile menu when resizing to desktop
    if (window.innerWidth > 1064) {
        if (menuContainer.classList.contains('active')) {
            menuContainer.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});
// ===== FORM HANDLERS =====
function safeAddEventListener(elementId, event, handler) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener(event, handler);
    }
}

// Edit Profile Form Handler (unchanged apart from being initialized centrally)
function initEditProfileForm() {
    const registrationForm = document.getElementById('registrationForm');
    if (!registrationForm) return;

    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');

    // Form submission handler
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullName = fullNameInput?.value.trim() || '';
        const email = emailInput?.value.trim() || '';

        // Validate form
        if (!fullName) {
            alert('Please enter your full name');
            fullNameInput?.focus();
            return;
        }

        if (!email) {
            alert('Please enter your email');
            emailInput?.focus();
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            emailInput?.focus();
            return;
        }

        // Success message
        alert('Profile updated successfully!');
        console.log('Profile Data:', { fullName, email });
    });

    // Real-time email validation feedback
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#dc3545';
                this.style.backgroundColor = '#fff5f5';
            } else {
                this.style.borderColor = '#e0e0e0';
                this.style.backgroundColor = '#fafafa';
            }
        });

        emailInput.addEventListener('input', function() {
            this.style.borderColor = '#e0e0e0';
            this.style.backgroundColor = '#fafafa';
        });
    }
}

// Change Password Form Handler (fixed)
function initPasswordForm() {
    const passwordForm = document.getElementById('passwordForm');
    if (!passwordForm) return;

    const currentPasswordInput = document.getElementById('currentPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const clearBtn = document.getElementById('clearBtn');
    const createBtn = document.getElementById('createBtn');

    // Helper function to highlight error fields
    function highlightError(input) {
        if (!input) return;

        input.style.borderColor = '#dc3545';
        input.style.backgroundColor = '#fff5f5';

        input.addEventListener('input', function() {
            this.style.borderColor = '#e0e0e0';
            this.style.backgroundColor = '#fafafa';
        }, { once: true });
    }

    // Make sure clearBtn doesn't act as submit (in case HTML omitted type)
    if (clearBtn) {
        try { clearBtn.type = 'button'; } catch (err) { /* ignore */ }

        clearBtn.addEventListener('click', function(e) {
            // prevent any default (in case type wasn't set in HTML)
            e.preventDefault();

            if (currentPasswordInput) currentPasswordInput.value = '';
            if (newPasswordInput) newPasswordInput.value = '';
            if (confirmPasswordInput) confirmPasswordInput.value = '';

            const inputs = [currentPasswordInput, newPasswordInput, confirmPasswordInput];
            inputs.forEach(input => {
                if (input) {
                    input.style.borderColor = '#e0e0e0';
                    input.style.backgroundColor = '#fafafa';
                }
            });

            console.log('All password form data cleared');
        });
    }

    // If create button exists and wasn't declared as submit in HTML, make it a submit button
    if (createBtn) {
        try { createBtn.type = 'submit'; } catch (err) { /* ignore */ }
    }

    // Form submission handler
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const currentPassword = currentPasswordInput?.value.trim() || '';
        const newPassword = newPasswordInput?.value.trim() || '';
        const confirmPassword = confirmPasswordInput?.value.trim() || '';

        // Validation
        if (!currentPassword) {
            alert('Please enter your current password');
            currentPasswordInput?.focus();
            return;
        }

        if (!newPassword) {
            alert('Please enter a new password');
            newPasswordInput?.focus();
            return;
        }

        if (!confirmPassword) {
            alert('Please confirm your new password');
            confirmPasswordInput?.focus();
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match');
            if (confirmPasswordInput) {
                confirmPasswordInput.focus();
                highlightError(confirmPasswordInput);
            }
            return;
        }

        if (newPassword.length < 6) {
            alert('New password must be at least 6 characters long');
            if (newPasswordInput) {
                newPasswordInput.focus();
                highlightError(newPasswordInput);
            }
            return;
        }

        if (currentPassword === newPassword) {
            alert('New password must be different from current password');
            if (newPasswordInput) {
                newPasswordInput.focus();
                highlightError(newPasswordInput);
            }
            return;
        }

        alert('Password updated successfully!');
        console.log('Password form submitted successfully');

        // Clear inputs using the clear button logic (if present)
        if (clearBtn) clearBtn.click();
    });

    // Real-time password matching validation
    if (confirmPasswordInput && newPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const newPassword = newPasswordInput.value;
            const confirmPassword = this.value;

            if (confirmPassword && newPassword !== confirmPassword) {
                highlightError(this);
            } else {
                this.style.borderColor = '#e0e0e0';
                this.style.backgroundColor = '#fafafa';
            }
        });
    }

    // ENTER key handling: attach to inputs (more reliable)
    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            e.preventDefault();

            // Preferred: requestSubmit (triggers form submit handlers & built-in validation)
            if (typeof passwordForm.requestSubmit === 'function') {
                passwordForm.requestSubmit();
                return;
            }

            // Fallback: click the submit button if it's present and of type submit
            if (createBtn && createBtn.type === 'submit') {
                createBtn.click();
                return;
            }

            // Last resort: dispatch submit event (will call our submit listener)
            passwordForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
    }

    // Attach the keydown handler to each input field in the password form
    [currentPasswordInput, newPasswordInput, confirmPasswordInput].forEach(input => {
        if (input) {
            input.addEventListener('keydown', handleEnterKey);
        }
    });
}

// Initialize both handlers once DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initEditProfileForm();
    initPasswordForm();
});

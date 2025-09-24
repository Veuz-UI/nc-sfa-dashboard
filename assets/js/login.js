  // Form validation
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            
            let isValid = true;
            
            // Reset previous validation states
            email.classList.remove('is-invalid');
            password.classList.remove('is-invalid');
            emailError.classList.remove('show');
            passwordError.classList.remove('show');
            
            // Validate email
            if (!email.value.trim()) {
                email.classList.add('is-invalid');
                emailError.classList.add('show');
                isValid = false;
            }
            
            // Validate password
            if (!password.value.trim()) {
                password.classList.add('is-invalid');
                passwordError.classList.add('show');
                isValid = false;
            }
            
            // If form is valid, you can proceed with login
            if (isValid) {
                alert('Form is valid! Login functionality would be implemented here.');
                // Here you would typically send the data to your server
                console.log('Email:', email.value);
                console.log('Password:', password.value);
            }
        });
        
        // Password visibility toggle
        document.getElementById('passwordToggle').addEventListener('click', function() {
            const password = document.getElementById('password');
            const toggleIcon = document.getElementById('passwordToggle');
            
            if (password.type === 'password') {
                password.type = 'text';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            } else {
                password.type = 'password';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            }
        });
        
        // Clear validation errors on input
        document.getElementById('email').addEventListener('input', function() {
            this.classList.remove('is-invalid');
            document.getElementById('emailError').classList.remove('show');
        });
        
        document.getElementById('password').addEventListener('input', function() {
            this.classList.remove('is-invalid');
            document.getElementById('passwordError').classList.remove('show');
        }); 
        
        // Recover password functionality
        document.getElementById('recoverPassword').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Password recovery functionality would be implemented here.');
        });
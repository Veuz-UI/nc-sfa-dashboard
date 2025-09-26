// ===== MEMBER REGISTRATION =====
function initMemberRegistration() {
    const memberRegistrationForm = document.getElementById('registrationForm');
    if (!memberRegistrationForm) return;

    // Prevent duplicate listener
    if (!memberRegistrationForm.hasAttribute('data-member-registration')) {
        memberRegistrationForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const entries = {};
            formData.forEach((value, key) => {
                if (entries[key]) {
                    if (!Array.isArray(entries[key])) {
                        entries[key] = [entries[key]];
                    }
                    entries[key].push(value);
                } else {
                    entries[key] = value;
                }
            });

            console.log("Member Registration Data:", entries);
            alert("Registration form submitted! Check console for details.");
        });

        // Mark as initialized
        memberRegistrationForm.setAttribute('data-member-registration', 'true');
    }
}

// ===== INTERNATIONAL PHONE INPUT =====
function initPhoneInputs() {
    const phoneInputField = document.querySelector("#phone");
    const guardianInputField = document.querySelector("#guardianNumber");

    let phoneInput, guardianInput;

    const phoneInputConfig = {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        initialCountry: "sa",
        separateDialCode: true,
        nationalMode: false,
        autoHideDialCode: false,
        formatOnDisplay: true,
        autoPlaceholder: "aggressive",
        placeholderNumberType: "MOBILE",
        allowDropdown: true,
        // showFlags is not an official option; flags show by default
        preferredCountries: ["sa", "ae", "kw", "qa", "bh", "om"],
        customPlaceholder: function (selectedCountryPlaceholder) {
            return selectedCountryPlaceholder.replace(/[0-9]/g, "X");
        }
    };

    // Initialize phone input
    if (phoneInputField && window.intlTelInput) {
        phoneInput = window.intlTelInput(phoneInputField, phoneInputConfig);

        phoneInputField.addEventListener('blur', function () {
            if (phoneInput.isValidNumber()) {
                this.classList.remove('error');
                this.classList.add('valid');
            } else if (this.value.trim()) {
                this.classList.add('error');
                this.classList.remove('valid');
            }
        });

        phoneInputField.addEventListener('input', function () {
            this.classList.remove('error', 'valid');
        });
    }

    // Initialize guardian phone input
    if (guardianInputField && window.intlTelInput) {
        guardianInput = window.intlTelInput(guardianInputField, phoneInputConfig);

        guardianInputField.addEventListener('blur', function () {
            if (guardianInput.isValidNumber()) {
                this.classList.remove('error');
                this.classList.add('valid');
            } else if (this.value.trim()) {
                this.classList.add('error');
                this.classList.remove('valid');
            }
        });

        guardianInputField.addEventListener('input', function () {
            this.classList.remove('error', 'valid');
        });
    }

    // Form submission handler for phone numbers
    window.processPhoneForm = function (event) {
        event.preventDefault();

        const phoneNumber = phoneInput?.getNumber() || '';
        const guardianNumber = guardianInput?.getNumber() || '';

        const phoneValid = phoneInput ? phoneInput.isValidNumber() : false;
        const guardianValid = guardianInput ? guardianInput.isValidNumber() : false;

        if (phoneInput && !phoneValid && phoneInputField.value.trim()) {
            alert('Please enter a valid phone number');
            phoneInputField.focus();
            return;
        }

        if (guardianInput && !guardianValid && guardianInputField.value.trim()) {
            alert('Please enter a valid guardian phone number');
            guardianInputField.focus();
            return;
        }

        const info = document.querySelector(".alert-info");
        if (info) {
            info.style.display = "block";
            info.innerHTML = `
                Phone number in E.164 format: <strong>${phoneNumber}</strong><br>
                Guardian number in E.164 format: <strong>${guardianNumber}</strong><br>
                Phone Valid: <strong>${phoneValid ? 'Yes' : 'No'}</strong><br>
                Guardian Valid: <strong>${guardianValid ? 'Yes' : 'No'}</strong>
            `;
        }

        console.log('Phone Data:', {
            phoneNumber,
            guardianNumber,
            phoneValid,
            guardianValid,
            phoneCountry: phoneInput ? phoneInput.getSelectedCountryData() : null,
            guardianCountry: guardianInput ? guardianInput.getSelectedCountryData() : null
        });
    };

    window.phoneInputInstance = phoneInput;
    window.guardianInputInstance = guardianInput;
}

// ===== DATE PICKER =====
function initDatePicker() {
    if (document.getElementById("dob") && window.flatpickr) {
        flatpickr("#dob", {
            dateFormat: "d/m/Y",
            allowInput: true,
            clickOpens: true,
            altInput: false,
        });
    }
}

// ===== BOOTSTRAP SELECT =====
function initBootstrapSelect() {
    if (window.$ && $.fn.selectpicker) {
        $(function () {
            $('.my-select').selectpicker();
        });
    }
}

// ===== MAIN INITIALIZATION =====
function initializeAllComponents() {
    // Call only the functions you have
    initMemberRegistration();
    initPhoneInputs();
    initDatePicker();
    initBootstrapSelect();

    console.log('All components initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllComponents);
} else {
    initializeAllComponents();
}

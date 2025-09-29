// A single function to run all initializations once the DOM is loaded.
function initializeAllComponents() {
    // Initialize CustomModal (for 'customModal', 'openModalBtn', etc.)
    if (document.getElementById('customModal')) {
        new CustomModal();
    }

    // Initialize Select All Checkboxes (for 'selectAll' and '.row-check')
    initSelectAllCheckboxes();

    // Initialize International Phone Input (for '#phone')
    initPhoneInputs();

    // Initialize Bootstrap Select (for '.my-select')
    initBootstrapSelect();

    // Initialize additional date and time pickers (for '#startDate', '#endDate', etc.)
    initAdditionalDateTimePickers();
    
    // Log initialization completion
    console.log('All components initialized: Modal, Checkboxes, Phone Input, Select, and Date/Time Pickers.');
}

// =====================================================================
// CustomModal Class
// =====================================================================
class CustomModal {
    constructor() {
        this.isOpen = false;
        this.isLoading = false;
        this.modalText = 'Content of the modal';
        
        // Responsive width configuration
        this.widthConfig = {
            xs: '90%', sm: '90%', md: '90%', 
            lg: '70%', xl: '70%', xxl: '70%'
        };
        
        // DOM Elements
        this.modal = document.getElementById('customModal');
        // Safely access properties only if modal exists
        if (!this.modal) {
            console.warn('CustomModal: #customModal element not found. Initialization stopped.');
            return;
        }
        this.modalContainer = this.modal.querySelector('.modal-container');
        this.openBtn = document.getElementById('openModalBtn');
        this.closeBtn = document.getElementById('closeBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.confirmBtn = document.getElementById('confirmBtn');
        this.modalContent = document.getElementById('modalContent');
        this.btnText = document.getElementById('btnText');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        
        this.init();
    }
    
    // Initialize event listeners
    init() {
        if (this.openBtn) this.openBtn.addEventListener('click', () => this.show());
        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.hide());
        if (this.cancelBtn) this.cancelBtn.addEventListener('click', () => this.cancel());
        if (this.confirmBtn) this.confirmBtn.addEventListener('click', () => this.confirm());
        
        // Close on overlay click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen && !this.isLoading) {
                this.hide();
            }
        });
        
        // Set initial responsive width and listen for resize
        this.setResponsiveWidth();
        window.addEventListener('resize', () => this.setResponsiveWidth());
    }
    
    // Set responsive width based on screen size
    setResponsiveWidth() {
        if (!this.modalContainer) return;
        
        const screenWidth = window.innerWidth;
        let width;
        
        if (screenWidth < 576) {
            width = this.widthConfig.xs;
        } else if (screenWidth < 768) {
            width = this.widthConfig.sm;
        } else if (screenWidth < 992) {
            width = this.widthConfig.md;
        } else if (screenWidth < 1200) {
            width = this.widthConfig.lg;
        } else if (screenWidth < 1400) {
            width = this.widthConfig.xl;
        } else {
            width = this.widthConfig.xxl;
        }
        
        this.modalContainer.style.width = width;
    }
    
    // Show modal
    show() {
        this.isOpen = true;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Hide modal
    hide() {
        this.isOpen = false;
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset modal state
        setTimeout(() => {
            this.modalText = 'Content of the modal';
            if (this.modalContent) this.modalContent.textContent = this.modalText;
            this.setLoading(false);
        }, 300);
    }
    
    // Cancel action
    cancel() {
        console.log('Clicked cancel button');
        this.hide();
    }
    
    // Confirm action with async logic
    confirm() {
        this.modalText = 'Processing... closing after two seconds.';
        if (this.modalContent) this.modalContent.textContent = this.modalText;
        
        this.setLoading(true);
        
        setTimeout(() => {
            console.log('Confirmed action completed.');
            this.hide();
        }, 2000);
    }
    
    // Set loading state
    setLoading(loading) {
        this.isLoading = loading;
        
        if (this.btnText && this.loadingSpinner && this.confirmBtn) {
            if (loading) {
                this.btnText.textContent = 'Loading...';
                this.loadingSpinner.classList.remove('hidden');
                this.confirmBtn.disabled = true;
                // Disable cancel button during loading
                if (this.cancelBtn) this.cancelBtn.disabled = true;
                if (this.closeBtn) this.closeBtn.disabled = true;
            } else {
                this.btnText.textContent = 'OK';
                this.loadingSpinner.classList.add('hidden');
                this.confirmBtn.disabled = false;
                // Re-enable cancel button
                if (this.cancelBtn) this.cancelBtn.disabled = false;
                if (this.closeBtn) this.closeBtn.disabled = false;
            }
        }
    }
}

// =====================================================================
// Select All Checkboxes
// =====================================================================
function initSelectAllCheckboxes() {
    const selectAll = document.getElementById("selectAll");
    const checkboxes = document.querySelectorAll(".row-check");

    if (!selectAll || checkboxes.length === 0) {
        console.info('Select All: Elements not found (no table or rows to select).');
        return;
    }

    // Toggle all checkboxes when header checkbox is clicked
    selectAll.addEventListener("change", function () {
        checkboxes.forEach(cb => {
            cb.checked = this.checked;
        });
        console.log(`All checkboxes ${this.checked ? 'selected' : 'deselected'}`);
    });

    // Update "Select All" state if user manually toggles row checkboxes
    checkboxes.forEach(cb => {
        cb.addEventListener("change", function () {
            const allChecked = [...checkboxes].every(c => c.checked);
            const someChecked = [...checkboxes].some(c => c.checked);
            
            selectAll.checked = allChecked;
            // Set indeterminate state if some but not all are checked
            selectAll.indeterminate = someChecked && !allChecked;
            
            console.log(`Checkbox toggled. All checked: ${allChecked}, Some checked: ${someChecked}`);
        });
    });
}

// =====================================================================
// International Phone Input (intl-tel-input)
// =====================================================================
function initPhoneInputs() {
    const phoneInputField = document.querySelector("#phone");

    if (!phoneInputField || !window.intlTelInput) return;

    const phoneInput = window.intlTelInput(phoneInputField, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        initialCountry: "sa",
        separateDialCode: false,      // ❗ Disable separate dial code
        nationalMode: true,           // ❗ Input will show only the number (no +XXX)
        autoHideDialCode: true,       // Hide dial code
        formatOnDisplay: false,       // Keep raw input format
        autoPlaceholder: "aggressive",
        placeholderNumberType: "MOBILE",
        allowDropdown: true,
        preferredCountries: ["sa", "ae", "kw", "qa", "bh", "om"],
        customPlaceholder: function (selectedCountryPlaceholder) {
            // Show placeholder without numbers (e.g., 'XXX XXX XXXX')
            return selectedCountryPlaceholder.replace(/[0-9]/g, "X");
        }
    });

    // Validation
    phoneInputField.addEventListener("blur", function () {
        if (phoneInput.isValidNumber()) {
            this.classList.remove("error");
            this.classList.add("valid");
        } else if (this.value.trim()) {
            this.classList.add("error");
            this.classList.remove("valid");
        }
    });

    // Reset validation on input
    phoneInputField.addEventListener("input", function () {
        this.classList.remove("error", "valid");
    });

    // Expose instance globally if needed
    window.phoneInputInstance = phoneInput;
}

document.addEventListener("DOMContentLoaded", initPhoneInputs);

// =====================================================================
// Bootstrap Select
// =====================================================================
function initBootstrapSelect() {
    if (window.$ && $.fn.selectpicker) {
        $('.my-select').selectpicker({
            style: 'btn-outline-secondary',
            size: 4,
            liveSearch: true,
            showTick: true
        });
        console.log('Bootstrap select initialized.');
    }
}

// =====================================================================
// DATE & TIME PICKERS (Flatpickr)
// The original 'initDatePicker' for 'dob' has been REMOVED.
// This function remains for other date/time fields.
// =====================================================================
function initAdditionalDateTimePickers() {
    if (window.flatpickr) {
        // Start Date
        if (document.getElementById("startDate")) {
            flatpickr("#startDate", {
                dateFormat: "d/m/Y",
                allowInput: true,
                defaultDate: "today",
            });
        }

        // End Date
        if (document.getElementById("endDate")) {
            flatpickr("#endDate", {
                dateFormat: "d/m/Y",
                allowInput: true,
                defaultDate: new Date().fp_incr(1), // tomorrow
            });
        }

        // Start Time
        if (document.getElementById("startTime")) {
            flatpickr("#startTime", {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                defaultDate: "12:00",
            });
        }

        // End Time
        if (document.getElementById("endTime")) {
            flatpickr("#endTime", {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                defaultDate: "12:00",
            });
        }
        console.log('Flatpickr date and time pickers initialized.');
    }
}

// =====================================================================
// FORM SUBMISSION HANDLER
// Removed 'dob' reference.
// =====================================================================
window.processPhoneForm = function (event) {
    event.preventDefault();

    const phoneInput = window.phoneInputInstance;
    const phoneInputField = document.querySelector("#phone");

    const phoneNumber = phoneInput?.getNumber() || '';
    const phoneValid = phoneInput ? phoneInput.isValidNumber() : false;

    // Validate required phone number
    if (phoneInput && !phoneValid && phoneInputField.value.trim()) {
        alert('Please enter a valid phone number');
        phoneInputField.focus();
        return;
    }

    // Get form data
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    const info = document.querySelector(".alert-info");
    if (info) {
        info.style.display = "block";
        info.innerHTML = `
            <h5>Form Submission Results:</h5>
            <strong>Name:</strong> ${formObject.name}<br>
            <strong>Email:</strong> ${formObject.email}<br>
            <strong>Phone number in E.164 format:</strong> <span class="text-primary">${phoneNumber}</span><br>
            <strong>Nationality:</strong> ${formObject.nationality}<br>
            <strong>Age Group:</strong> ${formObject.ageGroup}<br>
            <strong>Subscription:</strong> ${formObject.subscription}<br>
            <strong>Preferred Location:</strong> ${formObject.location}<br>
            <strong>Start Date:</strong> ${formObject.startDate || 'N/A'}<br>
            <strong>End Date:</strong> ${formObject.endDate || 'N/A'}<br>
            <strong>Start Time:</strong> ${formObject.startTime || 'N/A'}<br>
            <strong>End Time:</strong> ${formObject.endTime || 'N/A'}<br>
            <strong>Phone Valid:</strong> <span class="${phoneValid ? 'text-success' : 'text-danger'}">${phoneValid ? 'Yes' : 'No'}</span>
        `;
    }

    console.log('Form Data:', {
        formData: formObject,
        phoneNumber,
        phoneValid,
        phoneCountry: phoneInput ? phoneInput.getSelectedCountryData() : null
    });
};

// =====================================================================
// CLEAR FORM
// =====================================================================
function clearForm() {
    // Assuming the form to clear has the ID 'FilterForm' or another relevant ID
    const formToClear = document.getElementById('FilterForm') || document.forms[0]; 
    if (formToClear) {
        formToClear.reset();
    }
    
    if (window.$ && $.fn.selectpicker) {
        $('.selectpicker').selectpicker('refresh');
    }
    
    const infoAlert = document.querySelector('.alert-info');
    if (infoAlert) {
        infoAlert.style.display = 'none';
    }
    
    // Clear phone input validation classes
    const phoneField = document.querySelector("#phone");
    if (phoneField) {
        phoneField.classList.remove('error', 'valid');
    }
    console.log('Form cleared and validation reset.');
}

// =====================================================================
// Global Initialization Call
// Use a single, robust DOMContentLoaded listener
// =====================================================================
document.addEventListener('DOMContentLoaded', initializeAllComponents);
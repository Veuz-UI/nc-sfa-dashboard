// Select all functionality
        document.getElementById('selectAll').addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.form-check-input:not(#selectAll)');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });

        // Individual checkbox functionality
        document.querySelectorAll('.form-check-input:not(#selectAll)').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const allCheckboxes = document.querySelectorAll('.form-check-input:not(#selectAll)');
                const checkedCheckboxes = document.querySelectorAll('.form-check-input:not(#selectAll):checked');
                const selectAllCheckbox = document.getElementById('selectAll');
                
                if (checkedCheckboxes.length === allCheckboxes.length) {
                    selectAllCheckbox.checked = true;
                    selectAllCheckbox.indeterminate = false;
                } else if (checkedCheckboxes.length > 0) {
                    selectAllCheckbox.checked = false;
                    selectAllCheckbox.indeterminate = true;
                } else {
                    selectAllCheckbox.checked = false;
                    selectAllCheckbox.indeterminate = false;
                }
            });
        });


        // add new modal


        // Modal functionality
        const modal = document.getElementById('subscriptionModal');
        const addNewBtn = document.getElementById('addNewBtn');
        const closeModal = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelBtn');
        const saveBtn = document.getElementById('saveBtn');
        const form = document.getElementById('subscriptionForm');
        const modalContent = document.querySelector('.modal-content');

        // Responsive width configuration
        const widthConfig = {
            xs: '95%',   // Extra small devices (portrait phones, less than 576px)
            sm: '90%',   // Small devices (landscape phones, 576px and up)
            md: '80%',   // Medium devices (tablets, 768px and up)
            lg: '60%',   // Large devices (desktops, 992px and up)
            xl: '50%',   // Extra large devices (large desktops, 1200px and up)
            xxl: '50%'   // Extra extra large devices (larger desktops, 1400px and up)
        };

        // Breakpoints (Bootstrap 5 breakpoints)
        const breakpoints = {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
            xxl: 1400
        };

        // Function to get current breakpoint
        function getCurrentBreakpoint() {
            const width = window.innerWidth;
            
            if (width >= breakpoints.xxl) return 'xxl';
            if (width >= breakpoints.xl) return 'xl';
            if (width >= breakpoints.lg) return 'lg';
            if (width >= breakpoints.md) return 'md';
            if (width >= breakpoints.sm) return 'sm';
            return 'xs';
        }

        // Function to apply responsive width
        function applyResponsiveWidth() {
            const currentBreakpoint = getCurrentBreakpoint();
            const width = widthConfig[currentBreakpoint];
            
            if (modalContent) {
                modalContent.style.width = width;
                
                // Additional responsive adjustments
                if (currentBreakpoint === 'xs' || currentBreakpoint === 'sm') {
                    modalContent.style.margin = '10px';
                    modalContent.style.maxHeight = '95vh';
                } else {
                    modalContent.style.margin = 'auto';
                    modalContent.style.maxHeight = '90vh';
                }
            }
        }

        // Apply responsive width on window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(applyResponsiveWidth, 100);
        });

        // Initialize responsive width
        document.addEventListener('DOMContentLoaded', function() {
            applyResponsiveWidth();
        });

        // Open modal
        addNewBtn.addEventListener('click', function() {
            // Apply responsive width before showing
            applyResponsiveWidth();
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Reset form
            form.reset();
            
            // Focus on first input
            setTimeout(() => {
                document.querySelector('input[name="planTitle"]').focus();
            }, 300);
        });

        // Close modal function
        function closeModalFunc() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            
            setTimeout(() => {
                form.reset();
            }, 300);
        }

        // Close modal events
        closeModal.addEventListener('click', closeModalFunc);
        cancelBtn.addEventListener('click', closeModalFunc);

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModalFunc();
            }
        });

        // Close modal with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModalFunc();
            }
        });

        // Form submission
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            // Get form data
            const formData = new FormData(form);
            const subscriptionData = {};
            
            for (let [key, value] of formData.entries()) {
                subscriptionData[key] = value;
            }
            
            // Here you would typically send the data to your server
            console.log('New subscription data:', subscriptionData);
            
            // Show success message (you can customize this)
            alert(`Subscription plan "${subscriptionData.planTitle}" has been created successfully!`);
            
            // Close modal
            closeModalFunc();
            
            // Here you could refresh the table or add the new row dynamically
            addNewRowToTable(subscriptionData);
        });

        // Function to add new row to table (example)
        function addNewRowToTable(data) {
            // This is a sample function - you would implement this based on your table structure
            console.log('Adding new row to table:', data);
            
            // You could dynamically add the new subscription to your existing table
            // or reload the table data from your server
        }

        function clearForm() {
    // Get the form element
    const form = document.getElementById('subscriptionForm');
    
    // Reset the form
    form.reset();
    
    // Clear all input fields
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('is-invalid');
    });
    
    // Reset select elements to their default placeholder state
    const selects = form.querySelectorAll('select');
    selects.forEach(select => {
        select.selectedIndex = 0; // Set to first option (placeholder)
        select.classList.remove('is-invalid');
        
        // If the select has a placeholder option, ensure it's selected
        const placeholderOption = select.querySelector('option[disabled]');
        if (placeholderOption) {
            placeholderOption.selected = true;
        }
    });
    
    // Clear any validation states
    const allFormControls = form.querySelectorAll('.form-control, .form-select');
    allFormControls.forEach(control => {
        control.classList.remove('is-invalid', 'is-valid');
    });
    
    console.log('Form cleared successfully');
}

      
        // Action button functionality
        // document.querySelectorAll('.btn-edit').forEach(btn => {
        //     btn.addEventListener('click', function() {
        //         alert('Edit functionality to be implemented');
        //     });
        // });

        // document.querySelectorAll('.btn-delete').forEach(btn => {
        //     btn.addEventListener('click', function() {
        //         if (confirm('Are you sure you want to delete this item?')) {
        //             alert('Delete functionality to be implemented');
        //         }
        //     });
        // });
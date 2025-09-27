 // Show modal when Add New button is clicked
        document.getElementById('addNewRole').addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('createRoleModal'));
            modal.show();
        });

        // Get all permission checkboxes and row select all checkboxes
        const allPermissionCheckboxes = document.querySelectorAll('.permission-cb');
        const allRowSelectAll = document.querySelectorAll('.row-select-all');

        // Row Select All functionality - when clicked, select all checkboxes in that row
        allRowSelectAll.forEach(rowSelectAll => {
            rowSelectAll.addEventListener('change', function() {
                const rowName = this.getAttribute('data-row');
                const isChecked = this.checked;
                
                // Select/deselect all checkboxes in this specific row
                const rowCheckboxes = document.querySelectorAll(`[data-row="${rowName}"].permission-cb`);
                rowCheckboxes.forEach(checkbox => {
                    checkbox.checked = isChecked;
                });
            });
        });

        // Individual permission checkbox functionality - update row select all when individual checkboxes change
        allPermissionCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const rowName = this.getAttribute('data-row');
                const rowCheckboxes = document.querySelectorAll(`[data-row="${rowName}"].permission-cb`);
                const rowSelectAll = document.querySelector(`[data-row="${rowName}"].row-select-all`);
                
                // Update row select all based on individual selections
                const checkedInRow = Array.from(rowCheckboxes).filter(cb => cb.checked).length;
                const totalInRow = rowCheckboxes.length;
                
                if (checkedInRow === totalInRow) {
                    // All checkboxes in row are checked
                    rowSelectAll.checked = true;
                    rowSelectAll.indeterminate = false;
                } else if (checkedInRow === 0) {
                    // No checkboxes in row are checked
                    rowSelectAll.checked = false;
                    rowSelectAll.indeterminate = false;
                } else {
                    // Some checkboxes in row are checked
                    rowSelectAll.checked = false;
                    rowSelectAll.indeterminate = true;
                }
            });
        });

        // Form submission
        document.getElementById('createRoleForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const roleName = formData.get('roleName');
            const permissions = formData.getAll('permissions[]');
            
            if (!roleName.trim()) {
                alert('Please enter a role name');
                return;
            }
            
            if (permissions.length === 0) {
                alert('Please select at least one permission');
                return;
            }
            
            // Log the form data (replace with your actual submission logic)
            console.log('Role Name:', roleName);
            console.log('Permissions:', permissions);
            
            alert(`Role "${roleName}" created successfully with ${permissions.length} permissions!`);
            
            // Reset form and close modal
            this.reset();
            
            // Reset all row select all checkboxes
            allRowSelectAll.forEach(cb => {
                cb.checked = false;
                cb.indeterminate = false;
            });
            
            bootstrap.Modal.getInstance(document.getElementById('createRoleModal')).hide();
        });

        // Clear form when modal is hidden
        document.getElementById('createRoleModal').addEventListener('hidden.bs.modal', function() {
            document.getElementById('createRoleForm').reset();
            
            // Reset all row select all checkboxes
            allRowSelectAll.forEach(cb => {
                cb.checked = false;
                cb.indeterminate = false;
            });
        });
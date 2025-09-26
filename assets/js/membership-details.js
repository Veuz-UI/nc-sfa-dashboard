document.addEventListener('DOMContentLoaded', () => {
  const editBtn = document.getElementById('editBtn');
  const form = document.getElementById('Member-details-form');

  let isEditing = false;

  editBtn.addEventListener('click', () => {
    const editableFields = form.querySelectorAll('[data-editable="true"]');

    if (!isEditing) {
      // Enter edit mode
      editableFields.forEach(field => {
        if (field.tagName.toLowerCase() === 'select') {
          field.disabled = false;
          field.classList.add('editable-active');
          // refresh bootstrap-select
          if (typeof $(field).selectpicker === 'function') {
            $(field).selectpicker('refresh');
          }
        } else {
          field.readOnly = false;
          field.classList.add('editable-active');
        }
      });

      editBtn.textContent = 'Update';
      isEditing = true;
    } else {
      // Return to view mode
      editableFields.forEach(field => {
        if (field.tagName.toLowerCase() === 'select') {
          field.disabled = true;
          field.classList.remove('editable-active');
          if (typeof $(field).selectpicker === 'function') {
            $(field).selectpicker('refresh');
          }
        } else {
          field.readOnly = true;
          field.classList.remove('editable-active');
        }
      });

      editBtn.textContent = 'Edit';
      isEditing = false;

      // Optional: capture form data
      // const data = Object.fromEntries(new FormData(form));
      // console.log('Updated data:', data);
    }
  });
});

/**
 * Initialize "Select All" functionality for a given table.
 * @param {string} selectAllId  The ID of the header checkbox
 * @param {string} tableSelector  The CSS selector for the table
 */
function initSelectAllCheckboxes(selectAllId, tableSelector) {
    const selectAll = document.getElementById(selectAllId);
    const table = document.querySelector(tableSelector);

    if (!selectAll || !table) {
        console.warn(`SelectAll: Cannot find ${selectAllId} or ${tableSelector}`);
        return;
    }

    // Only find checkboxes inside this table
    const checkboxes = table.querySelectorAll('.row-check');

    // Handle header checkbox click
    selectAll.addEventListener('change', function () {
        checkboxes.forEach(cb => cb.checked = this.checked);
        console.log(`${this.checked ? 'All selected' : 'All deselected'}`);
    });

    // Handle individual row checkbox changes
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const allChecked = [...checkboxes].every(c => c.checked);
            const someChecked = [...checkboxes].some(c => c.checked);

            selectAll.checked = allChecked;
            selectAll.indeterminate = someChecked && !allChecked;
        });
    });
}

// ✅ Initialize for your members table
document.addEventListener('DOMContentLoaded', () => {
    initSelectAllCheckboxes('selectAll', '.table');
});
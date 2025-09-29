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
 * @param {string} selectAllId   The ID of the header checkbox
 * @param {string} tableSelector The CSS selector for the table
 */
function initSelectAllCheckboxes(selectAllId, tableSelector) {
    const selectAll = document.getElementById(selectAllId);
    const table = document.querySelector(tableSelector);

    if (!selectAll || !table) {
        console.warn(`SelectAll: Cannot find ${selectAllId} or ${tableSelector}`);
        return;
    }

    // Get only checkboxes inside this specific table
    const checkboxes = table.querySelectorAll('.row-check');

    // 👉 When header checkbox changes
    selectAll.addEventListener('change', function () {
        checkboxes.forEach(cb => cb.checked = this.checked);
        console.log(`${this.checked ? 'All selected' : 'All deselected'} in ${selectAllId}`);
    });

    // 👉 When individual row checkboxes change
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const allChecked = [...checkboxes].every(c => c.checked);
            const someChecked = [...checkboxes].some(c => c.checked);

            selectAll.checked = allChecked;
            selectAll.indeterminate = someChecked && !allChecked;
        });
    });
}

// ✅ Initialize both tables after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initSelectAllCheckboxes('selectAll', '.table-1');   // First table
    initSelectAllCheckboxes('selectAll2', '.table-2');  // Second table
});

// Wait until the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const editBtn = document.getElementById('editBtn');
    const memberPane = document.getElementById('member');

    // Show button only if #member has the 'active' class
    function toggleEditButton() {
        if (memberPane.classList.contains('active')) {
            editBtn.style.display = 'inline-block';  // Show
        } else {
            editBtn.style.display = 'none';         // Hide
        }
    }

    // 👉 Check once on page load
    toggleEditButton();

    // 👉 Update on every tab switch
    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
        tab.addEventListener('shown.bs.tab', toggleEditButton);
    });
});

// duplicate card

document.addEventListener('DOMContentLoaded', function () {
    const issueBtn = document.querySelector('.btn-issue');
    const memberTable = document.querySelector('.table-container.member-details');
    const duplicateCardTable = document.querySelector('.table-container.duplicate-card');

    issueBtn.addEventListener('click', function () {
        // Hide the member table
        memberTable.style.display = 'none';

        // Show the duplicate card table
        duplicateCardTable.style.display = 'block';
    });
});


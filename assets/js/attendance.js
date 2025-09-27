document.addEventListener('DOMContentLoaded', function () {
    const selectAll = document.getElementById('selectAll');
    // Get all checkboxes in the table body
    const rowCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');

    // When the "Select All" checkbox is clicked
    selectAll.addEventListener('change', function () {
        rowCheckboxes.forEach(cb => {
            cb.checked = selectAll.checked;
        });
        console.log(`All checkboxes ${selectAll.checked ? 'selected' : 'deselected'}`);
    });

    // When any row checkbox is clicked
    rowCheckboxes.forEach(cb => {
        cb.addEventListener('change', function () {
            const allChecked = Array.from(rowCheckboxes).every(chk => chk.checked);
            const someChecked = Array.from(rowCheckboxes).some(chk => chk.checked);

            // Update the header checkbox
            selectAll.checked = allChecked;
            selectAll.indeterminate = !allChecked && someChecked;

            console.log(`Checkbox toggled. All checked: ${allChecked}, Some checked: ${someChecked}`);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const openBtn   = document.getElementById('attendance-report-btn');
    const modal     = document.getElementById('attendance-report');
    const closeBtn  = document.getElementById('attendance-report-close');
    const form      = document.getElementById('attendance-report-form');

    // Open modal
    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scroll
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close when clicking outside the box
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const startDate = form.startDate.value;
        const endDate   = form.endDate.value;
        const memberId  = form.memberId.value;

        console.log('Filter Applied:', { startDate, endDate, memberId });
        alert(`Filter applied:\nStart: ${startDate}\nEnd: ${endDate}\nMember: ${memberId}`);

        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// =====================================================================
// DATE & TIME PICKERS (Flatpickr)
// The original 'initDatePicker' for 'dob' has been REMOVED.
// This function remains for other date/time fields.
// =====================================================================
document.addEventListener('DOMContentLoaded', function () {
  const startInput = document.getElementById('startDate');
  const endInput = document.getElementById('endDate');

  if (!startInput || !endInput) {
    console.warn('Date inputs not found.');
    return;
  }

  if (!window.flatpickr) {
    console.warn('flatpickr is not loaded. Please include flatpickr JS/CSS.');
    return;
  }

  // Helper to get today and tomorrow (no fp_incr)
  const today = new Date();
  today.setHours(0,0,0,0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // We'll keep references to both pickers so they can interact
  let startPicker = null;
  let endPicker = null;

  startPicker = flatpickr(startInput, {
    dateFormat: "d/m/Y",
    allowInput: true,
    defaultDate: today,
    // when start date changes, update minDate of endDate
    onChange: function (selectedDates) {
      if (selectedDates && selectedDates.length) {
        const selected = selectedDates[0];
        // set the minimum selectable date on end picker
        endPicker.set('minDate', selected);

        // if end date is empty or before selected start, update it to next day
        const currentEnd = endPicker.selectedDates[0];
        if (!currentEnd || currentEnd < selected) {
          const newEnd = new Date(selected);
          newEnd.setDate(newEnd.getDate() + 1);
          endPicker.setDate(newEnd, true);
        }
      } else {
        // if start cleared, remove min constraint
        endPicker.set('minDate', null);
      }
    }
  });

  endPicker = flatpickr(endInput, {
    dateFormat: "d/m/Y",
    allowInput: true,
    defaultDate: tomorrow,
    minDate: today
  });

  // open flatpickr when clicking the calendar icon (for both fields)
  document.querySelectorAll('.calendar-icon').forEach(icon => {
    icon.addEventListener('click', function () {
      // the related input is the previousElementSibling in this layout
      const input = this.previousElementSibling;
      if (input && input._flatpickr) {
        input._flatpickr.open();
      } else if (input) {
        input.focus();
      }
    });

    // keyboard accessibility: Enter or Space opens the picker
    icon.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const input = this.previousElementSibling;
        if (input && input._flatpickr) input._flatpickr.open();
      }
    });
  });

  // Optional: if you want to clear the field when user clears input text manually
  // you can listen for blur and validate, but that's up to you.
});
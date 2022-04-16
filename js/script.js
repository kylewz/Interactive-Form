const nameField = document.getElementById('name');
const otherJobRoleField = document.getElementById('other-job-role');
const jobRoleSelector = document.getElementById('title');

// Default focus on name input on page load
nameField.focus();

// Hide "other" job role field on page load
otherJobRoleField.style.display= 'none';

// Listen for job role selector to show "other" field or not
jobRoleSelector.addEventListener('change', (e) => {
    if(e.target.value === 'other')
        otherJobRoleField.style.display = '';
    else
        otherJobRoleField.style.display = 'none';
    }
);
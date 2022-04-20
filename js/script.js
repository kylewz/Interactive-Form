const nameField = document.getElementById('name');
const otherJobRoleField = document.getElementById('other-job-role');
const jobRoleSelector = document.getElementById('title');
const shirtDesignsSelector = document.getElementById('design');
const shirtColorSelector = document.getElementById('color');
const shirtColorOptions = document.querySelectorAll('#color option');
const activitiesFieldset = document.getElementById('activities');
const activitiesOptions = document.querySelectorAll('#activities input');

// Default focus on name input on page load
nameField.focus();

// Hide "other" job role field on page load
otherJobRoleField.style.display = 'none';

// Listen for job role selector to show "other" field or not
jobRoleSelector.addEventListener('change', (e) => {
  if (e.target.value === 'other') otherJobRoleField.style.display = '';
  else otherJobRoleField.style.display = 'none';
});

// Shirt Color selector disabled until design chosen
shirtColorSelector.disabled = true;

// Color options available dependendent on chosen shirt design
shirtDesignsSelector.addEventListener('change', (e) => {
  shirtColorSelector.disabled = false;
  let defaultColorSelected = false;

  for (let i = 0; i < shirtColorOptions.length; i++) {
    const shirtDesignSelected = e.target.value;
    const colorForShirtDesign = shirtColorOptions[i].dataset.theme;

    if (colorForShirtDesign === shirtDesignSelected) {
      shirtColorOptions[i].hidden = false;

      if (!defaultColorSelected) {
        shirtColorOptions[i].selected = true;
        defaultColorSelected = true;
      }
    } else {
      shirtColorOptions[i].hidden = true;
    }
  }
});

// Listens for changes to add activity cost for those that are checked
activitiesFieldset.addEventListener('change', (e) => {
  let activitiesCostTotal = document.getElementById('activities-cost');
  let totalCost = 0;

  for (const eachActivity of activitiesOptions) {
    if (eachActivity.checked) {
      const activityCost = parseInt(eachActivity.dataset.cost);
      totalCost += activityCost;
    }
  }

  activitiesCostTotal.innerHTML = `Total: \$${totalCost}`;
});

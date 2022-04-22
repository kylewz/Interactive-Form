const form = document.querySelector('form');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
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

// Sets payment method to credit card selection as default
const paymentSelect = document.getElementById('payment');
const paymentSelectionOptions = document.querySelectorAll('#payment option');
const creditCardFields = document.getElementById('credit-card');
const paypalFields = document.getElementById('paypal');
const bitcoinField = document.getElementById('bitcoin');

// Display Credit card payment option by default
paymentSelectionOptions[1].selected = true;
creditCardFields.style.display = '';
paypalFields.style.display = 'none';
bitcoinField.style.display = 'none';

paymentSelect.addEventListener('change', (e) => {
  const selectedPaymentValue = e.target.value;
  const mainPaymentDivBox = 'payment-method-box';
  const paymentDivs = document.querySelectorAll('.payment-methods > div');

  // Display only relevant payment fields per payment method selected
  for (const div of paymentDivs) {
    if (div.id === selectedPaymentValue) {
      div.style.display = '';
    } else if (div.className === mainPaymentDivBox) {
      div.style.display = '';
    } else {
      div.style.display = 'none';
    }
  }
});

// Validate name field is not empty
const nameValidator = () => {
  const nameValue = nameField.value;
  const nameIsValid = /.+/.test(nameValue);

  return nameIsValid;
};

// Validate email value
const emailValidator = () => {
  const emailValue = emailField.value;
  const emailIsValid = /^[^@]+@[^@.]+\.com$/i.test(emailValue);

  return emailIsValid;
};

// Validates at least one activity checked
const activitiesValidator = () => {
  for (const activity of activitiesOptions) {
    if (activity.checked) {
      return true;
    }
  }

  return false;
};

// Validate Credit Card Number is 13-16 digits
const creditCardNumberValidator = () => {
  const cardNumber = document.getElementById('cc-num');
  const cardNumberValue = cardNumber.value;
  const cardNumIsValid = /^\d{13,16}$/.test(cardNumberValue);

  return cardNumIsValid;
};

// Validate zip code is 5 digits
const zipCodeValidator = () => {
  const zipCodeField = document.getElementById('zip');
  const zipCodeValue = zipCodeField.value;
  const zipCodeIsValid = /^\d{5}$/.test(zipCodeValue);

  return zipCodeIsValid;
};

// Validate CVV is 3 digits
const cvvValidator = () => {
  const cvvField = document.getElementById('cvv');
  const cvvValue = cvvField.value;
  const cvvIsValid = /^\d{3}$/.test(cvvValue);

  return cvvIsValid;
};

// Listener on submit to validate required fields
form.addEventListener('submit', (e) => {
  if (
    !nameValidator() ||
    !emailValidator() ||
    !activitiesValidator() ||
    !creditCardNumberValidator() ||
    !zipCodeValidator() ||
    !cvvValidator()
  ) {
    e.preventDefault();
  }
});

// Adds listener to activities fields to highlight input when focused, remove
// when blurred
/* Upon researching if 'focus' event bubbles, found 'focusin' and 'focusout' are
  bubbling events and hence are used below: 
  (https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event)*/
activitiesFieldset.addEventListener('focusin', (e) => {
  const checkboxParentLabel = e.target.parentNode;
  checkboxParentLabel.classList.add('focus');
});

activitiesFieldset.addEventListener('focusout', (e) => {
  const checkboxParentLabel = e.target.parentNode;
  checkboxParentLabel.classList.remove('focus');
});

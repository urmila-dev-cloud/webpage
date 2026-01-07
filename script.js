const form = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Show error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email validity
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check required fields
function checkRequired(inputs) {
    let isValid = true;
    inputs.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is required`);
            isValid = false;
        } else {
            showSuccess(input);
        }
    });
    return isValid;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// Event listener
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate fields
    if(checkRequired([nameInput, emailInput, passwordInput])) {
        checkLength(nameInput, 3, 20);
        checkLength(passwordInput, 6, 25);
        checkEmail(emailInput);
    }
});

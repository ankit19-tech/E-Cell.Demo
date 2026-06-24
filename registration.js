document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');

    // Inputs
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const collegeInput = document.getElementById('college');
    const contactInput = document.getElementById('contact');
    const eventSelect = document.getElementById('eventSelect');

    // Error Message Spans
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const collegeError = document.getElementById('collegeError');
    const contactError = document.getElementById('contactError');
    const eventSelectError = document.getElementById('eventSelectError');

    // Regular Expressions
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^\d{10}$/;

    // Helper to set error
    const setError = (input, errorElement, message) => {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = message;
    };

    // Helper to set valid
    const setValid = (input, errorElement) => {
        input.classList.add('valid');
        input.classList.remove('invalid');
        errorElement.textContent = '';
    };

    // Helper to clear validation states entirely
    const clearValidationStates = (input, errorElement) => {
        input.classList.remove('valid');
        input.classList.remove('invalid');
        errorElement.textContent = '';
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        // 1. Validate Full Name
        const nameVal = fullNameInput.value.trim();
        if (nameVal === '') {
            setError(fullNameInput, fullNameError, 'Full Name is required.');
            isValid = false;
        } else if (!nameRegex.test(nameVal)) {
            setError(fullNameInput, fullNameError, 'Name must contain only letters and spaces.');
            isValid = false;
        } else {
            setValid(fullNameInput, fullNameError);
        }

        // 2. Validate Email
        const emailVal = emailInput.value.trim();
        if (emailVal === '') {
            setError(emailInput, emailError, 'Email Address is required.');
            isValid = false;
        } else if (!emailRegex.test(emailVal)) {
            setError(emailInput, emailError, 'Please enter a valid email address.');
            isValid = false;
        } else {
            setValid(emailInput, emailError);
        }

        // 3. Validate College Name
        const collegeVal = collegeInput.value.trim();
        if (collegeVal === '') {
            setError(collegeInput, collegeError, 'College Name is required.');
            isValid = false;
        } else {
            setValid(collegeInput, collegeError);
        }

        // 4. Validate Contact Number
        const contactVal = contactInput.value.trim();
        if (contactVal === '') {
            setError(contactInput, contactError, 'Contact Number is required.');
            isValid = false;
        } else if (!contactRegex.test(contactVal)) {
            setError(contactInput, contactError, 'Contact Number must be exactly 10 digits.');
            isValid = false;
        } else {
            setValid(contactInput, contactError);
        }

        // 5. Validate Event Selection
        const eventVal = eventSelect.value;
        if (eventVal === '') {
            setError(eventSelect, eventSelectError, 'Please select an event.');
            isValid = false;
        } else {
            setValid(eventSelect, eventSelectError);
        }

        // If form is valid, process submission
        if (isValid) {
            // Hide the form
            form.style.display = 'none';
            // Show success message
            successMessage.classList.remove('hidden');
            
            // Clear the form fields
            form.reset();
            
            // Clear validation styling
            clearValidationStates(fullNameInput, fullNameError);
            clearValidationStates(emailInput, emailError);
            clearValidationStates(collegeInput, collegeError);
            clearValidationStates(contactInput, contactError);
            clearValidationStates(eventSelect, eventSelectError);
        }
    });

    // Optional: Real-time validation on blur/input
    const inputs = [
        { el: fullNameInput, err: fullNameError, type: 'name' },
        { el: emailInput, err: emailError, type: 'email' },
        { el: collegeInput, err: collegeError, type: 'text' },
        { el: contactInput, err: contactError, type: 'contact' },
        { el: eventSelect, err: eventSelectError, type: 'select' }
    ];

    inputs.forEach(item => {
        item.el.addEventListener('input', () => {
            // Remove error styling as soon as user types, but only re-validate deeply on submit or blur
            if (item.el.classList.contains('invalid')) {
                item.el.classList.remove('invalid');
                item.err.textContent = '';
            }
        });
    });
});

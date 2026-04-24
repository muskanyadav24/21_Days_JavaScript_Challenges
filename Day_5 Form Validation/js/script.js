const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// Utility to show/hide error
function validateField(input, errorElement, condition, message) {
    if (condition) {
        errorElement.innerText = message;
        input.parentElement.classList.add("error");
        return false;
    } else {
        errorElement.innerText = "";
        input.parentElement.classList.remove("error");
        return true;
    }
}

// Validation
email.addEventListener("input", () => {
    validateField(email, document.getElementById("emailError"), !email.value.includes("@"), "Enter a valid email");
});

password.addEventListener("input", () => {
    validateField(password, document.getElementById("passwordError"), password.value.length < 6, "Min 6 characters required");
});

confirmPassword.addEventListener("input", () => {
    validateField(confirmPassword, document.getElementById("confirmError"), confirmPassword.value !== password.value, "Passwords do not match");
});

// Submit
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isEmailValid = validateField(email, document.getElementById("emailError"), !email.value.includes("@"), "Enter a valid email");
    const isPasswordValid = validateField(password, document.getElementById("passwordError"), password.value.length < 6, "Min 6 characters required");
    const isConfirmValid = validateField(confirmPassword, document.getElementById("confirmError"), confirmPassword.value !== password.value, "Passwords do not match");

    if (isEmailValid && isPasswordValid && isConfirmValid) {
        alert("Form Submitted Successfully ✅");
        form.reset(); 
    }
});
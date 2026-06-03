// Form Validation using TypeScript

// Get HTML elements
const form = document.getElementById("registrationForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form submit event
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form reload

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!name || !email || !password) {
        message.textContent = "All fields are required!";
        message.style.color = "red";
        return;
    }

    if (!isValidEmail(email)) {
        message.textContent = "Please enter a valid email address!";
        message.style.color = "red";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters!";
        message.style.color = "red";
        return;
    }

    message.textContent = "Registration successful!";
    message.style.color = "green";

    // Reset form
    form.reset();
});
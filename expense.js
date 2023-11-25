// expense.js

// Function to handle form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the user's email and password from the form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // You can add your login logic here (e.g., validate user credentials)
    // For this example, we'll just show an alert with the input values
    alert(`Email: ${email}\nPassword: ${password}`);
}

// Add an event listener to the login form
document.getElementById('login-form').addEventListener('submit', handleLogin);

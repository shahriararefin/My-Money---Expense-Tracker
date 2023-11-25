<script>
    // Get a reference to the profile form
    const profileForm = document.getElementById('profile-form');

    // Add an event listener to the form's submit event
    profileForm.addEventListener('submit', function (event) {
        // Check if the password is strong enough (at least 8 characters)
        const passwordInput = document.getElementById('password');
        if (passwordInput.value.length < 8) {
            alert('Password must be at least 8 characters long.');
            event.preventDefault(); // Prevent the form from submitting
        }
    });
</script>

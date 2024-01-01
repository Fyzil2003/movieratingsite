document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    register();
});

function register() {
    var username = document.getElementById("user").value;
    var password = document.getElementById("pass").value;

    if (username && password) {
        // Simulating registration by sending a POST request to /register
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ user: username, pass: password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.text();
        })
        .then(() => {
            window.location.href = "login.html";
        })
        .catch(error => {
            console.error('Registration error:', error);
            alert("Registration failed. Please try again.");
        });
    } else {
        alert("Please fill out all fields before submitting.");
    }
}

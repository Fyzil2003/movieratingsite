// document.getElementById("loginForm").addEventListener("submit", function (e) {
//     e.preventDefault();
//     login();
// });

// function login() {
//     var username = document.getElementById("user").value;
//     var password = document.getElementById("pass").value;

//     if (username && password) {
//         // Simulating login by sending a POST request to /login
//         fetch('/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: new URLSearchParams({ user: username, pass: password }),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Login failed');
//             }
//             return response.text();
//         })
//         .then(() => {
//             window.location.href = "index.html";
//         })
//         .catch(error => {
//             console.error('Login error:', error);
//             alert("Login failed. Please check your credentials.");
//         });
//     } else {
//         alert("Please fill out all fields before submitting.");
//     }
// }

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Perform the login logic here

        // For example, assuming you make an API request to check credentials
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: username,
                pass: password,
            }),
        });

        const result = await response.json();

        if (result.success) {
            // Store the username in session storage
            sessionStorage.setItem('loggedInUser', username);

            // Redirect to index.html
            window.location.href = '/index.html';
        } else {
            alert('Invalid username or password');
        }
    });
});
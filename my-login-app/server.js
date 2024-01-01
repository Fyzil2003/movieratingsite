// const express = require('express');
// const path = require('path');
// const connectToDatabase = require('./db'); // Adjust the path based on your project structure

// const app = express();
// const port = 3000;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// // Wrap the server setup in an async function
// async function startServer() {
//     // Connect to the database
//     const database = await connectToDatabase();

//     app.get('/', (req, res) => {
//         res.sendFile(path.join(__dirname, 'public', 'register.html'));
//     });

//     app.post('/register', async (req, res) => {
//         const username = req.body.user;
//         const password = req.body.pass;

//         if (username && password) {
//             // Use the database connection to perform registration (insert into the 'users' collection)
//             const usersCollection = database.collection('users');
//             await usersCollection.insertOne({ username, password });

//             res.redirect('/login.html');
//         } else {
//             res.redirect('/register.html?error=1');
//         }
//     });

//     app.post('/login', async (req, res) => {
//         const enteredUsername = req.body.user;
//         const enteredPassword = req.body.pass;

//         // Use the database connection to check login credentials (query the 'users' collection)
//         const usersCollection = database.collection('users');
//         const user = await usersCollection.findOne({ username: enteredUsername, password: enteredPassword });

//         if (user) {
//             res.sendFile(path.join(__dirname, 'index.html'));
//         } else {
//             res.redirect('/login.html?error=1');
//         }

//     });
   

//     app.listen(port, () => {
//         console.log(`Server running at http://localhost:${port}`);
//     });
// }

// // Call the async function to start the server
// startServer().catch((error) => {
//     console.error('Error starting the server:', error);
// });


// Update your server.js file with the following content
const express = require('express');
const path = require('path');
const connectToDatabase = require('./db'); // Adjust the path based on your project structure
const session = require('express-session');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a secure key
    resave: false,
    saveUninitialized: true,
}));

// Wrap the server setup in an async function
async function startServer() {
    // Connect to the database
    const database = await connectToDatabase();

    // Serve index.html and pass the logged-in user information
    app.get('/index.html', (req, res) => {
        const loggedInUser = req.session.loggedInUser || null; // Adjust this based on your session mechanism
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'register.html'));
    });

    app.post('/register', async (req, res) => {
        const username = req.body.user;
        const password = req.body.pass;

        if (username && password) {
            // Use the database connection to perform registration (insert into the 'users' collection)
            const usersCollection = database.collection('users');
            await usersCollection.insertOne({ username, password });

            res.redirect('/login.html');
        } else {
            res.redirect('/register.html?error=1');
        }
    });

    app.post('/login', async (req, res) => {
        const enteredUsername = req.body.user;
        const enteredPassword = req.body.pass;

        // Use the database connection to check login credentials (query the 'users' collection)
        const usersCollection = database.collection('users');
        const user = await usersCollection.findOne({ username: enteredUsername, password: enteredPassword });

        if (user) {
            // Set the logged-in user in the session
            req.session.loggedInUser = enteredUsername;

            // Respond with a success message
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

// Call the async function to start the server
startServer().catch((error) => {
    console.error('Error starting the server:', error);
});

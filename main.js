// Define a class representing a User with email, username, and password properties
class User {
    constructor(email, username, password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }
}

// Define a class containing static methods for signup and login functionalities
class Authentication {
    // Method to handle signup process
    static signup(event) {
        // Prevent default form submission behavior
        event.preventDefault();

        // Extract values from input fields
        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Create a user object using the User class
        const user = new User(email, username, password);

        // Stringify user object and store it in local storage with the username as the key
        const json = JSON.stringify(user);
        localStorage.setItem(username, json);

        // Show success message using SweetAlert2 library
        Swal.fire({
            title: 'Success',
            text: 'Signup Successful',
            icon: 'success',
            confirmButtonText: 'OK',
            width: 'fit-content'
        });
    }

    // Method to handle login process
    static login(event) {
        // Prevent default form submission behavior
        event.preventDefault();

        // Extract values from input fields
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const result = document.getElementById("result");

        // Retrieve user data from local storage using the username
        const user = localStorage.getItem(username);

        // Check if the username exists in local storage
        if (user === null) {
            // Username not found, show error message
            result.innerHTML = "Invalid username";
            Swal.fire({
                title: 'Failed',
                text: 'Invalid username',
                icon: 'error',
                confirmButtonText: 'OK',
                width: 'fit-content'
            });
        } else {
            // Parse the user data from JSON format
            const data = JSON.parse(user);

            // Check if the entered username and password match the stored data
            if (username === data.username && password === data.password) {
                // Successful login, update UI and show confirmation using SweetAlert2
                result.innerHTML = "Logged In Successfully";

                Swal.fire({
                    title: 'Are you sure?',
                    text: 'You will be logged in.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, login',
                    width: 'fit-content'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Store the logged-in user's username in local storage
                        localStorage.setItem("loggedInUser", data.username);

                        // Show success message and redirect to index.html
                        Swal.fire({
                            title: 'Success!',
                            text: 'Logged In Successfully',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            width: 'fit-content'
                        }).then(() => {
                            window.location.href = "index.html";
                        });
                    }
                });
            } else {
                // Incorrect password, show error message
                result.innerHTML = "Invalid Password";
                Swal.fire({
                    title: 'Failed',
                    text: 'Invalid Password',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    width: 'fit-content'
                });
            }
        }
    }
}

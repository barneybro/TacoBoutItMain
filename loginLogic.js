document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Array of objects with login data
        var login = [{ username: 'admin', password: 'admin' }];

        // Get the entered username and password
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        // Check if the entered credentials match the ones in the 'login' array
        var user = login.find(function (user) {
            return user.username === username && user.password === password;
        });

        if (user) {
            // Redirect to MenuManager.html if credentials are correct
            window.location.href = 'MenuManager.html';
        } else {
            // Show an alert or handle the incorrect credentials case
            window.location.href = 'menu.html';
        }
    });
});
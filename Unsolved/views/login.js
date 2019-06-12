window.onload = function() {
    alert('js connnected');
};
// sign in form

document.querySelector('#sign-in').addEventListener('click', function(event) {
    event.preventDefault();

    // Make a logininfo object
    var logininfo = {
        email: document.querySelector('#email').value.trim(),
        password: document.querySelector('#password').value.trim()

    };

    console.log(logininfo);

    // Send the POST request.
    fetch('http://localhost:300/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logininfo)
    }).then(function(response) {
        console.log(response);
    });
});

// user create form
document.querySelector("#btn").addEventListener("click", function(event) {
    event.preventDefault();
    // Make a logininfo object
    var signupinfo = {
        email: document.querySelector("#e-mail").value.trim(),
        password: document.querySelector("#pass").value.trim(),
    };
    console.log(signupinfo);
    // Send the POST request.
    fetch("http://localhost:300/user/create", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupinfo)
    }).then(function(res) {
        console.log(res)
    });
});
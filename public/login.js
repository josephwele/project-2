alert('connected')
document.querySelector('#btn').addEventListener('click', function(event) {
        event.preventDefault()
            // Make a logininfo object
        var signupinfo = {
                email: document.querySelector('#e-mail').value.trim(),
                password: document.querySelector('#pass').value.trim(),
                first: document.querySelector('#first-name').value.trim(),
                last: document.querySelector('#last-name').value.trim(),
                gender: document.querySelector('input[name=gender]:checked').value,
                birthdate: document.querySelector('input[name=birthdate]').value
            }
            // Send the POST request.
        fetch('http://localhost:3000/user/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupinfo)
        }).then(function(res) {
            console.log(res)
        })
    })
    // user login
    // Send the POST request.
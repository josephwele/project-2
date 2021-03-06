// user create form
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
    console.log(signupinfo)
        // Send the POST request.
    fetch('http://localhost:3000/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupinfo)
    }).then(function(res) {
        console.log(res)
    })
    document.querySelector('#e-mail').value = ''
    document.querySelector('#pass').value = ''
    document.querySelector('#first-name').value = ''
    document.querySelector('#last-name').value = ''
})
// login form
document.querySelector('#future-btn').addEventListener('click', function(event){
    event.preventDefault();
    //Ride information
    var rideInfo = {
      start: document.querySelector('#start').value.trim(),
      end: document.querySelector('#destination').value.trim(),
      number: document.querySelector('#phonenum').value.trim(),
      date: document.querySelector('input[name=date]').value,
      time: document.querySelector('input[name=time]').value
    }
    console.log(rideInfo);
    // Sending POST Request
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(rideInfo)
    }).then(function(response){
      fetch(response.url, {
        method: 'get'
      });
    });
  });
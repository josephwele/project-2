document.querySelector("#sign-in").addEventListener("click", function (event) {
    event.preventDefault();

    // Make a logininfo object
    var logininfo = {
      email: document.querySelector("#email").value.trim(),
      password: document.querySelector("#password").value.trim(),
    
    };

    console.log(logininfo);

    // Send the POST request.
    fetch("/user/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logininfo)
    }).then(function () {
      // On success, run the following code
      let newRow = `<div class="chirp"><p>${logininfo.author} chirped:</p><p>${logininfo.body}</p><p>At ${moment(logininfo.created_at).format("h:mma on dddd")}</p></div>`

      document.querySelector("#chirp-area").insertAdjacentHTML('afterbegin', newRow);

    });
    //sign up form
    
    document.querySelector("#btn").addEventListener("click", function (event) {
        event.preventDefault();
    
        // Make a logininfo object
        var signupinfo = {
          email: document.querySelector("#e-mail").value.trim(),
          password: document.querySelector("#pass").value.trim(),
        
        };
    
        console.log(signupinfo);
    
        // Send the POST request.
        fetch("/user/create", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signupinfo)
        }).then(function () {
          // On success, run the following code
          let newRow = `<div class="chirp"><p>${signupinfo.author} chirped:</p><p>${signupinfo.body}</p><p>At ${moment(signupinfo.created_at).format("h:mma on dddd")}</p></div>`
    
          document.querySelector("#chirp-area").insertAdjacentHTML('afterbegin', newRow);
    
        });
        
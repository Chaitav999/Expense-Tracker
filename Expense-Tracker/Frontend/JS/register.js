function registerUser(){

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(username === '') return; 
    if(email === '') return;
    if(password === '') return;

    fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/JSON"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    }).then(res => res.json())
      .then(response => {

      })
}

function continueAsGuest(){

    
}
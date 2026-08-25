function loginUser(){

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(email === '') return;
    if(password === '') return;

    fetch("https://expense-tracker-n009.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(res => {
        console.log(res);
        if(!res.ok){

            invalidLogin();
            password = '';
            throw new Error("Something went wrong!");
        }
        return res.json();
    })
      .then(response => {
        
        if(response.successStatus){
            localStorage.setItem("token", response.token);
            window.location.href = "main-page.html";
        } 
        
      })
}

function invalidLogin(){
    const error = document.querySelector('.login-error');

    error.innerHTML = `Incorrect username or password.`;
}
function registerUser(){

    displayloader();

    try{
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if(username === '') return; 
        if(email === '') return;
        if(password === '') return;

        fetch("https://expense-tracker-n009.onrender.com/register", {
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

            if(response.message === "Username already exists"){

                const error = document.querySelector('.username-error');
                error.innerHTML = response.message;

            } else if(response.message === "Email already exists"){

                const error = document.querySelector('.email-error');
                error.innerHTML = response.message;

            }else{
                window.location.href = "index.html";
                console.log("login successful");
            }
        })
    }finally{
        hideLoader();
    }
    
}

function displayloader(){
    document.querySelector('.loading-effect').classList.remove("hidden-loader");
}
function hideLoader(){
    document.querySelector('.loading-effect').classList.add("hidden-loader");
}
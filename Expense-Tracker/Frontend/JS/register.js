

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    


async function registerUser(){

    displayloader();

    try{
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        let usernameError = document.querySelector('.username-error');
        let emailError = document.querySelector('.email-error');

        usernameError.innerHTML = '';
        emailError.innerHTML = '';

        if(!emailPattern.test(email)) {
            hideLoader();
            emailError.innerHTML = "Please enter a valid email address."; 
            return;
    }

        if(username === '' || email === '' || password === ''){
            hideLoader();
            return; 
        }

        const res = await sendUserInfo(username, email, password);

        if(res.message === "Username already exists"){

            usernameError.innerHTML = res.message;

        } else if(res.message === "Email already exists"){

            emailError.innerHTML = res.message;

        }else{
            window.location.href = "index.html";
            
        } 

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
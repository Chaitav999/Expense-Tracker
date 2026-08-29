async function registerUser(){

    displayloader();

    try{
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if(username === '' || email === '' || password === ''){
            hideLoader();
            return; 
        }

        const res = await sendUserInfo(username, email, password);

        if(res.message === "Username already exists"){

            const error = document.querySelector('.username-error');
            error.innerHTML = res.message;

        } else if(res.message === "Email already exists"){

            const error = document.querySelector('.email-error');
            error.innerHTML = res.message;

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
async function loginUser(){
    displayloader();
    try{
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if(email === '') return;
        if(password === '') return;

        const res = await getLoginInfo(email, password);

            if(!res.successStatus){
                invalidLogin();
                throw new Error("Something went wrong!");
            }
            else{
                localStorage.setItem("token", res.token);
                window.location.href = "main-page.html";
            } 
            
    } finally{
        hideLoader();
    }
    
}

function invalidLogin(){
    const error = document.querySelector('.login-error');

    error.innerHTML = `Incorrect username or password.`;
}

function displayloader(){
    console.log("working displayloader");
    document.querySelector('.loading-effect').classList.remove("hidden-loader");
}
function hideLoader(){
    document.querySelector('.loading-effect').classList.add("hidden-loader");
}
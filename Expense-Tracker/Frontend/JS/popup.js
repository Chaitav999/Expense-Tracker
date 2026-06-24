function hidePopUp(){
    document.addEventListener('click', (event) => {

    const clickedInsideMenu =
        event.target.closest('.menu-container');

    if(!clickedInsideMenu){

        document.querySelectorAll('.dropdown-options')
            .forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });
}

function hidePopup1(){
    const hidePopup = document.getElementById("overlay");
      hidePopup.classList.add("hidden");
}

function successMessage(){
    const message = document.querySelector('.edit-successful');

    message.classList.remove("lost");

    setTimeout(() => {
        message.classList.add("lost");
    }, 2000);
}
function threeDots(button){

    const dropdownContainer = button.parentElement.querySelector('.dropdown-options'); // gets the parentelement of the clicked button
    const drop = dropdownContainer.classList.contains("show"); //boolean

    const dropDown = document.querySelectorAll('.dropdown-options') // gets all the dropdown option class 

    dropDown.forEach(list => {
        list.classList.remove("show") // hides all the dropdown menus
    })

    if(!drop){
        dropdownContainer.classList.add("show");
    }

    hidePopup();
}

/*-----Adding the loading effect -----*/
function displayloader(){
    document.querySelector('.loading-effect').classList.remove("hidden-loader");
}
function hideLoader(){
    document.querySelector('.loading-effect').classList.add("hidden-loader");
}


function showSummaryTab(){

    document
        .querySelector('.css-body')
        .classList.add('summary-open');
}

/*-----showing active button-----*/
const sidebarButtons = document.querySelectorAll(
    '.dash-button, .transaction-button, .summary-button'
);

function setActive(clickedButton){

    sidebarButtons.forEach(button => {
        button.classList.remove('active-button');
    });

    clickedButton.classList.add('active-button');
}

/* -----Show dashboard again----- */

document.querySelector('.dash-button')
.addEventListener('click', () => {

    document
        .querySelector('.css-body')
        .classList.remove('summary-open');

});

function displayTitle(monthName, yearNum){
    const title = document.querySelector('.summary-transaction-mainTitle');

    title.innerHTML = `
        <h1>
            Transaction History of ${monthName} - ${yearNum}
        </h1>
    `;
}

function removeCssStyle(){
    const summaryHeader = document.querySelector('.summary-transaction-header');
    summaryHeader.classList.remove("hide-summary");
}
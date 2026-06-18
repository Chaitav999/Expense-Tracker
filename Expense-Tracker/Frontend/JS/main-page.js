displayloader();
loadData(); //load transaction
loadSummary(); //loads summary of the account
setTimeout(() => {
    hideLoader();
}, 1000);

function sendData(){
    displayloader();
    const data = document.querySelector('.add-button')

    data.addEventListener('click', () => {
        const description = document.querySelector('.description-input')
        const desValue = description.value.trim();

        if(desValue === ''){ return; }

        const amount = document.querySelector('.amount-input')
        const amt = amount.value;

        if(amt === ''){ return; }

        let selectedRadio = document.querySelector('input[name=TransactionType]:checked');

        if(selectedRadio === null){ return; }

        fetch("http://localhost:8080/transactions" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                title: desValue,
                amount: amt,
                type: selectedRadio.value,
            
            }) //body closing

        }).then(res => res.json())
          .then(data => {
            loadData();
            loadSummary();
        }) //.then closing

        description.value = '';
        amount.value = '';
        selectedRadio.checked = false;

   }) //eventlistener closing

   setTimeout(() => { hideLoader(); }, 1000);
}

function loadSummary(){
    fetch("http://localhost:8080/summary")
      .then(res => res.json())
      .then(data => {
        
        document.querySelector('.balance')
          .innerHTML = `$${data.currBal.toFixed(2)}`;

        document.querySelector('.income-dashboard')
          .innerHTML = `$${data.income.toFixed(2)}`;

        document.querySelector('.expense-class')
          .innerHTML = `$${data.expense.toFixed(2)}`;
      })
}

let transactions = []
function loadData(){

    fetch("http://localhost:8080/transactions")
      .then(res => res.json())
      .then(data => {

        transactions = data;

        let displayData = ''

        data.forEach((element) => {

            const html = `
                <div class="transaction-row">

                    <div>${element.title}</div>

                    <div class="date-column">${element.date}</div>

                    <div>$${element.amount.toFixed(2)}</div>

                    <div class="${element.type}-type">
                        ${element.type}
                    </div>

                        <div class="menu-container">
                            <button class="three-dots" onclick="threeDots(this)">
                              &#8942
                            </button>

                            <div class="dropdown-options">
                                <button class="edit-button" onclick="editTransaction(${element.id})">
                                  <img class="edit-img" src="Images/edit-icon.png">
                                </button>

                                <button class="delete-button" onclick="
                                  deleteTransaction(${element.id});
                                ">
                                  <img class="delete-img" src="Images/delete.png">
                                </button>
                            </div>
                        </div>
                </div>
            `;

            displayData += html;
        });
          
        document.querySelector('.dynamic-transaction')
          .innerHTML = displayData;
      })
}

function deleteTransaction(idx){
    displayloader()
    fetch(`http://localhost:8080/transactions/${idx}`, {
        method: "DELETE"
    }).then(res => {
        loadData();
        loadSummary();
    })
    hideLoader();
}

// ----- After clicking transaction button -----
const transactionBtn = document.querySelector('.transaction-button');

transactionBtn.addEventListener('click', () => {
    document.querySelector('.css-body')
        .classList.toggle('transaction-view');
});

/*----- shows the dropdown menu after clicking three dots at transaction row -----*/
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
}

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


let editId = null;
function editTransaction(id){
    editId = id;
    const transaction = transactions.find(element => element.id === id);
    
    const displayPopup = document.getElementById("overlay");
    displayPopup.classList.remove("hidden");

    document.getElementById("edit-title")
      .value = transaction.title;
    document.getElementById("edit-amount")
      .value = transaction.amount;
    document.getElementById("edit-date")
      .value = transaction.date;

    if(transaction.type === "expense"){
        document.getElementById("edit-expense")
          .checked = true;
    } else{
        document.getElementById("edit-income")
          .checked = true;
    }
}

function sendUpdatedTransaction(){
    displayloader()
    const newTitle = document.querySelector('.title-input').value;

    const newAmt = document.querySelector('.amt-input').value;

    const newType = document.querySelector('input[name=edit-type]:checked');

    fetch(`http://localhost:8080/transactions/${editId}`, {
        method: "PUT",
        headers: {
            'Content-Type' : 'application/JSON'
        },
        body: JSON.stringify({
            title: newTitle,
            amount: newAmt,
            type: newType.value,
        })
    })
      .then(data => {
        loadData();
        loadSummary();
      })
    hideLoader()  
    successMessage();
    hidePopup();
}

function hidePopup(){
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

/*-----Adding the loading effect -----*/
function displayloader(){
    document.querySelector('.loading-effect').classList.remove("hidden-loader");
}
function hideLoader(){
    document.querySelector('.loading-effect').classList.add("hidden-loader");
}

/*-----Showing summary tab-----*/

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

function getMonthlySummary(){
    const month = document.querySelector('.month-select').value;
    const year = document.querySelector('.year-select').value;

    if(month === '' || year === ''){
        alert("Please select a date and a year!");
        return;
    }

    fetch(`http://localhost:8080/monthly-summary?month=${month}&year=${year}`)
      .then(res => res.json())
      .then(data => {
        
        document.querySelector('.monthly-balance')
         .innerHTML = `$${data.currBal.toFixed(2)}`;

        document.querySelector('.monthly-expense')
         .innerHTML = `$${data.expense.toFixed(2)}`;

        document.querySelector('.monthly-income')
         .innerHTML = `$${data.income.toFixed(2)}`;
      });
}
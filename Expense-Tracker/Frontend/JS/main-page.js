loadData(); //load transaction
loadSummary(); //loads summary of the account

function sendData(){
    const data = document.querySelector('.add-button')

    data.addEventListener('click', () => {
        const description = document.querySelector('.description-input')
        const desValue = description.value.trim();

        if(desValue === ''){
            return;
        }

        const amount = document.querySelector('.amount-input')
        const amt = amount.value;

        if(amt === ''){
            return;
        }

        let selectedRadio = document.querySelector('input[name=TransactionType]:checked');
        if(selectedRadio === null){
            return;
        }


        fetch("http://localhost:8080/transactions" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: desValue,
                amount: amt,
                type: selectedRadio.value,
            
            })
        }).then(res => res.json())
        .then(data => {
            loadData();
            loadSummary();
        })

        description.value = '';
        amount.value = '';
        selectedRadio.checked = false;
   })
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

function loadData(){

    fetch("http://localhost:8080/transactions")
      .then(res => res.json())
      .then(data => {

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

                    <div class="delete-button-div">
                        

                        <div class="menu-container">
                            <button class="three-dots" onclick="threeDots(this)">
                              &#8942
                            </button>

                            <div class="dropdown-options">
                                <button >Edit</button>

                                <button class="delete-button" onclick="
                                  deleteTransaction(${element.id});
                                ">
                                  <img class="delete-img" src="Images/delete.png">
                                </button>
                            </div>
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

    fetch(`http://localhost:8080/transactions/${idx}`, {
        method: "DELETE"
    }).then(res => {
        loadData();
        loadSummary();
    })
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


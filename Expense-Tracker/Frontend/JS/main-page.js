const token = localStorage.getItem("token");

if(token === null && !sessionStorage.getItem("guest")){
    window.location.href = "index.html";
}

displayloader();
let transactions = [] // saving transaction data for editing tasks later..
loadData(); //load transaction
loadSummary(); //loads summary of the account

hideLoader();


async function sendData(){
    displayloader();
        
    try{
        const {desValue, amt, selectedRadio} = getInput();

        await sendTransactionApi({
            title: desValue,
            amount: Number(amt),
            type: selectedRadio.value
        });
        resetInput();
        await loadData();
        await loadSummary();
    }
        
    finally{
        hideLoader();
    }

}

async function loadSummary(){
    const data = await getSummaryData();
        
        document.querySelector('.balance')
          .innerHTML = `$${data.currBal.toFixed(2)}`;

        document.querySelector('.income-dashboard')
          .innerHTML = `$${data.income.toFixed(2)}`;

        document.querySelector('.expense-class')
          .innerHTML = `$${data.expense.toFixed(2)}`;
    
}


async function loadData(){

    const data = await getData();

        transactions = data; // saved transaction data for editing tasks later..
        let displayData = ''

        data.forEach((element) => {
            displayData += createTransactionRow(element);
        });
          
        document.querySelector('.dynamic-transaction')
          .innerHTML = displayData;
}

async function deleteTransaction(idx){
    displayloader()

    try{
        await deleteTransactionApi(idx);

        await loadData();
        await loadSummary();
        await getMonthlySummary();
    }
    finally{
        hideLoader();
    }
    
}

// ----- After clicking transaction button -----
const transactionBtn = document.querySelector('.transaction-button');

transactionBtn.addEventListener('click', () => {
    document.querySelector('.css-body')
        .classList.add('transaction-view');

    // hides summary tab if open
    document
        .querySelector('.css-body')
        .classList.remove('summary-open');
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

async function sendUpdatedTransaction(){
    displayloader()
    try{
        const newTitle = document.querySelector('.title-input').value;

        const newAmt = document.querySelector('.amt-input').value;

        const newType = document.querySelector('input[name=edit-type]:checked');

        await editTransactionApi(editId, {
            newTitle,
            newAmt,
            newType
        });

        
        await loadData();
        await loadSummary();
        successMessage();
    }
    finally{
        hideLoader();
        hidePopup1();
    }
}

async function getMonthlySummary(){
    displayloader();

    try{
        const month = document.querySelector('.month-select').value;
        const year = document.querySelector('.year-select').value;

        const data = await getMonthlySummaryData(month, year);
            
            document.querySelector('.monthly-balance')
            .innerHTML = `$${data.currBal.toFixed(2)}`;

            document.querySelector('.monthly-expense')
            .innerHTML = `$${data.expense.toFixed(2)}`;

            document.querySelector('.monthly-income')
            .innerHTML = `$${data.income.toFixed(2)}`;

        getTransactionHistory(month, year);
        
    }finally{
        hideLoader();
    }
}


async function getTransactionHistory(month, year){
    
    let displayData ='';

    const selectedMonth = document.querySelector('.month-select');
    const monthName = selectedMonth.options[selectedMonth.selectedIndex].text;
    
    const selectedYear = document.querySelector('.year-select');
    const yearNum = selectedYear.options[selectedYear.selectedIndex].text;

    displayTitle(monthName, yearNum); // show the heading (Eg: Transaction History of {month}-{year})

    const data = await getMonthlyTransactionHistory(month, year);

        if(data.length === 0){
            document.querySelector('.summary-transaction-header')
              .classList.add("hide-summary");
            document.querySelector('.summary-dynamic-transaction')
             .innerHTML = `
                <h2>
                    No transactions found for this month.
                </h2>
             `;
            return;
        }
        
        removeCssStyle(); //remove hide-summary to display the transaction header

        data.forEach((element) => {

            displayData += createTransactionRow(element);
        })

        document.querySelector('.summary-dynamic-transaction')
         .innerHTML = displayData;
}

function logout(){

    if(sessionStorage.getItem("guest")){
        sessionStorage.removeItem("guest");
        sessionStorage.removeItem("guestTransactions");
    }else{
        localStorage.removeItem("token");
    }

    window.location.href = "index.html";
}

function toggleSidebar(){
    document.querySelector(".css-body").classList.toggle("sidebar-open");
}
function getInput(){
    const description = document.querySelector('.description-input');
        const desValue = description.value.trim();

        const amount = document.querySelector('.amount-input')
        const amt = amount.value;

        const selectedRadio = document.querySelector('input[name=TransactionType]:checked');

     /*   if(selectedRadio === null){
            alert("Please select Income or Expense");
            return;
        } */

    return {
        desValue,
        amt,
        selectedRadio
    };
}

function resetInput(){
    document.querySelector('.description-input')
        .value = '';

    document.querySelector('.amount-input')
        .value = '';

    const selectedRadio = document.querySelector(
        'input[name=TransactionType]:checked'
    );

    if(selectedRadio){
        selectedRadio.checked = false;
    }
}

function createTransactionRow(element){
    return `

            <div class="transaction-row">

                <div>${element.title}</div>

                <div class="date-column">${element.date}</div>

                <div>$${element.amount}</div>

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
}

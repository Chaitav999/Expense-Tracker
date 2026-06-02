loadData();

const data = document.querySelector('.add-button')

data.addEventListener('click', () => {
    const description = document.querySelector('.description-input')
    const desValue = description.value;

    if(desValue === ''){
        return;
    }

    const amount = document.querySelector('.amount-input')
    const amt = amount.value;

    if(amt === null){
        return;
    }

    const selectedRadio = document.querySelector('input[name=TransactionType]:checked');
    if(selectedRadio.value === null){
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
            type: selectedRadio.value
        })
    }).then(res => res.json())
      .then(data => {
        loadData();
      })

      desValue.innerHTML = '';
      amt.value = '';
      selectedRadio.value = '';
})


function loadData(){

    fetch("http://localhost:8080/transactions")
      .then(res => res.json())
      .then(data => {

        let displayData = ''

        data.forEach((element) => {
            const html = `
                <div class="transaction-row">

                    <div>${element.title}</div>

                    <div>May 2026</div>

                    <div>$${element.amount}</div>

                    <div class="${element.type}-type">
                        ${element.type}
                    </div>

                    <div>
                        <button class="delete-button" onclick="
                          deleteTransaction(${element.id});
                        ">
                            Delete
                        </button>
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
    }).then(res => {loadData()})
      .catch(console.error("error")
      );
}
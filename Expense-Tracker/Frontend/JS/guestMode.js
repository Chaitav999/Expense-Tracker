function guestMode(){

    sessionStorage.setItem("guest", "true");
    sessionStorage.removeItem("guestTransactions");
    window.location.href = "main-page.html";
}

function getGuestTransactions(){
    const data = sessionStorage.getItem("guestTransactions");

    if(!data){
        return [];
    }

    const transactions = JSON.parse(data);

    transactions.forEach(transaction => {
        transaction.amount = Number(transaction.amount);
    });

    return transactions;
}

function calGuestSummary(transactionArray){
    let summary = {
            income: Number(0),
            expense: Number(0),
            currBal: Number(0)
        };

        transactionArray.forEach(transaction => {
            
            if(transaction.type === "expense"){
                summary.expense += transaction.amount;
            }else if(transaction.type === "income"){
                summary.income += transaction.amount;
            }
        });

        summary.currBal = summary.income - summary.expense;

    return summary;
}

function editGuestTransaction(editId, updatedData){
    const transactions = sessionStorage.getItem("guestTransactions");

        let transactionArray;

        if(!transactions){
            transactionArray = [];
        } else{
            transactionArray = JSON.parse(transactions);
        }

        const updatedTransaction = transactionArray.forEach(transaction => {
            
            if(transaction.id === editId){

                transaction.title = updatedData.newTitle;
                transaction.amount = updatedData.newAmt;
                transaction.type = updatedData.newType.value;
            }    
        });

        sessionStorage.setItem("guestTransactions", JSON.stringify(transactionArray));

        return updatedTransaction;
}

function deleteGuestTransaction(id){
    let transactionArray;
        const transactions = sessionStorage.getItem("guestTransactions");

        if(!transactions){
            transactionArray = [];
        } else{
            transactionArray = JSON.parse(transactions);
        }

        const updatedTransaction = transactionArray.filter(transaction => {
            
            return transaction.id !== id;
        });

        sessionStorage.setItem("guestTransactions", JSON.stringify(updatedTransaction));
        return updatedTransaction;
}

function storeGuestTransactions(transaction){
    
        transaction.id = Date.now();
        transaction.date = new Date().toISOString().split("T")[0];

        const guestTransactions = sessionStorage.getItem("guestTransactions");
        let transactions;

        if(!guestTransactions){
            transactions = [];
        }else{
            transactions = JSON.parse(guestTransactions);
        }

        transactions.push(transaction);

        sessionStorage.setItem("guestTransactions", JSON.stringify(transactions));

        return transaction;
}

function getGuestData(){
    const guestTransactions = sessionStorage.getItem("guestTransactions");

    if(!guestTransactions){
        return [];
    }
    return JSON.parse(guestTransactions);
}
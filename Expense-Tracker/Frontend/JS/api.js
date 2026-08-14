const url = "http://localhost:8080";

async function getData(){
    //logic for guest
    if(sessionStorage.getItem("guest")){
        return getGuestData();
    }
    
    //logic for logged-in user
    const response = await fetch(`${url}/transactions`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    const data = await response.json();

    return data;
}

async function sendTransactionApi(transaction){

    //logic for guest
    if(sessionStorage.getItem("guest")){
        return storeGuestTransactions(transaction);
    }
    
    //logic for logged-in user
    const response = await fetch(`${url}/transactions`, {
        method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction) 
    });

    return await response.json();
}

async function getSummaryData(){

    // code for guests
    if(sessionStorage.getItem("guest")){
        const transactionArray = getGuestTransactions();

        return calGuestSummary(transactionArray);
    }

    // code for logged-in user
    const response = await fetch(`${url}/summary`, {
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    const data = await response.json();

    return data;
}

async function getMonthlySummaryData(month, year){

    // code for guests
    if(sessionStorage.getItem("guest")){

        const transactionArray = getGuestTransactions();
        const selectedMonth = Number(month);
        const selectedYear = Number(year);

        const monthlyTransactions = transactionArray.filter(transaction => {
            const date = new Date(transaction.date);
            
            return date.getMonth() === selectedMonth - 1 && date.getFullYear() === selectedYear;
        });

        return calGuestSummary(monthlyTransactions);
    }

    // code for logged-in user
    const response = await fetch(`${url}/monthly-summary?month=${month}&year=${year}`, {
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
        });
    const data = await response.json();

    return data;
}

async function getMonthlyTransactionHistory(month, year){

    // code for guests
    if(sessionStorage.getItem("guest")){
        const transactionArray = getGuestTransactions();
        const selectedMonth = Number(month);
        const selectedYear = Number(year);

        const monthlyTransactions = transactionArray.filter(transaction => {
            const date = new Date(transaction.date);

            return date.getMonth() === selectedMonth - 1 && date.getFullYear() === selectedYear;
        });

        return monthlyTransactions;
    }

    // code for logged-in user
    const response = await  fetch(`http://localhost:8080/monthly-summary-transactionHistory?month=${month}&year=${year}`, {
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
        });
    const data = await response.json();

    return data;
}

async function deleteTransactionApi(id){

    // code for guests
    if(sessionStorage.getItem("guest")){
        return deleteGuestTransaction(id);
    }

    // code for logged-in user
    const response = await fetch(`http://localhost:8080/transactions/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    
    return response;
}

async function editTransactionApi(editId, updatedData){

    // code for guests
    if(sessionStorage.getItem("guest")){
        return editGuestTransaction(editId, updatedData);
    }

    // code for logged-in user
    const response = await fetch(`http://localhost:8080/transactions/${editId}`, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            'Content-Type' : 'application/JSON'
        },
        body: JSON.stringify({
            title: updatedData.newTitle,
            amount: updatedData.newAmt,
            type: updatedData.newType.value,
        })
    });

    const data = await response.json();

    return data;
}
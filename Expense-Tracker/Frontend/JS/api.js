const url = "https://expense-tracker-n009.onrender.com";

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
    const response = await  fetch(`${url}/monthly-summary-transactionHistory?month=${month}&year=${year}`, {
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
    const response = await fetch(`${url}/transactions/${id}`, {
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
    const response = await fetch(`${url}/transactions/${editId}`, {
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

async function getLoginInfo(email, password){

    const response = await fetch("https://expense-tracker-n009.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

    console.log(response);
    const res = await response.json();
    console.log(res);
    return res;
}

async function sendUserInfo(username, email, password){
    const response = await fetch("https://expense-tracker-n009.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/JSON"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
    
    const res = await response.json();

    return res;
}
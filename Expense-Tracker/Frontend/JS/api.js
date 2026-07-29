const url = "http://localhost:8080";

async function getData(){
    const response = await fetch(`${url}/transactions`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    const data = await response.json();

    return data;
}

async function sendTransactionApi(transaction){
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
    const response = await fetch(`${url}/summary`, {
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    const data = await response.json();

    return data;
}

async function getMonthlySummaryData(month, year){
    const response = await fetch(`${url}/monthly-summary?month=${month}&year=${year}`, {
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
        });
    const data = await response.json();

    return data;
}

async function getMonthlyTransactionHistory(month, year){
    const response = await  fetch(`http://localhost:8080/monthly-summary-transactionHistory?month=${month}&year=${year}`, {
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
        });
    const data = await response.json();

    return data;
}

async function deleteTransactionApi(idx){
    const response = await fetch(`http://localhost:8080/transactions/${idx}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    
    return response;
}

async function editTransactionApi(editId, updatedData){
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
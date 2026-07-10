package com.example.Expense_Tracker.DTO;

public class ApiResponse {
    
    private boolean success;
    private String message;

    public ApiResponse(){}

    public ApiResponse(boolean success, String message){
        this.success = success;
        this.message = message;
    }

    public boolean getSuccessStatus(){
        return success;
    }
    public String getMessage(){
        return message;
    }

    public void setSuccessStatus(boolean success){
        this.success = success;
    }
    public void setMessage(String message){
        this.message = message;
    }
    
}

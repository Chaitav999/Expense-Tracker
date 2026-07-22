package com.example.Expense_Tracker.DTO;

public class ApiResponse {
    
    private boolean success;
    private String message;
    private String token;

    public ApiResponse(){}

    public ApiResponse(boolean success, String message, String token){
        this.success = success;
        this.message = message;
        this.token = token;
    }

    public boolean getSuccessStatus(){
        return success;
    }
    public String getMessage(){
        return message;
    }
    public String getToken(){
        return token;
    }

    public void setToken(String token){
        this.token = token;
    }
    public void setSuccessStatus(boolean success){
        this.success = success;
    }
    public void setMessage(String message){
        this.message = message;
    }
    
}

package com.example.Expense_Tracker.controller;


public class Summary {
    
    protected double income;
    protected double expense;
    protected double currBal;

    public Summary(){

    }

    public Summary(double income, double expense, double currBal){
        this.income = income;
        this.expense = expense;
        this.currBal = currBal;
    } 

    public Double getIncome(){
        return income;
    }
    public Double getExpense(){
        return expense;
    }
    public Double getCurrBal(){
        return currBal;
    }

    public void setIncome(double income){
        this.income = income;
    }
    public void setExpense(double expense){
        this.expense = expense;
    }
    public void setCurrBal(double currBal){
        this.currBal = currBal;
    }
}

package com.example.Expense_Tracker.controller;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ExpenseData {
    
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    public String title;
    public double amount;
    public boolean isIncome;
    public boolean isExpense;

    public ExpenseData(){

    }

    public ExpenseData(String title, double amount, boolean isIncome, boolean isExpense){
        this.title = title;
        this.amount = amount;
        this.isIncome = isIncome;
        this.isExpense = isExpense;
    }

    public String getTitle(){
        return title;
    }
    public double getAmount(){
        return amount;
    }
    public boolean isIncome(){
        return isIncome;
    }
    public boolean isExpense(){
        return isExpense;
    }

    public void setTitle(String title){
        this.title = title;
    }
    public void setAmount(double amount){
        this.amount = amount;
    }
    public void isIncome(boolean isIncome){
        this.isIncome = isIncome;
    }
    public void isExpense(boolean isExpense){
        this.isExpense = isExpense;
    }
}


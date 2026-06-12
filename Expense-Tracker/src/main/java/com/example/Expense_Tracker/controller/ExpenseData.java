package com.example.Expense_Tracker.controller;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ExpenseData {
    
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    private String title;
    private double amount;
    private String type;
    private LocalDate date;

    public ExpenseData(){

    }

    public ExpenseData(String title, double amount, String type, LocalDate date){
        this.title = title;
        this.amount = amount;
        this.type = type;
        this.date = date;
    }

    public String getTitle(){
        return title;
    }
    public double getAmount(){
        return amount;
    }
    public String getType(){
        return type;
    }
    public long getId(){
        return id;
    }
    public LocalDate getDate(){
        return date;
    }

    
    public void setTitle(String title){
        this.title = title;
    }
    public void setAmount(double amount){
        this.amount = amount;
    }
    public void setType(String type){
        this.type = type;
    }
    public void setId(long id){
        this.id = id;
    }
    public void setDate(LocalDate date){
        this.date = date;
    }

}
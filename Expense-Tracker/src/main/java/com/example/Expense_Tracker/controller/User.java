package com.example.Expense_Tracker.controller;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    private String email;
    private String username;
    private String password;

    @OneToMany(mappedBy="user")
    private List<ExpenseData> transactions;

    public String getUsername(){
        return username;
    }
    public String getEmail(){
        return email;
    }
}

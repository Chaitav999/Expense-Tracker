package com.example.Expense_Tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Expense_Tracker.controller.ExpenseData;

public interface DataRepository extends JpaRepository<ExpenseData, Long>{
    
}

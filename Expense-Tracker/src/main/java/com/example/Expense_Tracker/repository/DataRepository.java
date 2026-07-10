package com.example.Expense_Tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Expense_Tracker.entity.ExpenseData;

public interface DataRepository extends JpaRepository<ExpenseData, Long>{
    
}

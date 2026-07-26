package com.example.Expense_Tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Expense_Tracker.entity.ExpenseData;
import com.example.Expense_Tracker.entity.User;

public interface DataRepository extends JpaRepository<ExpenseData, Long>{
    
    List<ExpenseData> findByUser(User user);
}

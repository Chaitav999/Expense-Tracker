package com.example.Expense_Tracker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Expense_Tracker.entity.ExpenseData;
import com.example.Expense_Tracker.entity.User;

public interface DataRepository extends JpaRepository<ExpenseData, Long>{
    
    List<ExpenseData> findByUser(User user);
    Optional<ExpenseData> findByIdAndUser(long id, User user);
}

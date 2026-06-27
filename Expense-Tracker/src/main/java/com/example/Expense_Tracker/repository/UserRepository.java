package com.example.Expense_Tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Expense_Tracker.controller.User;

public interface UserRepository extends JpaRepository<User, Long>{
    
    private boolean userAvailable(){

        

        return false;
    }
}

package com.example.Expense_Tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Expense_Tracker.entity.User;


public interface UserRepository extends JpaRepository<User, Long>{
    
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    User findByUsername(String username);
}

package com.example.Expense_Tracker.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Expense_Tracker.entity.User;



public interface UserRepository extends JpaRepository<User, Long>{
    
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    User findByUsername(String username);
    Optional<User> findByEmail(String email);
}

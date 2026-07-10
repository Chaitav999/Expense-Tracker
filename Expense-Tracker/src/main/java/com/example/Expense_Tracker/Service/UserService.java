package com.example.Expense_Tracker.Service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Expense_Tracker.DTO.ApiResponse;
import com.example.Expense_Tracker.entity.User;
import com.example.Expense_Tracker.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository repository;
    private final BCryptPasswordEncoder encoder;

    public UserService(UserRepository repository, BCryptPasswordEncoder encoder){
        this.repository = repository;
        this.encoder = encoder;
    }

    public ResponseEntity<ApiResponse> register(User user){
        
        ApiResponse response = new ApiResponse();
        
        if(repository.existsByUsername(user.getUsername())){
            response.setSuccessStatus(false);
            response.setMessage("Username already exists");
            return ResponseEntity.badRequest().body(response);
        }

        if(repository.existsByEmail(user.getEmail())){
            response.setSuccessStatus(false);
            response.setMessage("Email already exists");
            return ResponseEntity.badRequest().body(response);
        }
        
        user.setPassword(encoder.encode(user.getPassword()));

        System.out.println(user.getPassword());

        repository.save(user);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ApiResponse> verifyUser(User user){

        ApiResponse response = new ApiResponse();

        if(!repository.existsByEmail(user.getEmail()) || !repository.existsByUsername(user.getUsername())){
            response.setSuccessStatus(false);
            response.setMessage("Invalid username or password");
            return ResponseEntity.badRequest().body(response);
        }else{
            
        }

        return ResponseEntity.ok(response);
    }
}

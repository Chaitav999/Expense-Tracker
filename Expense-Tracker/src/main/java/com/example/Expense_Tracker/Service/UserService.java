package com.example.Expense_Tracker.Service;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Expense_Tracker.DTO.ApiResponse;
import com.example.Expense_Tracker.DTO.LoginRequest;
import com.example.Expense_Tracker.entity.User;
import com.example.Expense_Tracker.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository repository;
    private final BCryptPasswordEncoder encoder;
    private final JWTService jwt;

    public UserService(UserRepository repository, BCryptPasswordEncoder encoder, JWTService jwt){
        this.repository = repository;
        this.encoder = encoder;
        this.jwt = jwt;
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

    public ResponseEntity<ApiResponse> login(LoginRequest loginRequest){

        ApiResponse response = new ApiResponse();
        Optional<User> optionalUser = repository.findByEmail(loginRequest.getEmail());

        if(!optionalUser.isPresent()){
            return invalidCredentials(response);
        }

        User user = optionalUser.get();

        if(!encoder.matches(loginRequest.getPassword(), user.getPassword())){
            return invalidCredentials(response);
        }

        String token = jwt.generateToken(user);
        
        response.setSuccessStatus(true);
        response.setMessage("Login successful.");
        response.setToken(token);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ApiResponse> invalidCredentials(ApiResponse response){

        response.setSuccessStatus(false);
        response.setMessage("Invalid email or password.");
        return ResponseEntity.badRequest().body(response);
    }
}

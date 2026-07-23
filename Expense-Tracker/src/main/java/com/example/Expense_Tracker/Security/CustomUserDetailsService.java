package com.example.Expense_Tracker.Security;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.Expense_Tracker.entity.User;
import com.example.Expense_Tracker.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService{
    
    private final UserRepository repository;

    public CustomUserDetailsService(UserRepository repository){
        this.repository = repository;
    }

    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<User> optionalUser = repository.findByEmail(email);

        if(optionalUser.isEmpty()){
            throw new UsernameNotFoundException("User not found.");
        }

        return new CustomUserDetails(optionalUser.get());
    }
}

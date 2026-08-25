package com.example.Expense_Tracker.Config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.Expense_Tracker.Security.JwtAuthenticationFilter;

@Configuration
@EnableConfigurationProperties(JwtProperties.class)
public class SecurityConfig {
    
    private final JwtAuthenticationFilter authenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter authenticationFilter){
        this.authenticationFilter = authenticationFilter;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable());

        http.cors(Customizer.withDefaults());
        
        http.authorizeHttpRequests(auth -> {

            auth.requestMatchers("/register", "/login").permitAll();
            auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();

            auth.anyRequest().authenticated();
        });

        http.addFilterBefore(authenticationFilter, 
                             UsernamePasswordAuthenticationFilter.class
        );
        
        return http.build();
    }

}

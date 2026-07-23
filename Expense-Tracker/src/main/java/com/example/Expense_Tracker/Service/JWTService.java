package com.example.Expense_Tracker.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import com.example.Expense_Tracker.Config.JwtProperties;
import com.example.Expense_Tracker.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {
    
    private final JwtProperties properties;

    public JWTService(JwtProperties properties){
        this.properties = properties;
    }

    public String generateToken(User user){
        Key key = Keys.hmacShaKeyFor(properties.getSecret().getBytes(StandardCharsets.UTF_8)); //creates cryptographic key

        return Jwts.builder()
                .subject(user.getEmail())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + properties.getExpiration()))
                .signWith(key)
                .compact();
    }

    public boolean isValidToken(String token){
        try{
            extractAllClaims(token);
            return true;
        } catch(JwtException | IllegalArgumentException e){
            return false;
        }
    }

    public String extractEmail(String jwt) {
        Claims claims = extractAllClaims(jwt);
        return claims.getSubject();
    }

    private Claims extractAllClaims(String token){

        SecretKey key = Keys.hmacShaKeyFor(properties.getSecret().getBytes(StandardCharsets.UTF_8));

        return  Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
    }
}

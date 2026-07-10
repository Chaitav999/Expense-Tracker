package com.example.Expense_Tracker.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Expense_Tracker.DTO.ApiResponse;
import com.example.Expense_Tracker.Service.Summary;
import com.example.Expense_Tracker.Service.TransactionService;
import com.example.Expense_Tracker.Service.UserService;
import com.example.Expense_Tracker.entity.ExpenseData;


@CrossOrigin(origins="*")
@RestController
public class ExpenseController {
    
    private UserService userService;
    private TransactionService transactionService;

    public ExpenseController(UserService userService, TransactionService transactionService){
        this.userService = userService;
        this.transactionService = transactionService;
    }
    
    @GetMapping("/transactions")
    public List<ExpenseData> getData(){
        return transactionService.getTransactionData();
    }

     @GetMapping("/summary")
    public Summary calculateSummary() {      //calculates expense, income and current balance
        return transactionService.calSummary();
    }


    /*-----Return the month's income, expense and currBal----- */
    @GetMapping("/monthly-summary")
    public Summary calculateMonthlyData(@RequestParam int month, @RequestParam int year) {
        return transactionService.calMonthlyData(month, year);
    }
    
    @GetMapping("/monthly-summary-transactionHistory")
    public List<ExpenseData> calculateMonthlyExpense(@RequestParam int month, @RequestParam int year) {
        
        return transactionService.calMonthlyExpense(month, year);
    }
    

    @PutMapping("transactions/{id}")
    public List<ExpenseData> editTransaction(@PathVariable long id, @RequestBody ExpenseData data) {
        //TODO: process PUT request

        return transactionService.updateTransaction(id, data);
    }

    @PostMapping("/transactions")
    public List<ExpenseData> saveData(@RequestBody ExpenseData data) {
        //TODO: process POST request

        return transactionService.postData(data);
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(@RequestBody User user) {
        
        ResponseEntity<ApiResponse> response = userService.register(user);

        return response;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> loginUser(@RequestBody User user) {
        //TODO: process POST request
        
        return userService.verifyUser(user);
    }
    

    @DeleteMapping("/transactions/{idx}")
    public List<ExpenseData> deleteTransaction(@PathVariable long idx){

        return transactionService.delTransaction(idx);
    }
    
}

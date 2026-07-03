package com.example.Expense_Tracker.controller;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
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

import com.example.Expense_Tracker.repository.DataRepository;
import com.example.Expense_Tracker.repository.UserRepository;




@CrossOrigin(origins="*")
@RestController
public class ExpenseController {
    
    private DataRepository repository;
    private UserRepository userRepository;

    public ExpenseController(DataRepository repository, UserRepository userRepository){
        this.repository = repository;
        this.userRepository = userRepository;
    }
    
    @GetMapping("/transactions")
    public List<ExpenseData> getData(){
        return repository.findAll();
    }

     @GetMapping("/summary")
    public Summary calculateSummary() {      //calculates expense, income and current balance
        List<ExpenseData> transactions = repository.findAll();
        Summary summary = new Summary();
        
        for(ExpenseData transaction : transactions){
            if(transaction.getType().equals("income")){
                summary.income += transaction.getAmount();
            }
            
            if(transaction.getType().equals("expense")){
                summary.expense += transaction.getAmount();
            }
        }
        summary.currBal = summary.income - summary.expense;

        return summary;
    }


    /*-----Return the month's income, expense and currBal----- */
    @GetMapping("/monthly-summary")
    public Summary calculateMonthlyData(@RequestParam int month, @RequestParam int year) {

        Summary summary = new Summary();
        List<ExpenseData> transactions = repository.findAll();
        
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.with(TemporalAdjusters.lastDayOfMonth());
        
        for(ExpenseData transaction : transactions){
            LocalDate transDate = transaction.getDate();

            if(!transDate.isBefore(startDate) && !transDate.isAfter(endDate)){
                if(transaction.getType().equals("income")){

                    summary.income += transaction.getAmount();

                }else if (transaction.getType().equals("expense")) {

                    summary.expense += transaction.getAmount();
                    
                }
            }
        }
        summary.currBal = summary.income - summary.expense;
        return summary;
    }
    
    @GetMapping("/monthly-summary-transactionHistory")
    public List<ExpenseData> calculateMonthlyExpense(@RequestParam int month, @RequestParam int year) {
        
        List<ExpenseData> transactions = repository.findAll();
        List<ExpenseData> sendData = new ArrayList<>();

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.with(TemporalAdjusters.lastDayOfMonth());

        for(ExpenseData transaction : transactions){
            LocalDate transactionDate = transaction.getDate();

            if(!transactionDate.isBefore(startDate) && !transactionDate.isAfter(endDate)){ //check if the transaction belongs to given month
                sendData.add(transaction); //add it to the arraylist O(1).
            }
        }
            return sendData;
    }
    

    @PutMapping("transactions/{id}")
    public List<ExpenseData> putMethodName(@PathVariable long id, @RequestBody ExpenseData data) {
        //TODO: process PUT request

        ExpenseData transData = repository.findById(id).get();

        transData.setTitle(data.getTitle());
        transData.setAmount(data.getAmount());
        transData.setType(data.getType());

        repository.save(transData);
        
        return repository.findAll();
    }

    @PostMapping("/transactions")
    public List<ExpenseData> postMethodName(@RequestBody ExpenseData data) {
        //TODO: process POST request

        data.setDate(LocalDate.now());
        
        repository.save(data);

        return repository.findAll();
    }

    @DeleteMapping("/transactions/{idx}")
    public List<ExpenseData> deleteTransaction(@PathVariable long idx){

        repository.deleteById(idx);

        return repository.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(@RequestBody User user) {
        
        ApiResponse response = new ApiResponse();
        
        if(userRepository.existsByUsername(user.getUsername())){
            response.setSuccessStatus(false);
            response.setMessage("Username already exists.");
            return ResponseEntity.badRequest().body(response);
        }
        if(userRepository.existsByEmail(user.getEmail())){
            response.setSuccessStatus(false);
            response.setMessage("Email already exists.");
            return ResponseEntity.badRequest().body(response);
        }

        response.setSuccessStatus(true);
        response.setMessage("Registered successfully.");
        userRepository.save(user);

        return ResponseEntity.ok(response);
    }

    
}

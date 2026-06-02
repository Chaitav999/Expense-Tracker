package com.example.Expense_Tracker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.Expense_Tracker.repository.DataRepository;


@CrossOrigin(origins="*")
@RestController
public class ExpenseController {
    
    private DataRepository repository;

    public ExpenseController(DataRepository repository){
        this.repository = repository;
    }

    @GetMapping("/transactions")
    public List<ExpenseData> getData(){
        return repository.findAll();
    }

    @PutMapping("transactions/{id}")
    public List<ExpenseData> putMethodName(@PathVariable long id, @RequestBody ExpenseData data) {
        //TODO: process PUT request

        
        repository.save(data);
        
        return repository.findAll();
    }

    @PostMapping("/transactions")
    public List<ExpenseData> postMethodName(@RequestBody ExpenseData data) {
        //TODO: process POST request
        
        repository.save(data);

        return repository.findAll();
    }

    @DeleteMapping("/transactions/{idx}")
    public List<ExpenseData> deleteTransaction(@PathVariable long idx){

        repository.deleteById(idx);

        return repository.findAll();
    }
    
}

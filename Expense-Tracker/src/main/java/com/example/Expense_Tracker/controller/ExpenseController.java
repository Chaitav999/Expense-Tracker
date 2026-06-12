package com.example.Expense_Tracker.controller;

import java.time.LocalDate;
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
    
}

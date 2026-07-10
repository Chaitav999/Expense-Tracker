package com.example.Expense_Tracker.Service;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Expense_Tracker.controller.ExpenseData;
import com.example.Expense_Tracker.repository.DataRepository;
import com.example.Expense_Tracker.repository.UserRepository;

@Service
public class TransactionService {

    private DataRepository repository;
    private UserRepository userRepository;
    private UserService userService;

    public TransactionService(DataRepository repository, UserRepository userRepository, UserService userService){
        this.repository = repository;
        this.userRepository = userRepository;
        this.userService = userService;
    }
    
    /*-----Logic for the GET requests-----*/

    public List<ExpenseData> getTransactionData(){
        return repository.findAll();
    }

    public Summary calSummary(){
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

    public Summary calMonthlyData(int month, int year){
        
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

    public List<ExpenseData> calMonthlyExpense(int month, int year){
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

    /*-----Logic for the PUT requests*/

    public List<ExpenseData> updateTransaction(long id, ExpenseData data){
        ExpenseData transData = repository.findById(id).get();

        transData.setTitle(data.getTitle());
        transData.setAmount(data.getAmount());
        transData.setType(data.getType());

        repository.save(transData);
        
        return repository.findAll();
    }

    /*-----Logic for POST requests-----*/

    public List<ExpenseData> postData(ExpenseData data){
        
        data.setDate(LocalDate.now());
        
        repository.save(data);

        return repository.findAll();
    }

    /*-----Logic for DELETE requests*/

    public List<ExpenseData> delTransaction(long idx){
        repository.deleteById(idx);

        return repository.findAll();
    }
}

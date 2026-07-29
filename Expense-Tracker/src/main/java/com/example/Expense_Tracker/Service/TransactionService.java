package com.example.Expense_Tracker.Service;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.Expense_Tracker.Security.CustomUserDetails;
import com.example.Expense_Tracker.entity.ExpenseData;
import com.example.Expense_Tracker.entity.User;
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        CustomUserDetails currentUser = (CustomUserDetails) authentication.getPrincipal();

        return repository.findByUser(currentUser.getUser());
    }

    public Summary calSummary(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUser = (CustomUserDetails) authentication.getPrincipal();

        List<ExpenseData> transactions = repository.findByUser(customUser.getUser());
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
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUser = (CustomUserDetails) authentication.getPrincipal(); 

        List<ExpenseData> transactions = repository.findByUser(customUser.getUser());
        Summary summary = new Summary();
        
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

        CustomUserDetails customUser = userData();
        List<ExpenseData> transactions = repository.findByUser(customUser.getUser());
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

    /*-----Logic for getting the current logged in user-----*/
    
    private CustomUserDetails userData(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUser = (CustomUserDetails) authentication.getPrincipal(); 

        return customUser;
    }

    /*-----Logic for the PUT requests*/

    public List<ExpenseData> updateTransaction(long id, ExpenseData data){
        CustomUserDetails user = userData();
        Optional<ExpenseData> transaction = repository.findByIdAndUser(id, user.getUser());

        if(transaction.isPresent()){
            ExpenseData transData = transaction.get();

            transData.setTitle(data.getTitle());
            transData.setAmount(data.getAmount());
            transData.setType(data.getType());

            repository.save(transData);
        }
        
        return repository.findByUser(user.getUser());
    }

    /*-----Logic for POST requests-----*/

    public List<ExpenseData> postData(ExpenseData data){
        
        data.setDate(LocalDate.now());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); //checks who is currently looged in
        CustomUserDetails customUser = (CustomUserDetails) authentication.getPrincipal();

        User user = customUser.getUser();

        data.setUser(user);
        
        repository.save(data);

        return repository.findByUser(user);
    }

    /*-----Logic for DELETE requests*/

    public List<ExpenseData> delTransaction(long idx){

        CustomUserDetails user = userData();
        Optional<ExpenseData> data = repository.findByIdAndUser(idx, user.getUser());

        if(data.isPresent()){
            repository.delete(data.get());
        }

        return repository.findByUser(user.getUser());
    }
}

import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SubmitExpensePage } from '../submit-expense/submit-expense'; 
import { Expense } from '../../models/expense'; 
import { ExpenseDetailPage } from '../expense-detail/expense-detail';
import { ExpenseService } from '../../providers/expense-service'; 

@Component({
  selector: 'page-view-expenses',
  templateUrl: 'view-expenses.html'
})
export class ViewExpensesPage implements OnInit {
  expenses: Expense[]; 

  constructor(public navCtrl: NavController, private expenseService:
    ExpenseService) {
      
       
  }
  goToSubmitExpense(){
    this.navCtrl.push(SubmitExpensePage);
  } 
  ngOnInit() {
    this.expenseService.getExpenses()
    .subscribe(expenses => this.expenses = expenses);
   
  }   
  goToExpenseDetail(params){
    if (!params) params = {};
    this.navCtrl.push(ExpenseDetailPage, params);
  } 
}

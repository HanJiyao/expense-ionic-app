import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SubmitExpensePage } from '../submit-expense/submit-expense'; 
import { Expense } from '../../models/expense'; 
import { ExpenseDetailPage } from '../expense-detail/expense-detail';


@Component({
  selector: 'page-view-expenses',
  templateUrl: 'view-expenses.html'
})
export class ViewExpensesPage implements OnInit {
  expenses: Expense[]; 

  constructor(public navCtrl: NavController) {
  }
  goToSubmitExpense(){
    this.navCtrl.push(SubmitExpensePage);
  } 
  ngOnInit() {
    this.expenses = [
      new Expense("14/3/2018", 1250, "Accomodation","RWS Hotel","travel"),
      new Expense("15/3/2018", 20, "Transport", "Uber","meeting"),
      new Expense("17/3/2018", 130, "Meal", "Hai Di Lao","lunch")
    ];
   }
   goToExpenseDetail(params){
    if (!params) params = {};
    this.navCtrl.push(ExpenseDetailPage, params);
   } 
}

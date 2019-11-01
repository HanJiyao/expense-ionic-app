import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Expense } from '../../models/expense'; 

/**
 * Generated class for the ExpenseDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-expense-detail',
  templateUrl: 'expense-detail.html',
})
export class ExpenseDetailPage {
  expense: Expense; 
  /* tslint:disable:no-unused-variable */
  constructor(public navCtrl: NavController, private navParams: NavParams) {
     console.log(self.navParams);
     let date = navParams.get('date');
     let amount = navParams.get('amount');
     let category = navParams.get('category');
     let merchant = navParams.get('merchant');
     this.expense = new Expense (date, amount, category, merchant);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenseDetailPage');
  }

}

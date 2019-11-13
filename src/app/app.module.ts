import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ViewExpensesPage } from '../pages/view-expenses/view-expenses';
import { ApproveExpensePage } from '../pages/approve-expense/approve-expense';
import { SubmitExpensePage } from '../pages/submit-expense/submit-expense';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ExpenseDetailPage } from '../pages/expense-detail/expense-detail';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormsModule } from '@angular/forms'; 
import {ExpenseService} from '../providers/expense-service'; 

@NgModule({
  declarations: [
    MyApp,
    ViewExpensesPage,
    ApproveExpensePage,
    SubmitExpensePage,
    SignupPage,
    LoginPage,
    ProfilePage,
    ExpenseDetailPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ViewExpensesPage,
    ApproveExpensePage,
    SubmitExpensePage,
    SignupPage,
    LoginPage,
    ProfilePage,
    ExpenseDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ExpenseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
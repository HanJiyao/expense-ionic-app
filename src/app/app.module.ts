import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ViewExpensesPage } from '../pages/view-expenses/view-expenses';
import { ApproveExpensePage } from '../pages/approve-expense/approve-expense';
import { SubmitExpensePage } from '../pages/submit-expense/submit-expense';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ViewExpensesPage,
    ApproveExpensePage,
    SubmitExpensePage,
    SignupPage,
    LoginPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ViewExpensesPage,
    ApproveExpensePage,
    SubmitExpensePage,
    SignupPage,
    LoginPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
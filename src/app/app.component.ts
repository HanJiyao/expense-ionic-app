import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ViewExpensesPage } from '../pages/view-expenses/view-expenses';
import { ApproveExpensePage } from '../pages/approve-expense/approve-expense';
import { SubmitExpensePage } from '../pages/submit-expense/submit-expense';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';


import { HomePage } from '../pages/home/home';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToViewExpenses(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ViewExpensesPage);
  }goToApproveExpense(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ApproveExpensePage);
  }goToSubmitExpense(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SubmitExpensePage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  }goToSignup(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SignupPage);
  }goToProfile(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ProfilePage);
  }
}

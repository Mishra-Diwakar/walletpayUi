import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = false;
  loggedInChange: Subject<boolean> = new Subject<boolean>();
  constructor( private router: Router) { 
  }

  changeLoggedIn() {    
   
  }

  isUserLoggedIn() {
    
  }

  logOut() {
    console.log("Logout Called.")
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isLoggin");
    this.router.navigateByUrl("/login");
  }
  getUsername(){
    return sessionStorage.getItem("userName");
  }
  getMainwallet(){
    return sessionStorage.getItem("mainWallet");
  }
  getAepswallet(){
    return sessionStorage.getItem("aepsWallet");
  }
  getMobile(){
    return sessionStorage.getItem("contact");
  }
  getEmail(){return sessionStorage.getItem("userEmail");}
  getName(){ return sessionStorage.getItem("name"); }
  getUserid(){ return sessionStorage.getItem("userId"); }
  getUserType(){ return sessionStorage.getItem("userType"); }
  getTransactionService(){ return sessionStorage.getItem("transactionService"); }
}

import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
userTypeId:number=0;
isApiUser=false;
userType='';
transactionService = 1;
isKindent=false;
  constructor(private loginService : LoginService) {
    this.isKindent = loginService.isKindent;
    this.userTypeId = Number(loginService.getUserType());
    this.transactionService = Number(loginService.getTransactionService());
   }

  ngOnInit(): void {
    let api = atob(String(sessionStorage.getItem("isApiUser")));
    this.userType = api;
    if(api == "1"){
      this.isApiUser = true;
    }
  }

  logout(){
    this.loginService.logOut();
  }
}

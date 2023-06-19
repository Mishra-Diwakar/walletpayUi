import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mainWallet: number = 0;
  aepsWallet: number = 0;
  userName: any;
  userType:string='';
  user:string='';
  isKindent=false;
  constructor(private loginService: LoginService, private api: ApiService) {

  }

  ngOnInit(): void {
    this.userName = atob(String(sessionStorage.getItem("userName")));
    this.userType = atob(String(sessionStorage.getItem("isApiUser")));
    this.isKindent = this.loginService.isKindent;
    console.log(this.userName);
    console.log(this.userType);
    if(this.userType=="0"){
      this.user = "Admin";
    }else if(this.userType=='1'){
      this.user = "API User"
    }else if(this.userType=="2"){
      this.user = "STAFF"
    }else if(this.userType=="3"){
      this.user = "HR"
    }else{
      this.user = "RESELLER"
    }
  }

  logout() {
    this.loginService.logOut();
  }
}

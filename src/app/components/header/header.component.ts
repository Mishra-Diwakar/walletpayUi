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
  constructor(private loginService: LoginService, private api: ApiService) {

  }

  ngOnInit(): void {
    this.userName = atob(String(sessionStorage.getItem("userName")));
    this.userType = atob(String(sessionStorage.getItem("isApiUser")));
    console.log(this.userName);
    console.log(this.userType);
    if(this.userType=="0"){
      this.user = "Admin";
    }else{
      this.user = "API User"
    }
  }

  logout() {
    this.loginService.logOut();
  }
}

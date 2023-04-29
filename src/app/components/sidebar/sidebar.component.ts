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
  constructor(private loginService : LoginService) {
    this.userTypeId = Number(loginService.getUserType());
  
   }

  ngOnInit(): void {
    let api = atob(String(sessionStorage.getItem("isApiUser")));
    if(api == "1"){
      this.isApiUser = true;
    }
  }

  logout(){
    this.loginService.logOut();
  }
}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-commission',
  templateUrl: './my-commission.component.html',
  styleUrls: ['./my-commission.component.css']
})
export class MyCommissionComponent implements OnInit {
  title = "Commission";
  title2 = "Commission";
  userData: any[] = [];
  commissionList : any[]=[];
  userName: string = 'vikash';
  mobile: string = '9876567890';
  reg: string = '765568998';
  today: any;
  comFormShow=false;
  userId='';
  isLoggin='';
  isPackageAssigned=false;
  isApiUser='';
  constructor(private location: Location, private fb: FormBuilder, private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null" || this.isLoggin!="true"){
      this.router.navigate(['/login']);
      return;
    }
    if(this.isApiUser == "1"){
      this.router.navigate(['/page-not-found']);
      return;
    }
   
    this.userId = atob(String(sessionStorage.getItem("userId")));
    var userRequest = {
      id : this.userId
    }
    this.api.postRequestResponseData("/rest/auth/user/get",userRequest).subscribe(res=>{
      this.userData = res;
      this.userName = res.username;
      this.mobile = res.mobile;
    });
    this.api.getRequest("/rest/auth/user/packageRow/"+this.userId).subscribe(res=>{
      console.log(res);
      if(res){
        this.commissionList = res;
      }
      if(res==null){
        this.isPackageAssigned = true;
      }
  
    });
   
    this.today = new Date();
  }
  backClicked() {
    this.location.back();
  }

}

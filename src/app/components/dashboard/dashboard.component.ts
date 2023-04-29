import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
declare function getChart2():any;
declare function getChart4():any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
id='';
recentTransaction : any [] = [];
isLoggin='';
isApiUser='';
mainWallet=0;
todayTransaction=0;
totalTransaction=0;
todayPayin=0;
totalPayin=0;
todayPayout=0;
totalPayout=0; 
  constructor(private router:Router,private api:ApiService) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null"){
      this.router.navigate(['/login']);
      return;
    }
    getChart4();
    getChart2();
   
    this.id = atob(String(sessionStorage.getItem("userId")))
    this.api.getRequest("/rest/auth/report/recent").subscribe(res=>{
      if(res){
        this.recentTransaction = res;
        console.log(res)
      }  
    });
      this.api.getRequest("/rest/auth/user/dashbaord/details").subscribe(res=>{
        console.log(res);
        if(res.mainWallet) { this.mainWallet = res.mainWallet; }
        if(res.toalPayout) { this.totalPayout = res.toalPayout; }
        if(res.todayPayout) { this.todayPayout = res.todayPayout; }
        if(res.totalPayin) { this.totalPayin = res.totalPayin; }
        if(res.todayPayin) { this.todayPayin = res.todayPayin; }
        if(res.totalTransaction) { this.totalTransaction = res.totalTransaction; }
        if(res.todayTransaction) { this.todayTransaction = res.todayTransaction; }
      });
    
   

  }

  

}

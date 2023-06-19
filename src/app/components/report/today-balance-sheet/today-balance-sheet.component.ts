import { Location, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-today-balance-sheet',
  templateUrl: './today-balance-sheet.component.html',
  styleUrls: ['./today-balance-sheet.component.css']
})
export class TodayBalanceSheetComponent implements OnInit {

  isLoggin = '';
  totalRollup: any[] = [];
  users:any[]=[];
   userHash:any = {};
   isApiUser='';
   mainWallet: number = 0;
   totalPayinAmount: number = 0;
   totalPayoutAmount: number = 0;
   totalProcessingAmount: number = 0;
   totalChargebackAmount: number = 0;
   total : number = 0;
   difference:number = 0;
  constructor(private location: Location, private fb: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    console.log(this.isLoggin);
    if (this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null") {
      this.router.navigate(['/login']);
      return;
    }
    if(this.isApiUser!="0"){
      this.router.navigate(['/page-not-found']);
      return;
    }
    this.api.getRequest("/rest/auth/user/all/active").subscribe(res=>{
      this.users = res;
      this.users.forEach((user)=>{
        this.userHash[user.id] = user;
       });
    });
    this.getChargeBack();
  }
  getChargeBack() {
    this.api.getRequest("/rest/auth/report/chargeback/today").subscribe(res => {
      this.totalRollup = res;
      this.setData(this.totalRollup);
    });
  }

  back() {
    this.location.back();
  }
 
  key: string = '';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  currencyFormat1(amount:string) {
    var x;
    x = amount.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return  res;
}


setUpZero() {
  // this.mainWallet = 0;
  this.totalPayinAmount = 0;
  this.totalPayoutAmount = 0;
  // this.totalProcessingAmount = 0;
  // this.totalChargebackAmount = 0;
  this.total = 0;
  // this.difference = 0;
}
setData(totalRollup: any[] = []) {
  console.log(totalRollup)
  for (let i = 0; i < totalRollup.length; i++) {
    // this.mainWallet += Number(totalRollup[i].mainWallet);
    this.totalPayinAmount += Number(totalRollup[i].totalPayinAmount);
    this.totalPayoutAmount += Number(totalRollup[i].totalPayoutAmount);
    // this.totalProcessingAmount += Number(totalRollup[i].totalProcessingAmount);
    // this.totalChargebackAmount += Number(totalRollup[i].totalChargebackAmount);
    this.total += Number(totalRollup[i].total);
    // this.difference += Number(totalRollup[i].difference);
  }
}

}

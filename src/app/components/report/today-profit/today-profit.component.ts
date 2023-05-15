import { Location, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-today-profit',
  templateUrl: './today-profit.component.html',
  styleUrls: ['./today-profit.component.css']
})
export class TodayProfitComponent implements OnInit {

  profitForm !: FormGroup;
  isLoggin = '';
  totalRollup: any[] = [];
  Submitted = false;
  searchSpinner = false;
  totalProfit: number = 0;
  date: any;
  totalPayin: number = 0;
  totalPayout: number = 0;
  countPayin: number = 0;
  countPayout: number = 0;
  countTrans: number = 0;
  countSuccess: number = 0;
  countRefund: number = 0;
  countPending: number = 0;
  countFail: number = 0;
  users:any[]=[];
   userHash:any = {};
   isApiUser='';
  constructor(private location: Location, private fb: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    console.log(this.isLoggin);
    if (this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null") {
      this.router.navigate(['/login']);
      return;
    }
    if(this.isApiUser=="1"){
      this.router.navigate(['/page-not-found']);
      return;
    }
    this.profitForm = this.fb.group({
      busiDate: ['', Validators.required]
    });
    this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    this.profitForm.value.busiDate = this.date;
    this.api.getRequest("/rest/auth/user/all/active").subscribe(res=>{
      this.users = res;
      this.users.forEach((user)=>{
        this.userHash[user.id] = user;
       });
    });
    this.getRollup();
  }
  getRollup() {
  var userRequest = {
      busiDate : this.date
    }
    this.setUpZero();
    this.api.postRequestResponseData("/rest/auth/report/total/rollup/bydate",userRequest).subscribe(res => {
      this.totalRollup = res;
      console.log(this.totalRollup)
      this.setData(this.totalRollup);

    });
  }
  setUpZero() {
    this.totalProfit = 0;
    this.totalPayin = 0;
    this.totalPayout = 0;
    this.countPayin = 0;
    this.countPayout = 0;
    this.countTrans = 0;
    this.countSuccess = 0;
    this.countRefund = 0;
    this.countPending = 0;
    this.countFail = 0;
  }
  setData(totalRollup: any[] = []) {
    for (let i = 0; i < totalRollup.length; i++) {
      this.totalProfit += totalRollup[i].totalProfit;
      this.totalPayin += totalRollup[i].totalPayinAmount;
      this.totalPayout += totalRollup[i].totalPayoutAmount;
      this.countPayin += totalRollup[i].totalPayinCount;
      this.countPayout += totalRollup[i].toalPayoutCount;
      this.countTrans += totalRollup[i].totalTransactionCount;
      this.countSuccess += totalRollup[i].successCount;
      this.countRefund += totalRollup[i].refundCount;
      this.countPending += totalRollup[i].pendingCount;
      this.countFail += totalRollup[i].failedCount;
    }
  }

  get s() { return this.profitForm.controls; }

  back() {
    this.location.back();
  }
  profitSubmit() {
    this.Submitted = true;
    let date1 = formatDate(this.profitForm.value.busiDate, 'yyyy-MM-dd', 'en_US');
    let date2 = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    let date3 = formatDate("2023-04-27", 'yyyy-MM-dd', 'en_US');
    // if(this.profitForm.value.username=="default"){
    //   this.profitForm.controls['username'].setErrors({'required':true});
    //   return;
    // }
    console.log(date1, date2)
    if (date1 < date3 || date1 > date2) {
      this.profitForm.controls['busiDate'].setErrors({ 'required': true });
      return;
    }
    if (this.profitForm.valid) {
      this.searchSpinner = true;
      var userRequest = {
        busiDate: this.profitForm.value.busiDate
      }
      console.log(userRequest)
      this.api.postRequestResponseData("/rest/auth/report/total/rollup/bydate", userRequest).subscribe(res => {
        // this.getRollup();
        this.setUpZero();
        this.totalRollup = res;
        this.setData(this.totalRollup);
        this.searchSpinner = false;
      });
      this.searchSpinner = false;
    }
    if (this.profitForm.invalid) {
      this.searchSpinner = false;
    }
  }
  refreshDailyProfit() {
    this.Submitted = true;
    this.Submitted = true;
    let date1 = formatDate(this.profitForm.value.busiDate, 'yyyy-MM-dd', 'en_US');
    let date2 = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    let date3 = formatDate("2023-04-27", 'yyyy-MM-dd', 'en_US');

    if (date1 < date3 || date1 > date2) {
      this.profitForm.controls['busiDate'].setErrors({ 'required': true });
      return;
    }
    var userRequest = {
      busiDate: this.profitForm.value.busiDate
    }
    this.api.postRequestResponseData("/rest/auth/transaction/calculateDaysProfitLoss", userRequest).subscribe(res => {
      this.getRollup();
    });
  }

  key: string = '';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}

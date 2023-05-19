import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
declare function getChart2(data: any): any;
declare function getChart4(): any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  id = '';
  recentTransaction: any[] = [];
  isLoggin = '';
  isApiUser = '';
  // mainWallet=0;
  mainWallet = '0';
  todayTransaction = 0;
  totalTransaction = 0;
  todayPayin = 0;
  totalPayin = 0;
  todayPayout = 0;
  totalPayout = 0;
  todayProfit = 0;
  pending = 0;
  success = 0;
  refund = 0;
  failed = 0;
  payinAmount = 0;
  payoutAmount = 0;
  todayTrans: number[] = [];  //for chart
  users: any[] = [];
  userHash: any = {};
  transactionSpinner=false;
  payinSpinner=false;
  payoutSpinner=false;
  todayTransSpinner=false;
  todayBusin=false;
  walletSpinner=false;
  profitSpinner=false;
  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    console.log(this.isLoggin);
    if (this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null") {
      this.router.navigate(['/login']);
      return;
    }
    getChart4();
    // if (this.isApiUser != '3') { this.loadDetails(); }

    getChart2(this.todayTrans);

    //  #########################

    this.id = atob(String(sessionStorage.getItem("userId")));
    this.api.getRequest("/rest/auth/user/all/active").subscribe(res => {
      this.users = res;
      this.users.forEach((user) => {
        this.userHash[user.id] = user;
      });
    });

    this.api.getRequest("/rest/auth/report/recent").subscribe(res => {
      if (res) {
        this.recentTransaction = res;
        console.log(res)
      }
    });

    this.api.getRequest("/rest/auth/report/get/mainWalllet").subscribe(res => {
       if (res.mainWallet) { this.mainWallet = this.currencyFormat1(res.mainWallet); }
     });

     //  #########################
  }

  loadDetails() {
    this.id = atob(String(sessionStorage.getItem("userId")));
    this.api.getRequest("/rest/auth/user/all/active").subscribe(res => {
      this.users = res;
      this.users.forEach((user) => {
        this.userHash[user.id] = user;
      });
    });
    this.api.getRequest("/rest/auth/report/recent").subscribe(res => {
      if (res) {
        this.recentTransaction = res;
        console.log(res)
      }
    });
    this.api.getRequest("/rest/auth/user/dashboard/details").subscribe(res => {
      console.log(res);
      if (res.mainWallet) { this.mainWallet = this.currencyFormat1(res.mainWallet); }
      if (res.toalPayout) { this.totalPayout = res.toalPayout; }
      if (res.todayPayout) { this.todayPayout = res.todayPayout; }
      if (res.totalPayin) { this.totalPayin = res.totalPayin; }
      if (res.todayPayin) { this.todayPayin = res.todayPayin; }
      if (res.totalTransaction) { this.totalTransaction = res.totalTransaction; }
      if (res.todayTransaction) { this.todayTransaction = res.todayTransaction; }
      if (res.SUCCESS) { this.success = res.SUCCESS; }
      if (res.REFUND) { this.refund = res.REFUND; }
      if (res.PENDING) { this.pending = res.PENDING; }
      if (res.FAILED) { this.failed = res.FAILED; }
      if (res.todayPayoutAmount != "null") { this.payoutAmount = Number(res.todayPayoutAmount); }
      if (res.todayPayinAmount != "null") { this.payinAmount = Number(res.todayPayinAmount); }
      if (this.isApiUser == "0") {
        this.todayProfit = Number(res.todayProfit);
      }
      this.todayTrans.push(this.payinAmount);
      this.todayTrans.push(this.payoutAmount);
    });
  }

  refreshProfit() {
    this.profitSpinner=true;
    this.api.getRequest("/rest/auth/transaction/healProfit").subscribe(res => {
      this.loadDetails();
      this.profitSpinner=false;
    });
  }

  currencyFormat1(id: string) {
    var x;
    x = id.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  }
  getTotalTransaction() {
    this.transactionSpinner=true;
    this.api.getRequest("/rest/auth/report/totalTransaction").subscribe(res => {
      this.totalTransaction = res.totalTransaction;
      this.transactionSpinner=false;
    });
  }
  getTotalPayin() {
    this.payinSpinner = true;
    this.api.getRequest("/rest/auth/report/totalPayin").subscribe(res => {
      this.totalPayin = res.totalPayin;
      this.payinSpinner = false;
    });
  }
  getTotalPayout() {
    this.payoutSpinner = true;
    this.api.getRequest("/rest/auth/report/totalPayout").subscribe(res => {
      this.totalPayout = res.totalPayout;
      this.payoutSpinner = false;
    });
  }
  getTodayTransaction(){
    this.todayTransSpinner=true;
    this.api.getRequest("/rest/auth/report/todayTransaction").subscribe(res => {
      if (res.todayPayin) { this.todayPayin = res.todayPayin; }
      if (res.todayPayinAmount != "null") { this.payinAmount = Number(res.todayPayinAmount); }
      if (res.todayPayout) { this.todayPayout = res.todayPayout; }
      if (res.todayPayoutAmount != "null") { this.payoutAmount = Number(res.todayPayoutAmount); }
      this.todayTransSpinner = false;
    });
  }
  getTodayBusiness(){
    this.todayBusin=true;
    this.api.getRequest("/rest/auth/report/todayBusiness").subscribe(res => {
      if (res.SUCCESS) { this.success = res.SUCCESS; }
      if (res.REFUND) { this.refund = res.REFUND; }
      if (res.PENDING) { this.pending = res.PENDING; }
      if (res.FAILED) { this.failed = res.FAILED; }
      this.todayBusin = false;
    });
  }
  // getMainWallet(){
  //  this.walletSpinner = true;
  //  this.api.getRequest("/rest/auth/report/get/mainWalllet").subscribe(res => {
  //   if (res.mainWallet) { this.mainWallet = this.currencyFormat1(res.mainWallet); }
  //   this.walletSpinner = false;
  // });
  // }
}

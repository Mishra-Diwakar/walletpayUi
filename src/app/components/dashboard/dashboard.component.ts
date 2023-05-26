import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
declare function getChart2(data: any): any;
declare function getChart4(data: any): any;
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
  mainWallet = '0';
  todayTransaction = 0;
  totalTransaction = 0;
  todayPayin = 0;
  totalPayin = '0';
  todayPayout = 0;
  totalPayout = '0';
  todayProfit = 0;
  pending = 0;
  success = 0;
  refund = 0;
  failed = 0;
  payinAmount = 0;
  payoutAmount = 0;
  todayTrans: any; //for chart
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
    if (this.isApiUser != '3') { this.loadDetails(); }
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
      }
    });
    this.api.getRequest("/rest/auth/user/dashboard/details").subscribe(res => {
      if (res.mainWallet) { this.mainWallet = this.currencyFormat1(res.mainWallet); }
      if (res.toalPayout) { this.totalPayout = res.toalPayout; }
      if (res.todayPayout) { this.todayPayout = res.todayPayout; }
      if (res.totalPayin) { this.totalPayin = res.totalPayin; }
      if (res.todayPayin) { this.todayPayin = res.todayPayin; }
      if (res.totalTransaction) { this.totalTransaction = res.totalTransaction; }
      if (res.todayTransaction) { this.todayTransaction = res.todayTransaction; }
      if (res.SUCCESS) { this.success = res.SUCCESS; }
      if (res.REFUND) { this.refund = res.REFUND; }
      if (res.PROCESSING) { this.pending = res.PROCESSING; }
      if (res.FAILED) { this.failed = res.FAILED; }
      if (res.todayPayoutAmount != "null") { this.payoutAmount = Number(res.todayPayoutAmount); }
      if (res.todayPayinAmount != "null") { this.payinAmount = Number(res.todayPayinAmount); }
      if (this.isApiUser == "0") {
        this.todayProfit = Number(res.todayProfit);
      }
      let hashMap = new Map<String, number>();
      hashMap.set("payinAmt",this.payinAmount);
      hashMap.set("payoutAmt",this.payoutAmount);
      hashMap.set("todayPayin",Number(this.todayPayin));
      hashMap.set("todayPayout",Number(this.todayPayout));
      let hashMap2 = new Map<String, number>();
      hashMap2.set("SUCCESS", this.success);
      hashMap2.set("REFUND", this.refund);
      hashMap2.set("PROCESSING", this.pending);
      hashMap2.set("FAILED", this.failed);
      getChart2(hashMap);
      getChart4(hashMap2);
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
    console.log(id);
    x = id.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  }
  // getTotalTransaction() {
  //   this.transactionSpinner=true;
  //   this.api.getRequest("/rest/auth/report/totalTransaction").subscribe(res => {
  //     this.totalTransaction = res.totalTransaction;
  //     this.transactionSpinner=false;
  //   });
  // }
  getTotalPayin() {
    this.payinSpinner = true;
    this.api.getRequest("/rest/auth/report/totalPayin").subscribe(res => {
      this.totalPayin = this.currencyFormat1(res.totalPayin);
      this.payinSpinner = false;
    });
  }
  getTotalPayout() {
    this.payoutSpinner = true;
    this.api.getRequest("/rest/auth/report/totalPayout").subscribe(res => {
      this.totalPayout = this.currencyFormat1(res.totalPayout);
      this.payoutSpinner = false;
    });
  }
  
}

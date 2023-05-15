import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import { format } from 'path';
declare function showSpinner(data:any):any;
@Component({
  selector: 'app-pay-out',
  templateUrl: './pay-out.component.html',
  styleUrls: ['./pay-out.component.css']
})
export class PayOutComponent implements OnInit {
  totalPage: any = [];
  pageNumber: number = 0;
  currentPage: number = 0;
  prev: number = 0;
  next: number = 1;
  records: number = 50;
  Submitted = false;
  searchText: any;
  headerForm!: FormGroup;
  dateFrom: any;
  dateTo: any;
  searchSpinner = false;
  array:number=2;
  isLoggin='';
  payoutList : any[]=[];
  id='';
  spin:number=0;
  checkStatusSpinner = false;
  recordSpinner=false;
  users:any[]=[];
  userHash:any = {};
  userId:number=-2;
  status : string='default';
  isApiUser='';
  defaultDate='';
  constructor(private fb:FormBuilder, private router:Router, private api:ApiService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.id = atob(String(sessionStorage.getItem("userId")));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    this.dateFrom = formatDate(new Date(),'yyyy-MM-dd', 'en-US');
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null" || this.isLoggin!="true"){
      this.router.navigate(['/login']);
      return;
    }
    var requestMap = {
      id : this.id
    }
    this.api.getRequest("/rest/auth/user/all/active").subscribe(res=>{
      this.users = res;
      this.users.forEach((user)=>{
        this.userHash[user.id] = user;
       });
    });
    this.getPayout("/rest/auth/report/payout/"+0+"/"+this.records,requestMap);   
    this.headerForm = this.fb.group({
      records : ['',Validators.required]
    });
  }
  changePage(i: number) {
    this.status="default"
    this.dateFrom='';
    this.dateTo='';
    this.currentPage = i;
    var obj = {
      id: atob(String(sessionStorage.getItem("userId")))
    }
    if (i != 0) { this.prev = 1; }
    if (i == 0) { this.prev = 0; }
    if (i == this.totalPage.length - 1) { this.next = 0; }
    if (i != this.totalPage.length - 1) { this.next = 1; }
     this.getPayout("/rest/auth/report/payout/" + i + "/" + this.records, obj);
  }
  gotoNextPage() {
    this.currentPage++;
    this.changePage(this.currentPage);
  }
  gotoPreviousPage() {
    this.currentPage--;
    this.changePage(this.currentPage);
  }
  selectDateFrom(event:any){
    this.dateFrom = event.target.value;
  }
  // selectDateTo(event:any){
  //   this.dateTo = event.target.value;
  // }
  search(){
    if(this.status=="default" && this.dateFrom==undefined){
      Swal.fire("Please choose filter type..");
      return;
    }
 

    this.searchSpinner = true;
    var obj = {
      id: this.id,
      dateFrom: this.dateFrom,
      userId : this.userId,
      status : this.status
    }
    console.log(obj);   
    this.api.postRequestResponseData("/rest/auth/report/payout/search", obj).subscribe(res => {
      console.log(res);
      this.searchSpinner = false;
      this.payoutList = res;
    })
  }
  exportToExcel(){
    if (this.payoutList.length == 0) {
      Swal.fire("data not available.");
      return;
    }
    let date = new Date();
    let element = document.getElementById("excel");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, {raw:true});
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'PayoutReport_' + date + '.xlsx');
    this.dateFrom = null;
    this.dateTo = null;
  }
  public openPDF():void{
    // let DATA: any = document.getElementById('excel');
    // html2canvas(DATA).then((canvas) => {
    //   let fileWidth = 208;
    //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //   const FILEURI = canvas.toDataURL('image/png');
    //   let PDF = new jsPDF('p', 'mm', 'a4');
    //   let position = 0;
    //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    //   let date = new Date();
    //   PDF.save('payout_report_'+date+'.pdf');
    // });
    let date = new Date();
    var doc = new jsPDF('l', 'mm', [200, 310]);
    autoTable(doc,{html:"#excel",theme:'grid'});
    doc.save("payout_report_"+date);
  }
  changeStatus(event:any){
    this.status = event.target.value;
  }
  get s(){return this.headerForm.controls;}
  getRecords(){
    this.Submitted = true;
    this.recordSpinner = true;
    if (this.headerForm.valid) {
      var userRequest = {
        txnId : this.headerForm.value.records
      }
      this.records = this.headerForm.value.records;
      this.api.postRequestResponseData("/rest/auth/report/search/records/payout",userRequest).subscribe(res=>{
        console.log(res);
        this.payoutList = res;
        this.recordSpinner=false;
      });
      this.recordSpinner=false;
      // this.getLedger("/rest/auth/report/ledger/" + 0 + "/" + this.records,userRequest)
    }
    if (this.headerForm.invalid) {
      this.recordSpinner = false;
    }
  }
  key: string = '';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
 
  getPayout(path:String, data:any){
    this.api.getRequest(path).subscribe(res=>{
      console.log(res);
      if(res){
        this.payoutList = res.content;
        this.totalPage.length = res.totalPages;
        this.pageNumber = res.pageable.pageNumber;
      }
    });
  }
  checkPayoutStatus(records:any){
    this.spin = records.id;
    let date = records.createdDate
    this.checkStatusSpinner = showSpinner(records);
    console.log(records);
    var requestMap = {
      orderId : records.agentId,
      txnType : records.commissionType,
      txnStartDate : this.datepipe.transform(records.createdDate, 'yyyy-MM-dd') ,
      txnEndDate : this.datepipe.transform(records.createdDate, 'yyyy-MM-dd') ,
      txnId : "",
    }
    this.api.postRequestResponseData("/rest/auth/transaction/checkStatus",requestMap).subscribe(res=>{
      console.log(res);
      this.checkStatusSpinner = false;
      this.spin=0;
      // this.spin = records.id;
      
    });
  }

  changeUser(event:any){
    if(event.target.value!="default"){
      this.userId = event.target.value;
    }
    
  }
}

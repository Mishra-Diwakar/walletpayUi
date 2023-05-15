import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import { DatePipe } from '@angular/common';
declare function showSpinner(data:any):any;
@Component({
  selector: 'app-pay-in',
  templateUrl: './pay-in.component.html',
  styleUrls: ['./pay-in.component.css']
})
export class PayInComponent implements OnInit {
  tableData: any = [];
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
  id='';
  payinList : any[]=[];
  spin:number=0;
  checkStatusSpinner=false;
  recordSpinner=false;
  isApiUser='';
  userId:number=-2;
  status : string='default';
  users:any[]=[];
  userHash:any = {};
  constructor(private fb:FormBuilder, private router:Router, private api:ApiService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.id = atob(String(sessionStorage.getItem("userId")));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    console.log(this.isLoggin);
    if(this.isLoggin !="true"){
      this.router.navigate(['/login']);
      return;
    }
    var userRequest = {
      id:this.id
    }
    this.api.getRequest("/rest/auth/user/all/active").subscribe(res=>{
      this.users = res;
      this.users.forEach((user)=>{
        this.userHash[user.id] = user;
       });
    });
    this.getPayin("/rest/auth/report/payin/"+0+"/"+this.records,userRequest);
    this.headerForm = this.fb.group({
      records : ['',Validators.required]
    });
  }
  changePage(i: number) {
    this.currentPage = i;
    var obj = {
      id: atob(String(sessionStorage.getItem("userId")))
    }
    if (i != 0) { this.prev = 1; }
    if (i == 0) { this.prev = 0; }
    if (i == this.totalPage.length - 1) { this.next = 0; }
    if (i != this.totalPage.length - 1) { this.next = 1; }
     this.getPayin("/rest/auth/report/payin/" + i + "/" + this.records, obj);
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
  selectDateTo(event:any){
    this.dateTo = event.target.value;
  }
  search(){
    this.searchSpinner = true;
    var obj = {
      id: this.id,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      userId : this.userId,
      status : this.status
    }
    console.log(this.dateFrom, this.dateTo);   
    this.api.postRequestResponseData("/rest/auth/report/payin/search", obj).subscribe(res => {
      console.log(res);
      this.searchSpinner = false;
      this.payinList = res;
      // this.tableData = res;
    })
  }
  exportToExcel(){
    if (this.payinList.length == 0) {
      Swal.fire("data not available.");
      return;
    }
    let date = new Date();
    let element = document.getElementById("excel");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, {raw:true});
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'PayinReport_' + date + '.xlsx');
    this.dateFrom = null;
    this.dateTo = null;
  }
  public openPDF():void{
    let DATA: any = document.getElementById('excel');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      let date = new Date();
      PDF.save('payin_report_'+date+'.pdf');
    });
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
      this.api.postRequestResponseData("/rest/auth/report/search/records/payin",userRequest).subscribe(res=>{
        console.log(res);
        this.payinList = res;
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
  getPayin(path:String, data:any){
    this.api.getRequest(path).subscribe(res=>{
      console.log(res);
      if(res){
        this.payinList = res.content;
        this.totalPage.length = res.totalPages;
        this.pageNumber = res.pageable.pageNumber;
      }
    });
  }
  checkPayinStatus(records:any){
    console.log(records);
    this.spin = records.id;
    let date = records.createdDate
    this.checkStatusSpinner = showSpinner(records);
    var requestMap = {
      agentId : records.agentId,
      txnType : records.serviceType,
      txnDate : this.datepipe.transform(records.createdDate, 'yyyy-MM-dd') ,
    }
    console.log(requestMap);
    this.api.postRequestResponseData("/rest/auth/transaction/checkStatus",requestMap).subscribe(res=>{
      console.log(res);
      this.spin=0;
      this.checkStatusSpinner = false;
    });
  }
  changeUser(event:any){
    if(event.target.value!="default"){
      this.userId = event.target.value;
    }
    
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  searchText='';
  dateFrom:any;
  searchSpinner=false;
  headerForm!:FormGroup;
  Submitted=false;
  array:number=10;
  isLoggin=''
  tableData: any = [];
  totalPage: any = [];
  pageNumber: number = 0;
  currentPage: number = 0;
  prev: number = 0;
  next: number = 1;
  records: number = 50;
  id='';
  ledgerList : any[]=[];
  recordSpinner = false;
  st:string='';
  filterSpinner=false;
  users:any[]=[];
  userHash:any = {};
  userId:number=-2;
  status : string='default';
  isApiUser='';
  serviceType='default';
  excelSpinner=false;
  pdfSpinner=false;
  constructor(private fb:FormBuilder, private router:Router, private api:ApiService) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.id = atob(String(sessionStorage.getItem("userId")));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    this.dateFrom = formatDate(new Date(),'yyyy-MM-dd', 'en-US');
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null" || this.isLoggin !="true"){
      this.router.navigate(['/login']);
      return;
    }
    this.api.getRequest("/rest/auth/user/all/active").subscribe(res=>{
      this.users = res;
      this.users.forEach((user)=>{
        this.userHash[user.id] = user;
       });
    });
    var userRequest = {
      id:this.id
    }
    this.getLedger("/rest/auth/report/ledger/"+0+"/"+this.records,userRequest);
    this.headerForm = this.fb.group({
      records : ['',Validators.required]
    });
  }
  changePage(i: number) {
    this.status="default"
    this.dateFrom='';
    this.currentPage = i;
    var obj = {
      id: atob(String(sessionStorage.getItem("userId")))
    }
    if (i != 0) { this.prev = 1; }
    if (i == 0) { this.prev = 0; }
    if (i == this.totalPage.length - 1) { this.next = 0; }
    if (i != this.totalPage.length - 1) { this.next = 1; }
     this.getLedger("/rest/auth/report/ledger/" + i + "/" + this.records, obj);
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
      status : this.status,
      serviceType : this.serviceType
    } 
    console.log(obj);
    this.api.postRequestResponseData("/rest/auth/report/ledger/search", obj).subscribe(res => {
      console.log(res);
      this.searchSpinner = false;
      this.ledgerList = res;
      // this.tableData = res;
    })
  }

  // exportToExcel(){
  //   if (this.ledgerList.length == 0) {
  //     Swal.fire("data not available.");
  //     return;
  //   }
  //   let date = new Date();
  //   let element = document.getElementById("excel");
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, {raw:true});
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   XLSX.writeFile(wb, 'LedgerReport_' + date + '.xlsx');
  //   this.dateFrom = null;
  // }

  exportToExcel(){
    if (this.ledgerList.length == 0) {
      Swal.fire("data not available.");
      return;
    }
    this.excelSpinner=true;
    var obj = {
      id: this.id,
      dateFrom: this.dateFrom,
      userId : this.userId,
      status : this.status,
      serviceType : this.serviceType
    } 
    let date = new Date();
    this.api.downloadFile("/rest/auth/excel/download/file",obj).subscribe(res=>{
      console.log(res);
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(res)
      a.href = objectUrl
      a.download = 'LedgerReport_' + date + '.xlsx';
      a.click();
      URL.revokeObjectURL(objectUrl);
      this.excelSpinner=false;
    });
  }
  // public openPDF():void{
  //   let date = new Date();
  //   var doc = new jsPDF('l', 'mm', [200, 310]);
  //   autoTable(doc,{html:"#excel",theme:'grid'});
  //   doc.save("ledger_report_"+date);
  // }
  downloadPDF(){
    this.pdfSpinner=true;
    var obj = {
      id: this.id,
      dateFrom: this.dateFrom,
      userId : this.userId,
      status : this.status,
      serviceType : this.serviceType
    } 
    this.api.downloadFile("/rest/auth/pdf/download/file",obj).subscribe(res=>{
      console.log(res);
      let date = new Date();
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(res)
        a.href = objectUrl
        a.download = 'ledger_report_'+date+'.pdf';
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.pdfSpinner=false;
    });
  }

  changeStatus(event:any){
    this.status = event.target.value;
  }
  changeServiceType(event:any){ this.serviceType = event.target.value; }
  get s(){return this.headerForm.controls;}
  getRecords(){
    this.Submitted = true;
    this.recordSpinner = true;
    if (this.headerForm.valid) {
      var userRequest = {
        txnId : this.headerForm.value.records
      }
      this.records = this.headerForm.value.records;
      this.api.postRequestResponseData("/rest/auth/report/search/records/ledger",userRequest).subscribe(res=>{
        console.log(res);
        this.ledgerList = res;
        this.recordSpinner=false;
      });
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
  getLedger(path:String, data:any){
    this.api.getRequest(path).subscribe(res=>{
      console.log(res);
      if(res){
        this.ledgerList = res.content;
        this.totalPage.length = res.totalPages;
        this.pageNumber = res.pageable.pageNumber;
      }
    });
  }

  changeUser(event:any){
    this.userId = event.target.value;
  }
}

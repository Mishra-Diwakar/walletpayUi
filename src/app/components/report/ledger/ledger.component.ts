import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  searchText='';
  dateFrom:any;
  dateTo:any;
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
  records: number = 2;
  id='';
  ledgerList : any[]=[];
  constructor(private fb:FormBuilder, private router:Router, private api:ApiService) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.id = atob(String(sessionStorage.getItem("userId")));
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null" || this.isLoggin !="true"){
      this.router.navigate(['/login']);
      return;
    }
    var userRequest = {
      id:this.id
    }
    this.getLedger("/rest/auth/report/ledger/"+0+"/"+this.records,userRequest);
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
  selectDateTo(event:any){
    this.dateTo = event.target.value;
  }
  
  search(){
    this.searchSpinner = true;
    var obj = {
      id: this.id,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo
    }
    console.log(this.dateFrom, this.dateTo);
    if (this.dateFrom == undefined || this.dateTo == undefined) { Swal.fire("Date not choosen"); this.searchSpinner = false; return; }
    this.api.postRequestResponseData("/rest/auth/report/ledger/search", obj).subscribe(res => {
      console.log(res);
      this.searchSpinner = false;
      this.ledgerList = res;
      // this.tableData = res;
    })
  }
  exportToExcel(){
    if (this.ledgerList.length == 0) {
      Swal.fire("data not available.");
      return;
    }
    let date = new Date();
    let element = document.getElementById("excel");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'LedgerReport_' + date + '.xlsx');
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
      PDF.save('ledger_report_'+date+'.pdf');
    });
  }
  changeStatus(event:any){
    var obj = {
      id: this.id,
      status : event.target.value
    }
    if(event.target.value!="default"){
      this.api.postRequestResponseData("/rest/auth/report/ledger/filter",obj).subscribe(res=>{
        console.log(res);
        if(res){
          this.ledgerList = res;
        }
      });
    }else{
      this.getLedger("/rest/auth/report/ledger/"+0+"/"+this.records,obj);
    }
  }
  get s(){return this.headerForm.controls;}
  getRecords(){
    this.Submitted = true;
    if (this.headerForm.valid) {
      var obj = {
        id: this.id
      }
      this.records = this.headerForm.value.records;
      this.getLedger("/rest/auth/report/ledger/" + 0 + "/" + this.records,obj)
    }
    if (this.headerForm.invalid) {

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

}

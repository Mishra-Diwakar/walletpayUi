import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vpa-list',
  templateUrl: './vpa-list.component.html',
  styleUrls: ['./vpa-list.component.css']
})
export class VpaListComponent implements OnInit {
  vpaList:any[]=[];
  isLoggin='';
  totalPage: any = [];
  pageNumber: number = 0;
  currentPage: number = 0;
  prev: number = 0;
  next: number = 1;
  records: number = 50;
  constructor(private location:Location, private router:Router, private api:ApiService) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null"){
      this.router.navigate(['/login']);
      return;
    }

    this.getVpa("/rest/auth/report/vpa_list/"+0+"/"+this.records)
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
     this.getVpa("/rest/auth/report/vpa_list/" + i + "/" + this.records);
  }
  gotoNextPage() {
    this.currentPage++;
    this.changePage(this.currentPage);
  }
  gotoPreviousPage() {
    this.currentPage--;
    this.changePage(this.currentPage);
  }
  key: string = '';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  getVpa(path:String){
    this.api.getRequest(path).subscribe(res=>{
      console.log(res);
      if(res){
        this.vpaList = res.content;
        this.totalPage.length = res.totalPages;
        this.pageNumber = res.pageable.pageNumber;
      }
    });
  }
  backClicked(){
    this.location.back();
  }
}

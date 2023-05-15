import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  headerForm!: FormGroup;
  title = 'my users'
  searchText = '';
  prev: number = 0;
  next: number = 1;
  records: number = 50;
  pageNumber: number = 0;
  currentPage: number = 0;
  userList: any[] = [];
  totalPage : any=[];
  Submitted=false;
  recordSpinner=false;
  isLoggin='';
  isApiUser='';
  constructor(private location: Location, private api: ApiService, private fb:FormBuilder, private login:LoginService, private router:Router) { }

  ngOnInit(): void {
    // this.userList = this.users;
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null"){
      this.router.navigate(['/login']);
      return;
    }
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    if(this.isApiUser=="1"){
      this.router.navigate(['/page-not-found']);
      return;
    }
    this.getUserList("/rest/auth/user/users/"+ 0 +"/"+this.records);
    this.headerForm = this.fb.group({
      records:['',[Validators.required, Validators.pattern("^[0-9]*$")]]
    });

  }
  key: string = '';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  get s(){return this.headerForm.controls;}
  backClicked() {
    this.location.back();
  }

  getRecords() {
    this.Submitted = true;
    if(this.headerForm.value.records<=0){
      this.headerForm.controls['records'].setErrors({'pattern':true});
    }
    if(this.headerForm.valid){
      this.recordSpinner=true;
      var records = this.headerForm.value.records
      this.api.getRequest("/rest/auth/user/get/"+records).subscribe(res=>{
        if(res){
          this.userList = res;
          console.log(res);
          this.recordSpinner=false;
        }
      });
      this.recordSpinner=false;
    }
    if(this.headerForm.invalid){ return; }

  }
  editUser(data: any) {   sessionStorage.setItem("editId",btoa(data.id));  }
  deleteUser(data: any, index:number) {
    // this.userList.splice(index, 1);
    this.api.postRequestResponseData("/rest/auth/user/delete",data).subscribe(res=>{
     this.getUserList("/rest/auth/user/users/"+ 0 +"/"+this.records);
      Swal.fire(res.msg);
    });
  }

  getUserList(path:string){
    this.api.getRequest(path).subscribe(res=>{
      // this.userList = res;
      console.log(res)
      this.userList = res.content;
      this.totalPage.length = res.totalPages;
      this.pageNumber = res.pageable.pageNumber;
    });
  }
  changePage(i: number) {
    this.currentPage = i;
    var obj = {
      id: this.login.getUserid()
    }
    if (i != 0) { this.prev = 1; }
    if (i == 0) { this.prev = 0; }
    if (i == this.totalPage.length - 1) { this.next = 0; }
    if (i != this.totalPage.length - 1) { this.next = 1; }
    this.getUserList("/rest/auth/user/users/"+ i +"/"+this.records);
  }

  gotoNextPage() {
    this.currentPage++;
    this.changePage(this.currentPage);
  }
  gotoPreviousPage() {
    this.currentPage--;
    this.changePage(this.currentPage);
  }
  aadhar='';
  pan='';
  company='';
  dob='';
  address='';
  state='';
  viewData(data:any){
    console.log(data)
    this.aadhar = data.adhaarId;
    this.pan = data.panId;
    this.dob = data.dob;
    this.address = data.address;
    this.state = data.state;
    this.company = data.companyName;
  }
 

}

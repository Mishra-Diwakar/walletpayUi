import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css']
})
export class FundComponent implements OnInit {
  fundForm!:FormGroup;
  Submitted = false;
  title="Fund"
  userType:any=[];
  userData:any=[];
  userName:string='';
  mobile:string='';
  reg:string='';
  today:any;
  id='';
  balance:number=0;
  isLoggin='';
  isApiUser='';
  submitSpinner=false;
  recentSpinner=false;
  recentTransaction:any[]=[];
  constructor(private location:Location, private fb:FormBuilder, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null"){
      this.router.navigate(['/login']);
      return;
    }
    if(this.isApiUser =="1"){
      this.router.navigate(['/page-not-found']);
      return;
    }
    this.id = atob(String(sessionStorage.getItem("editId")));
    this.getUser();

    this.fundForm = this.fb.group({
      type:['default',Validators.required],
      amount:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      remarks:['',Validators.required],
    });
    this.today = new Date();
    this.userData = this.api.userData;
    this.userName = this.userData.fullName;
    this.mobile = this.userData.mobile;
    console.log(this.userData)
  }
  fundSubmit(){
    this.Submitted=true;
    if(this.fundForm.value.type==="default"){
      this.fundForm.controls['type'].setErrors({'required':true});
    }
    if(this.fundForm.valid){
      this.submitSpinner = true;
    var userRequest = {
      id : this.id,
      username : this.userName,
      mobile : this.mobile,
      type : this.fundForm.value.type,
      amount : this.fundForm.value.amount,
      remarks : this.fundForm.value.remarks,
    }

    this.api.postRequestResponseData("/rest/auth/user/credit_debit", userRequest).subscribe(res=>{
      Swal.fire(res.msg);
      if(res.isError=="false"){
        if(userRequest.type=="CREDIT"){
          this.balance = this.balance+userRequest.amount;
        }
        if(userRequest.type=="DEBIT"){
          this.balance -= userRequest.amount;
        }
        
        this.getRecentTransaction();
      }
      this.submitSpinner = false;
    });
    this.submitSpinner = false;
  }
    if(this.fundForm.invalid){
      this.submitSpinner = false;
      alert("invalid fund form");
    }

  }
  backClicked(){
    this.location.back();
  }

  get s() { return this.fundForm.controls; }

  getUser(){
    var userRequest = {
      id:this.id
    }
    this.api.postRequestResponseData("/rest/auth/user/get",userRequest).subscribe(res=>{
      this.userName = res.username;
      this.mobile = res.mobile;
      this.balance = res.mainWallet;
    });
   this.getRecentTransaction();
  }

  getRecentTransaction(){
    this.recentSpinner=true;
    var userRequest = {
      id:this.id
    }
    this.api.postRequestResponseData("/rest/auth/report/recent/credit_debit",userRequest).subscribe(res=>{
      if(res){
        this.recentSpinner=false;
        this.recentTransaction = res;
      }
      this.recentSpinner=false;
    });
  }

}

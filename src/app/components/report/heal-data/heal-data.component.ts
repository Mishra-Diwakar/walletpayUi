import { Location, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heal-data',
  templateUrl: './heal-data.component.html',
  styleUrls: ['./heal-data.component.css']
})
export class HealDataComponent implements OnInit {
  users:any[]=[];
  userHash:any = {};
  isApiUser='';
  isLoggin='';
  id='';
  healForm !: FormGroup;
  Submitted=false;
  allUser='';
  saveUsername:boolean=false;
  submitSpinner = false;
  constructor(private location: Location, private api:ApiService, private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.id = atob(String(sessionStorage.getItem("userId")));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null" || this.isLoggin !="true"){
      this.router.navigate(['/login']);
      return;
    }
    if(this.isApiUser=="1"){
      this.router.navigate(['/page-not-found']);
      return;
    }
    this.api.getRequest("/rest/auth/user/all/active").subscribe(res=>{
      this.users = res;
      this.users.forEach((user)=>{
        this.userHash[user.id] = user;
       });
    });

    this.healForm = this.fb.group({
      users : ['-1',Validators.required],
      date : ['',Validators.required]
    });
  }
  backClicked(){
    this.location.back();
  }
  healSubmit(){
    this.submitSpinner = true;
    this.Submitted = true;
    if(this.healForm.value.users==-1){
      this.healForm.controls['users'].setErrors({'required':true});
    }
    let date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
    let date2 =  formatDate(this.healForm.value.date,'yyyy-MM-dd','en_US');
    let date3 =  formatDate("2023-04-27",'yyyy-MM-dd','en_US');
    if(date2>date1 || date2<date3){
      this.submitSpinner = false;
      Swal.fire("Date must be between 2023-04-27 to "+date1)
      return;
    }
    var userRequest = {
      userId : this.healForm.value.users,
      date : this.healForm.value.date,
    }
    this.api.postRequestResponseData("/rest/auth/transaction/healOpeningClosingByUserId",userRequest).subscribe(res=>{
      console.log(res);
      this.submitSpinner = false;
      Swal.fire(res.msg+"\n but server side code remains");
    });
  }
  deactiveUser(){
      this.api.getRequest("/rest/auth/user/deactive/all").subscribe(res=>{
        Swal.fire(res.msg);
      });
  }
  activateUser(){
      this.api.getRequest("/rest/auth/user/activate/all").subscribe(res=>{
        Swal.fire(res.msg);
      });
  }
  healGeneratedLink(){
    this.api.getRequest("/rest/auth/transaction/healGeneratedLink").subscribe(res=>{
      Swal.fire(res);
    });
  }
  healOpenClose(){
    this.api.getRequest("/rest/auth/transaction/healOpeningClosing").subscribe(res=>{
      Swal.fire(res);
    });
  }
  healProfit(){
    this.api.getRequest("/rest/auth/transaction/healProfit").subscribe(res=>{
      Swal.fire(res);
    });
  }
  healFailedTransactions(){
    this.api.getRequest("/rest/auth/transaction/healFailedTransactions").subscribe(res=>{
      Swal.fire(res);
    });
  }

  healPayoutProcessing(){
    this.api.getRequest("/rest/auth/transaction/healPayoutProcessing").subscribe(res=>{
      Swal.fire(res);
    });
  }
  healAkhunaCharge(){
    this.api.getRequest("/rest/auth/transaction/healAkhunaCharge").subscribe(res=>{
      Swal.fire(res);
    });
  }

  healBackupData(){
    this.api.getRequest("/rest/auth/transaction/healBackupData").subscribe(res=>{
      Swal.fire(res);
    });
  }

  archiveData(){
    this.submitSpinner = true;
    this.Submitted = true;
    if(this.healForm.value.users==-1){
      this.healForm.controls['users'].setErrors({'required':true});
    }
    let date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
    let date2 =  formatDate(this.healForm.value.date,'yyyy-MM-dd','en_US');
    let date3 =  formatDate("2023-04-27",'yyyy-MM-dd','en_US');
    if(date2>date1 || date2<date3){
      this.submitSpinner = false;
      Swal.fire("Date must be between 2023-04-27 to "+date1)
      return;
    }
    var userRequest = {
      userId : this.healForm.value.users,
      date : this.healForm.value.date,
    }
    this.api.postRequestResponseData("/rest/auth/transaction/archiveData",userRequest).subscribe(res=>{
      console.log(res);
      this.submitSpinner = false;
      Swal.fire(res.msg+"\n but server side code remains");
    });
  }

  archiveDataByUser(){
    this.submitSpinner = true;
    this.Submitted = true;
    if(this.healForm.value.users==-1){
      this.healForm.controls['users'].setErrors({'required':true});
    }
    let date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
    let date2 =  formatDate(this.healForm.value.date,'yyyy-MM-dd','en_US');
    let date3 =  formatDate("2023-04-27",'yyyy-MM-dd','en_US');
    if(date2>date1 || date2<date3){
      this.submitSpinner = false;
      Swal.fire("Date must be between 2023-04-27 to "+date1)
      return;
    }
    var userRequest = {
      userId : this.healForm.value.users,
      date : this.healForm.value.date,
    }
    this.api.postRequestResponseData("/rest/auth/transaction/archiveDataByUser",userRequest).subscribe(res=>{
      console.log(res);
      this.submitSpinner = false;
      Swal.fire(res.msg+"\n but server side code remains");
    });
  }

  public onSaveUsernameChanged(value:boolean){
    this.saveUsername = value;
    console.log(this.saveUsername)
}
  get s(){ return this.healForm.controls; }
}

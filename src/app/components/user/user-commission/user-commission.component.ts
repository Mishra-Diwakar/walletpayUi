import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { isNumberObject } from 'util/types';
declare function hideModel(): any;

@Component({
  selector: 'app-user-commission',
  templateUrl: './user-commission.component.html',
  styleUrls: ['./user-commission.component.css']
})
export class UserCommissionComponent implements OnInit {

  // commissionForm!: FormGroup;
  // Submitted = false;
  title = "Commission";
  title2 = "Commission";
  userData: any[] = [];
  commissionList : any[]=[];
  userName: string = 'vikash';
  mobile: string = '9876567890';
  reg: string = '765568998';
  today: any;
  comFormShow=false;
  userId='';
  isLoggin='';
  isPackageAssigned=false;
  isApiUser='';
  packageName='';
  constructor(private location: Location, private fb: FormBuilder, private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null" || this.isLoggin!="true"){
      this.router.navigate(['/login']);
      return;
    }
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    if(this.isApiUser=="1"){
      this.router.navigate(['/page-not-found']);
      return;
    }
    this.userId = atob(String(sessionStorage.getItem("editId")));
    var userRequest = {
      id : this.userId
    }
    this.api.postRequestResponseData("/rest/auth/user/get",userRequest).subscribe(res=>{
      this.userData = res;
      this.userName = res.username;
      this.mobile = res.mobile;
    });
    this.api.postRequestResponseData("/rest/auth/user/get-packageName",userRequest).subscribe(res=>{
      this.packageName = res[0].packageName;
      console.log(res);
    });
    this.api.getRequest("/rest/auth/user/packageRow/"+this.userId).subscribe(res=>{
      console.log(res);
      if(res){
        this.commissionList = res;
      }
      if(res==null){
        this.isPackageAssigned = true;
      }
  
    });
    // this.commissionForm = this.fb.group({
    //   packageName:['',[Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
    //   amountFrom: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    //   amountTo: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    //   payingCharge: ['', [Validators.required, Validators.pattern("^\\d*\\.?\\d+$")]],
    //   payoutCharge: ['', [Validators.required, Validators.pattern("^\\d*\\.?\\d+$")]],
    //   payingType: ['FLAT', Validators.required],
    //   payoutType: ['FLAT', Validators.required]

    // });
    this.today = new Date();
  }
  // addCharge(){
  //   this.comFormShow=true;
  //   this.title2 = "Add Charge";
  // }
  // commissionSubmit() {
  //   this.Submitted = true;
  //   if (this.commissionForm.valid) {
     
  //    this.title2 = "Commission";
    //  Swal.fire("added");
    // var userRequest = {
    //   packageName : this.commissionForm.value.packageName,
    //   amount_from : this.commissionForm.value.amountFrom,
    //   amount_to : this.commissionForm.value.amountTo,
    //   payoutCharge : this.commissionForm.value.payoutCharge,
    //   payoutType : this.commissionForm.value.payoutType,
    //   payinCharge : this.commissionForm.value.payingCharge,
    //   payinType : this.commissionForm.value.payingType,
    //   userName : this.userName,
    //   userId : this.userId,
    // }

    // this.api.postRequestResponseData("/rest/auth/user/saveCommission", userRequest).subscribe(res=>{
    //   Swal.fire(res.msg);
    //   if(res.isError=="false"){
    //     this.comFormShow=false;
    //   }
    // });

    // }
    // if (this.commissionForm.invalid) {
    //   return;
    //  }
  // }
  backClicked() {
    this.location.back();
  }

  // get s() { return this.commissionForm.controls; }

 

}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Commission } from 'src/app/models/commission';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.css']
})
export class EditPackageComponent implements OnInit {
  packageName : string  = "";
  
  payoutArray: any[] = [];
  payinArray: any[] = [];
  aadharPay: any[] = []; 
  aeps: any[] = [];
  payout: any[] = [];
  recharge: any[] = [];
  bbps: any[] = [];
  userId:number=0;
  isLoggedIn=false;
  newForm = new Commission()
  userTypeId: number = 0;
  i=1;
  isLoggin='';
  isApiUser=atob(String(sessionStorage.getItem("isApiUser")));
  constructor(private fb: FormBuilder ,private router:Router, private _location:Location,
              private api:ApiService) {
    
     }

  commition = {};
  

  addPayin() {
    this.newForm = new Commission();
    this.newForm.serviceType = "PAYIN"; 
    this.payinArray.push(this.newForm);
  }

  addPayout() {
    this.newForm = new Commission();
    this.newForm.serviceType = "PAYOUT";
    this.payoutArray.push(this.newForm);
  }
  
  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null"){
      this.router.navigate(['/login']);
      return;
    }
    if(this.isApiUser == "1"){
      this.router.navigate(['/page-not-found']);
      return;
    }
    this.packageName = String(sessionStorage.getItem("packageName"));
    var userRequest = {
      packageName : this.packageName
    }
    this.api.postRequestResponseData("/rest/auth/user/get/package",userRequest).toPromise()
    .then((resp: any[]) => {
      console.log(resp);
      resp.forEach(object => {
        this.packageName = object.packageName;
        this.newForm = new Commission();
        this.newForm.id = object.id;
        this.newForm.serviceType = object.serviceType;
        this.newForm.amount_to = object.amount_to;
        this.newForm.amount_from = object.amount_from;
        this.newForm.payinCharge = object.charge;
        this.newForm.payoutCharge = object.charge;
        this.newForm.payinType =  object.commissionTypeFlat=="P" ? "PERCENT" : "FLAT";
        this.newForm.payoutType =  object.commissionTypeFlat=="P" ? "PERCENT" : "FLAT";
     
        if(this.newForm.serviceType == 'PAYOUT'){
          this.payoutArray.push(this.newForm);
        }else if(this.newForm.serviceType == 'PAYIN'){
          this.payinArray.push(this.newForm);
        }

      })
    });    
  }

  submit() {
    var requestMap: any = {};
    requestMap['packageName'] = this.packageName;
    requestMap['PAYIN'] = this.payinArray,
    requestMap['PAYOUT'] = this.payoutArray

    if(!this.checkPackageName(requestMap['packageName'])){
      Swal.fire("Invalid package name");
      return;
    }
    if(!this.checkPayin(requestMap['PAYIN'])){
      Swal.fire("Invalid PAYIN form");
      return;
    }
    if(!this.checkPayout(requestMap['PAYOUT'])){
      Swal.fire("Invalid PAYOUT form");
      return;
    }
   
    var requestMap: any = {};
    requestMap['packageName'] = this.packageName;
    requestMap['PAYIN'] = this.payinArray;
    requestMap['PAYOUT'] = this.payoutArray;

    console.log(requestMap)
    this.api.postRequestResponseData("/rest/auth/user/saveCommission",requestMap).subscribe(res=>{
      Swal.fire(res.msg);
    });
  }
  back() {
    this._location.back();
  }

  checkPayin(newForm: any): boolean {
    console.log(newForm);
      for (let i = 0; i < newForm.length; i++) {
        var amntfrom = newForm[i].amount_from;
        var amntTo = newForm[i].amount_to;
        var comType = newForm[i].payinType;
        var serviceType = newForm[i].serviceType;
        var payinCharge = newForm[i].payinCharge;
        if (amntfrom == undefined || amntTo == undefined || comType == undefined
          || serviceType == undefined || amntfrom < 0 || amntTo < 0 || payinCharge<0) { return false; }
    }
   
    return true;
  }
  checkPayout(newForm: any): boolean {
    console.log(newForm);
    for (let i = 0; i < newForm.length; i++) {
      var amntfrom = newForm[i].amount_from;
      var amntTo = newForm[i].amount_to;
      var comType = newForm[i].payoutType;
      var serviceType = newForm[i].serviceType;
      var payoutCharge = newForm[i].payoutCharge;
      if (amntfrom == undefined || amntTo == undefined || comType == undefined
        || serviceType == undefined || amntfrom < 0 || amntTo < 0 || payoutCharge<0) { return false; }
  }
 
  return true;
}
  checkPackageName(name: any): boolean {
    console.log(name);
    if (name == "" || name == undefined || name == null) {
      return false;
    }
    else {
      return true
    }
  }
  pacNameEvent(event: any) {
    this.packageName = event.target.value;
  }

}

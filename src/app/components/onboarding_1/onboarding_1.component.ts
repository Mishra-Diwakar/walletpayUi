import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'onboarding_1',
  templateUrl: './onboarding_1.component.html',
  styleUrls: ['./onboarding_1.component.css']
})
export class OnboardingOne implements OnInit {
  onboardingForm !: FormGroup;
  Submitted = false;
  walletSpinner = false;
  title = "Onboarding 1"
  isLoggin = "false";
  isApiUser='';
  constructor(private fb:FormBuilder, private api:ApiService, private router:Router, private location:Location) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null"){
      this.router.navigate(['/login']);
      return;
    }
    if(this.isApiUser=="1"){
      this.router.navigate(['/page-not-found']);
      return;
    }
    this.onboardingForm = this.fb.group({
      bcagentid :   ['',[Validators.required,Validators.pattern("^[0-9]{10}$")]],
      bcagentname : ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      lastname : ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      companyname : ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      address :  ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      area : ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      pincode: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      mobilenumber : ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]],
      shopname :  ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      shopaddress : ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      shopstate :  ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      shopcity :  ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      shopdistrict : ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      shoparea : ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      shoppincode :  ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      pancard :  ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
    });
  }
  get s() { return this.onboardingForm.controls; }
  
  onboardingSubmit() {
    this.Submitted = true;  
    if (this.onboardingForm.valid) {
      this.walletSpinner = true;
      var onboardingRequest = {
        bcagentid : this.onboardingForm.value.bcagentid,
        bcagentname : this.onboardingForm.value.bcagentname,
        lastname : this.onboardingForm.value.lastname,
        companyname : this.onboardingForm.value.companyname,
        address : this.onboardingForm.value.address,
        area : this.onboardingForm.value.area,
        pincode : this.onboardingForm.value.pincode,
        mobilenumber : this.onboardingForm.value.mobilenumber,
        shopname : this.onboardingForm.value.shopname,
        shopaddress : this.onboardingForm.value.shopaddress,
        shopstate : this.onboardingForm.value.shopstate,
        shopcity : this.onboardingForm.value.shopcity,
        shopdistrict : this.onboardingForm.value.shopdistrict,
        shoparea : this.onboardingForm.value.shoparea,
        shoppincode : this.onboardingForm.value.shoppincode,
        pancard : this.onboardingForm.value.pancard        
      }
      console.log(onboardingRequest);
       this.api.postRequestResponseData("/rest/auth/transaction/onboarding_1",onboardingRequest).subscribe(res=>{
         Swal.fire(res.statusDesc);
         this.walletSpinner = false;
       });
    }
  }

  backClicked() {
    this.location.back();
  }
}

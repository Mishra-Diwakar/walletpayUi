import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'onboarding_1',
  templateUrl: './onboarding_2.component.html',
  styleUrls: ['./onboarding_2.component.css']
})
export class OnboardingTwo implements OnInit {
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
      merchantBusinessName : ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      firstName : ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      lastName :['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      pan :  ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      accountNumber : ['', [Validators.required,Validators.pattern("^[0-9]+$")]],
      ifsc:  ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      legalStoreName : ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      userName :  ['',[Validators.required,Validators.pattern("^[0-9]{10}$")]],
      merchantVirtualAddress :  ['', [Validators.required, Validators.pattern("^[0-9a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      merchantEmailId :  ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      merchantMobileNumber :  ['',[Validators.required,Validators.pattern("^[0-9]{10}$")]],
      requestingUserName :   ['',[Validators.required,Validators.pattern("^[0-9]{10}$")]],
      bankName :  ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
    });
  }
  get s() { return this.onboardingForm.controls; }
  
  onboardingSubmit() {
    this.Submitted = true;  
    if (this.onboardingForm.valid) {
      this.walletSpinner = true;
      var onboardingRequest = {
        merchantBusinessName : this.onboardingForm.value.merchantBusinessName,
        firstName : this.onboardingForm.value.firstName,
        lastName : this.onboardingForm.value.lastName,
        pan : this.onboardingForm.value.pan,
        accountNumber : this.onboardingForm.value.accountNumber,
        ifsc : this.onboardingForm.value.ifsc,
        legalStoreName : this.onboardingForm.value.legalStoreName,
        userName : this.onboardingForm.value.userName,
        merchantVirtualAddress : this.onboardingForm.value.merchantVirtualAddress,
        merchantEmailId : this.onboardingForm.value.merchantEmailId,
        merchantMobileNumber : this.onboardingForm.value.merchantMobileNumber,
        requestingUserName : this.onboardingForm.value.requestingUserName,
        bankName : this.onboardingForm.value.bankName,           
      }
      this.api.postRequestResponseData("/rest/auth/transaction/onboarding_2",onboardingRequest).subscribe(res=>{
        Swal.fire(res.statusDesc);
        this.walletSpinner = false;
      });
    }
  }

  backClicked() {
    this.location.back();
  }
}

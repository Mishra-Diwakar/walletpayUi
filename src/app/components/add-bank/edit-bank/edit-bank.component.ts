import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-bank',
  templateUrl: './edit-bank.component.html',
  styleUrls: ['./edit-bank.component.css']
})
export class EditBankComponent implements OnInit {
  walletForm !: FormGroup;
  Submitted = false;
  walletSpinner = false;
  title = "wallet load"
  showQr=false;
  showLink=false;
  link = '';
  qrData = '';
  isLoggin='';
  lat='';
  long='';
  isApiUser='';
  bankId='';
  bankData:any;
  userId ='';
  constructor(private router:Router, private fb:FormBuilder, private api:ApiService, private location:Location) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    this.bankId = atob(String(sessionStorage.getItem("bankId")));
    this.userId = atob(String(sessionStorage.getItem("userId")));
    console.log(this.bankId);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null"){
      this.router.navigate(['/login']);
      return;
    }
    // if(this.isApiUser =="1"){
    //   this.router.navigate(['/page-not-found']);
    //   return;
    // }
    var userRequest = {
      id : this.bankId
    }

    this.api.postRequestResponseData("/rest/auth/user/get/oneBank", userRequest).subscribe(res=>{
      console.log(res);
      this.bankData = res;
      this.walletForm.controls['name'].setValue(this.bankData.beneName);
      this.walletForm.controls['account'].setValue(this.bankData.beneAccountNo);
      this.walletForm.controls['ifsc'].setValue(this.bankData.beneifsc);
      this.walletForm.controls['mobile'].setValue(this.bankData.benePhoneNo);
      this.walletForm.controls['bank'].setValue(this.bankData.beneBankName);
      this.walletForm.controls['amount'].setValue(this.bankData.amount);
      this.walletForm.controls['pincode'].setValue(this.bankData.pincode);
      this.walletForm.controls['paymentType'].setValue(this.bankData.fundTransferType);
    });

    this.walletForm = this.fb.group({
      name : ['',[Validators.required,Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      account : ['', [Validators.required,Validators.pattern("^[0-9]+$")]],
      ifsc : ['',[Validators.required,Validators.pattern("^[A-Z]{4}0[A-Z0-9]{6}$")]],
      mobile : ['',[Validators.required,Validators.pattern("^[0-9]{10}$")]],
      bank : ['',[Validators.required,Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      amount: ['0', [Validators.required, Validators.pattern("^[0-9]*$")]],
      pincode : ['', [Validators.required, Validators.pattern("^[1-9]{1}[0-9]{2}[0-9]{3}$")]],
      paymentType : ['NEFT',Validators.required],
    });
    this.api.getLocation().subscribe(res=>{
      var json = JSON.parse(JSON.stringify(res));
      this.lat = json.latitude;
      this.long = json.longitude;
    });
  }
  get s() { return this.walletForm.controls; }
  
  walletSubmit() {
    this.Submitted = true;  
    if (this.walletForm.valid) {
      this.walletSpinner = true;
      var userRequest = {
        id : this.bankId,
        beneName : this.walletForm.value.name,
        beneAccountNo : this.walletForm.value.account,
        beneifsc : this.walletForm.value.ifsc,
        benePhoneNo : Number(this.walletForm.value.mobile),
        beneBankName : this.walletForm.value.bank,
        amount : this.walletForm.value.amount,
        fundTransferType : this.walletForm.value.paymentType,
        pincode : this.walletForm.value.pincode,
        custName : atob(String(sessionStorage.getItem("fullName"))),
        custMobNo : atob(String(sessionStorage.getItem("mobile"))),
        latlong : this.lat+","+this.long,
        userId : this.userId
      }
      this.api.postRequestResponseData("/rest/auth/user/editBank",userRequest).subscribe(res=>{
        Swal.fire(res.msg);
        this.walletSpinner = false;
      });
    }
  }

  backClicked() {
    this.location.back();
  }
}

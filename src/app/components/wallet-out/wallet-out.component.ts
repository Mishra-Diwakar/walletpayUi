import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wallet-out',
  templateUrl: './wallet-out.component.html',
  styleUrls: ['./wallet-out.component.css']
})
export class WalletOutComponent implements OnInit {
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
  constructor(private fb:FormBuilder, private api:ApiService, private router:Router, private location:Location) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null"){
      this.router.navigate(['/login']);
      return;
    }
    this.walletForm = this.fb.group({
      name : ['',[Validators.required,Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      account : ['', [Validators.required,Validators.pattern("^[0-9]+$")]],
      ifsc : ['',[Validators.required,Validators.pattern("^[A-Z]{4}0[A-Z0-9]{6}$")]],
      mobile : ['',[Validators.required,Validators.pattern("^[0-9]{10}$")]],
      bank : ['',[Validators.required,Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      amount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
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
      }
      this.api.postRequestResponseData("/rest/auth/transaction/payOut",userRequest).subscribe(res=>{
        Swal.fire(res.msg);
        this.walletSpinner = false;
      });
    }
  }

  backClicked() {
    this.location.back();
  }
}

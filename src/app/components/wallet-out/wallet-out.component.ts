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
  showQr = false;
  showLink = false;
  link = '';
  qrData = '';
  isLoggin = '';
  lat = '';
  long = '';
  banks: any[] = [];
  bankData:any;
  isApiUser='';
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    console.log(this.isLoggin);
    if (this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null") {
      this.router.navigate(['/login']);
      return;
    }
    // if(this.isApiUser=="1"){
    //   this.router.navigate(['/page-not-found']);
    //   return;
    // }
    this.getBanks();
    this.walletForm = this.fb.group({
      bank: ['default', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      clientReferenceNo : ['',[Validators.required,Validators.minLength(12), Validators.maxLength(22)]],
      count : ['1',Validators.pattern("^[0-9]*$")]
    });
    this.api.getLocation().subscribe(res => {
      var json = JSON.parse(JSON.stringify(res));
      this.lat = json.latitude;
      this.long = json.longitude;
    });
  }
  get s() { return this.walletForm.controls; }
  getBanks() {
    this.api.getRequest("/rest/auth/user/banks").subscribe(res => {
      if (res) {
        this.banks = res;
      }
    });
  }
  countLength(event:any){
    let val = event.target.value;
    console.log(val.length);
  }
  walletSubmit() {
    this.Submitted = true;

    if(this.walletForm.value.bank=="default"){
      Swal.fire("please select bank");
      return;
    }
    if(this.walletForm.value.count<=0){
      Swal.fire("Total Walletout must be greater than zero(0)");
      return;
    }
    if(this.walletForm.value.count %1 !=0){
      Swal.fire("Total Walletout must not be decimal");
      return;
    }
    var userRequest : any = {};
    if (this.walletForm.valid) {
      this.walletSpinner = true;
       userRequest = {
        amount: this.walletForm.value.amount,
        beneName: this.bankData.beneName,
        beneAccountNo: this.bankData.beneAccountNo,
        beneifsc: this.bankData.beneifsc,
        benePhoneNo: Number(this.bankData.benePhoneNo),
        beneBankName: this.bankData.beneBankName,
        fundTransferType: this.bankData.fundTransferType,
        pincode: this.bankData.pincode,
        custName: atob(String(sessionStorage.getItem("userName"))),
        custMobNo: Number(this.bankData.custMobNo),
        latlong: this.bankData.latlong,
        clientReferenceNo : this.walletForm.value.clientReferenceNo,
      }
      console.log(userRequest)
      if(this.isApiUser!="1"){
        console.log(userRequest)
        this.api.postRequestResponseData("/rest/auth/transaction/payOut", userRequest).subscribe(res => {
          Swal.fire(res.msg);
          this.walletSpinner = false;
        });
      }
      if(this.isApiUser=="0"){
        userRequest['count'] = parseInt(this.walletForm.value.count) 
        
        this.api.postRequestResponseData("/rest/auth/transaction/payOut/request", userRequest).subscribe(res => {
          Swal.fire(res.msg);
          this.walletSpinner = false;
        });
      }
    }
    if(this.walletForm.invalid){
    }
  }

  backClicked() {
    this.location.back();
  }
  changeBank(event:any){
    if(event.target.value!='default'){
      for(let i=0;i<this.banks.length;i++)
      {
        if(this.banks[i].id==event.target.value){
          this.bankData = this.banks[i];
        }
      }
    }
    console.log(this.bankData)
  }
}

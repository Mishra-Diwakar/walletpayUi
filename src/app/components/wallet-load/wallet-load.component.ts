import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wallet-load',
  templateUrl: './wallet-load.component.html',
  styleUrls: ['./wallet-load.component.css']
})
export class WalletLoadComponent implements OnInit {
  walletForm !: FormGroup;
  Submitted = false;
  walletSpinner = false;
  title = "wallet load"
  showQr=false;
  showLink=false;
  link = '';
  qrData = '';
  isLoggin='';
  isApiUser='';
  constructor(private fb: FormBuilder, private location: Location, private router:Router, private api:ApiService) { }

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
    this.walletForm = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      option: ['QR', Validators.required]
    });
  }
  get s() { return this.walletForm.controls; }
  walletSubmit() {
    this.walletSpinner=true;
    if (this.walletForm.invalid) { this.walletSpinner=false; return; }

      var requestMap = {
        amount : this.walletForm.value.amount,
        option : this.walletForm.value.option,
      }

      this.api.postRequestResponseData("/rest/auth/transaction/generate-upi",requestMap).subscribe(res=>{
        if(parseInt(res.statusCode) == 0){
          this.walletSpinner=false;
          console.log(res);
          if(this.walletForm.value.option == 'QR'){
            this.qrData = res.qrData;7 
            this.showQr=true;
            this.showLink=false;
          }else{
            this.link = res.intentData;
            this.showQr=false;
            this.showLink=true;
          }          
        }else{
          this.walletSpinner = false;
          Swal.fire(res.statusDesc);
        }
      });
  }
  backClicked() {
    this.location.back();
  }
}

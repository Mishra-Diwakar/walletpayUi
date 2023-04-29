import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  title = "change password";
  chengePassword! : FormGroup;
  submitted = false;
  passwordSpinner=false;
  userId = '';
  isLoggin='';
  constructor(private formBuilder: FormBuilder,
    private api:ApiService ,private _location:Location, private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.userId = atob(String(sessionStorage.getItem("userId")));
    if(this.isLoggin!="true"){
      this.router.navigate(['/login']);
      return;
    }
    this.chengePassword = this.formBuilder.group({
      oldPassword: ['',Validators.required],
      newPassword: ['',[Validators.required, Validators.minLength(8)]]
    });
    
  }
  get f() { return this.chengePassword.controls; }

  chengePasswordSubmit(): void {
    this.passwordSpinner = true;
    this.submitted = true;

    //if form is valid
    if(this.chengePassword.valid){  
      var requestMap = {
        id : this.userId,
        oldPassword : this.chengePassword.value.oldPassword,
        password : this.chengePassword.value.newPassword
      }
      this.api.postRequestResponseData("/rest/auth/user/change-password",requestMap).subscribe(res=>{
        console.log(res);
        this.passwordSpinner=false;
        Swal.fire(res.msg);
      });
      
      }


    // stop here if form is invalid
    if (this.chengePassword.invalid) {
      this.passwordSpinner=false;
        return;
    }

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.WalletTransfer.value))
    console.log(this.f.oldPassword.value);
    // console.log(this.f.otp.value);
    console.log(this.f.newPassword.value);
  }

  genratePassword(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i = 0; i < 12; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      
    this.chengePassword.controls["newPassword"].setValue(text);
  }

  backClicked():void{
    this._location.back();
  }

}

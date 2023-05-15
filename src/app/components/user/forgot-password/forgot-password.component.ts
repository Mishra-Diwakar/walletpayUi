import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
declare function showPassword():any;
declare function showConfirmPassword():any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  passwordForm!:FormGroup;
  mobileForm!:FormGroup;
  otpForm!:FormGroup;
  mainForm!:FormGroup;
  showOtpForm=false;
  passwordResetForm=false;
  submitted = false;
  constructor(private router:Router, private fb:FormBuilder, private api:ApiService) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      newPwd:['',Validators.required],
      password:['',Validators.required]
    });
    this.mobileForm = this.fb.group({
      email:['',Validators.required]
    });
    this.otpForm = this.fb.group({
      otpNum:['',Validators.required]
    });
  }
  getOtp(){
    this.submitted=true;
    if(this.mobileForm.valid){
      this.submitted=false;
      var userRequest = {
        email : this.mobileForm.value.email
      }
      this.api.postRequestResponseData("/rest/auth/user/verify/email",userRequest).subscribe(res=>{
        Swal.fire(res.msg);
        if(res.isError==false){
          this.showOtpForm = true;
        }
      });
    
    }
    
  }
  verifyOtp(){
    this.submitted=true;
    if(this.otpForm.valid){
      this.submitted=false;
      var userRequest = {
        email : this.mobileForm.value.email,
        otp : this.otpForm.value.otpNum
      }
      this.api.postRequestResponseData("/rest/auth/user/verify/otp",userRequest).subscribe(res=>{
        if(res.isError==false){
          this.passwordResetForm=true;  
        }
        if(res.isError==true){
          Swal.fire(res.msg); 
        }
        
      });
      
    }
   
  }
  resetPassword(){
    this.submitted=false;
    if(this.passwordForm.value.newPwd===this.passwordForm.value.password){
       var userRequest = {
        email :  this.mobileForm.value.email,
        password : this.passwordForm.value.password
       }
       this.api.postRequestResponseData("/rest/auth/user/forgotpassword",userRequest).subscribe(res=>{
        Swal.fire(res.msg);
        if(res.isError==false){
          this.router.navigate(['/login']);
        }
       });
    }else{
      Swal.fire("Password did not matched");
    }
    // send new password
  }
  get mob(){ return this.mobileForm.controls; }
  get otp(){ return this.otpForm.controls; }
  get pwd(){ return this.passwordForm.controls; }
  showPwd(){showPassword();}
  showPwd2(){showConfirmPassword(); }
}

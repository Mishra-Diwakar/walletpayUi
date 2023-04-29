import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
declare function showPassword():any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginSpinner=false;
  errormessage=false;
  isActive=true;
  constructor(private formBuilder: FormBuilder, private loginService:LoginService
     ,private router: Router,private apiService:ApiService) { }
  CheckLogin!: FormGroup;
  submitted = false;
  //take value for sanitization

  san:any;

  ngOnInit(): void {
    this.CheckLogin = this.formBuilder.group({
      username: ['',[Validators.required,Validators.pattern("^[A-Za-z][A-Za-z0-9_]{2,29}$")]],
      password:   ['',[Validators.required]],
    });

  }

  get f() { return this.CheckLogin.controls; }
  loginSubmit(): void {
    this.submitted = true;
    //if form is valid
    if(this.CheckLogin.valid){
      this.loginSpinner=true;
      // this.router.navigateByUrl("/dashboard");
     }

    // stop here if form is invalid
    if (this.CheckLogin.invalid) {
        return;
    }

    var loginRequest = {
      "username" : this.f.username.value,
      "password" : this.f.password.value
    }
    this.callService(loginRequest);
   
  }
  callService(loginRequest : any) {
    this.apiService.postRequestResponseData('/rest/auth/login', loginRequest).subscribe(
      (data) => {
       this.loginSpinner=false;
       console.log(data);
       if(data.errors[0]=="User not active"){
        //  Swal.fire(data.errors[0]);
        this.isActive = false;
         return;
       }
       
       console.log(data);

       this.router.navigate(['/dashboard']);
      //    sessionStorage.setItem("mainWallet", data.payload.user.main_wallet);
        sessionStorage.setItem("token",data.payload.token);
        sessionStorage.setItem("userId", btoa(data.payload.user.id));
        sessionStorage.setItem("isApiUser", btoa(data.payload.user.isApiUser));
        sessionStorage.setItem("userName", btoa(data.payload.user.username));
        sessionStorage.setItem("isLoggin","true");
        sessionStorage.setItem("fullName",btoa(data.payload.user.name));
        sessionStorage.setItem("mobile",btoa(data.payload.user.mobile));
        sessionStorage.setItem("email",btoa(data.payload.user.email));
        
      //   sessionStorage.setItem("userEmail", data.payload.user.email);
      //  sessionStorage.setItem("contact",data.payload.user.mobile);
      //   sessionStorage.setItem("userType", data.payload.user.userTypeId);
      //  sessionStorage.setItem("name",data.payload.user.name);
      //   sessionStorage.setItem("token", data.payload.token);
      //   sessionStorage.setItem("isReload", "true");
      //   sessionStorage.setItem("verifyUserKyc", data.payload.user.verifyUserKyc);
      //   sessionStorage.setItem("otpNum",data.payload.user.otpNum);
      //   //this.userPermissions = data.payload.permission;
      //  //sessionStorage.setItem("userSettings", this.userPermissions);
      //  this.router.navigateByUrl("/login-otp");
      //  //this.getUserRoles(data.payload.user.roles)
      },
      (response) => {
       this.loginSpinner=false;
       this.errormessage=true;
       // console.log(response);
       console.log("comes error...")
      this.loginService.logOut();
      this.router.navigateByUrl("/login");
      //this.alertService.error(response.error.errors[0], this.alertOptions);
      });
 }
 showPwd(){  showPassword(); }
}

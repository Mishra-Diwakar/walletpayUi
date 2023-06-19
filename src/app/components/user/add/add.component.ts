import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  createUser!: FormGroup;
  Submitted = false;
  title = "Add User"
  userType: any = [];
  parentId:string='';
  createSpinner=false;
  isLoggin='';
  isApiUser='';
  service :any[]=[];
  constructor(private router: Router, private fb: FormBuilder, private location: Location, private api:ApiService) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null"){
      this.router.navigate(['/login']);
      return;
    }
    if(this.isApiUser=="1"){
      this.router.navigate(['/page-not-found']);
      return;
    }
    this.api.getRequest("/rest/auth/user/service").subscribe(res=>{
      this.service = res;
      console.log(this.service)
    });
    if(this.isApiUser=="4"){
      this.parentId = atob(String(sessionStorage.getItem("userId")));
    }else{
      this.parentId = "1"
    }
    
    this.createUser = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      userName: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9_]{1,20}$")]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]],
      shop: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      aadhar: ['', [Validators.required, Validators.pattern("^[0-9]{12}$")]],
      pancard: ['', [Validators.required, Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}$")]],
      password: ['', [Validators.required, Validators.maxLength(8)]],
      address: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      state: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      pincode: ['', [Validators.required, Validators.pattern("^[1-9]{1}[0-9]{2}[0-9]{3}$")]],
      city: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]],
      dob: ['', Validators.required],
      service : ['1',Validators.required],
      vpa : [''],
      bcagentid : [''],
      lien_amount : ['0'],
      rolling_reserve : ['0'],
      isApiUser:['1'],
      payinUrl:[''],
      payoutUrl:[''],
      userIp : ['']
    });
    // this.userType = ['API'];
  }
  get s() { return this.createUser.controls; }
  createUserubmit() {
    this.Submitted = true;
    this.createSpinner=true;
    // var parentId = sessionStorage.getItem("userId");

    if (this.createUser.valid) {
      
      let user = new User(this.createUser.value.fullName,
        this.createUser.value.userName,
        this.createUser.value.dob,
        this.createUser.value.mobile,
        this.createUser.value.email,
        this.createUser.value.shop,
        this.createUser.value.aadhar,
        this.createUser.value.pancard,
        this.createUser.value.password,
        this.createUser.value.address,
        this.createUser.value.state,
        this.createUser.value.pincode,
        this.createUser.value.city,
        this.parentId,
        this.createUser.value.isApiUser,
        "ACTIVE",
        this.createUser.value.service,
        this.createUser.value.vpa,
        this.createUser.value.bcagentid,
        this.createUser.value.lien_amount,
        this.createUser.value.rolling_reserve,
        this.createUser.value.payinUrl,
        this.createUser.value.payoutUrl,
        this.createUser.value.userIp
      );

      var requestMap = {
        "user": user
      }
      console.log(requestMap)
      if(this.createUser.value.lien_amount <0 || this.createUser.value.rolling_reserve <0 ||
        this.createUser.value.lien_amount ==null || this.createUser.value.rolling_reserve ==null){
          Swal.fire("Please check lien or rolling amount");
          this.createSpinner = false;
          return;
        }
      this.api.postRequestResponseData("/rest/auth/user/createUser",requestMap).subscribe(res=>{
        console.log(res);
        this.createSpinner = false;
        Swal.fire(res.msg);
        if(res.isError=="false"){
          this.Submitted = false;
          this.ngOnInit();
        }
        
      });
      this.createSpinner = false;
      console.log(requestMap);
    }
    if (this.createUser.invalid) { this.createSpinner=false; }

  }
  backClicked() {
    this.location.back();
  }



}

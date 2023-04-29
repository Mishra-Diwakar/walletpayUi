import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { timestamp } from 'rxjs';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editUser!: FormGroup;
  userType: any = [];
  userData: any = [];
  service: any []=[];
  Submitted = false;
  title = "Edit User";
  userId = '';
  parentId='';
  editSpinner=false;
  isLoggin='';
  isApiUser='';
  constructor(private router: Router, private location: Location, private api: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null"){
      this.router.navigate(['/login']);
      return;
    }
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    if(this.isApiUser=="1"){
      this.router.navigate(['/dashboard']);
      return;
    }
    this.userId = atob(String(sessionStorage.getItem("editId")));
    var userRequest = {
      id: this.userId
    }
    this.api.getRequest("/rest/auth/user/service").subscribe(res=>{
      this.service = res;
    });
    this.api.postRequestResponseData("/rest/auth/user/get",userRequest).subscribe(res=>{
      console.log(res)
      this.userData = res;
      this.editUser.controls['fullName'].setValue(this.userData.name);
      this.editUser.controls['userName'].setValue(this.userData.username);
      this.editUser.controls['mobile'].setValue(this.userData.mobile);
      this.editUser.controls['shop'].setValue(this.userData.companyName);
      this.editUser.controls['aadhar'].setValue(this.userData.adhaarId);
      this.editUser.controls['pancard'].setValue(this.userData.panId);
      this.editUser.controls['address'].setValue(this.userData.address);
      this.editUser.controls['state'].setValue(this.userData.state);
      this.editUser.controls['pincode'].setValue(this.userData.pinCode);
      this.editUser.controls['city'].setValue(this.userData.city);
      this.editUser.controls['email'].setValue(this.userData.email);
      this.editUser.controls['status'].setValue(this.userData.status);
      this.editUser.controls['service'].setValue(this.userData.transactionService);
      this.editUser.controls['vpa'].setValue(this.userData.vpa);
      this.editUser.controls['bcagentid'].setValue(this.userData.bcagentid);
      this.editUser.controls['lien_amount'].setValue(this.userData.lienAmount);
      this.editUser.controls['rolling_reserve'].setValue(this.userData.rollingReserve);
      this.editUser.controls.dob.setValue(this.userData.dob);
    });
    this.editUser = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      userName: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9_]{1,20}$")]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]],
      shop: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      aadhar: ['', [Validators.required, Validators.pattern("^[0-9]{12}$")]],
      pancard: ['', [Validators.required, Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}$")]],
      address: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9.+',-_():\\s]+$")]],
      state: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      pincode: ['', [Validators.required, Validators.pattern("^[1-9]{1}[0-9]{2}[0-9]{3}$")]],
      city: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]],
      dob: ['', Validators.required],
      status : ['',Validators.required],
      service: ['',Validators.required],
      vpa : [''],
      bcagentid : [''],
      lien_amount : ['0'],
      rolling_reserve : ['0'] //Validators.pattern("^\d+(\.\d+)?$")
    });

  }
  editUsersubmit() {
    this.Submitted = true;
    if (this.editUser.valid) {
      this.editSpinner = true;
    // alert("valid form")
    let user = new User(
      this.editUser.value.fullName,
      this.editUser.value.userName,
      this.editUser.value.dob,
      this.editUser.value.mobile,
      this.editUser.value.email,
      this.editUser.value.shop,
      this.editUser.value.aadhar,
      this.editUser.value.pancard,
      "password",
      this.editUser.value.address,
      this.editUser.value.state,
      this.editUser.value.pincode,
      this.editUser.value.city,
      "0",
      "1",
      this.editUser.value.status,
      this.editUser.value.service,
      this.editUser.value.vpa,
      this.editUser.value.bcagentid,
      this.editUser.value.lien_amount,
      this.editUser.value.rolling_reserve
    );

    var requestMap = {
      "user": user
    }
    var id = Number(this.userId);
    console.log(requestMap)
    if(this.editUser.value.lien_amount <0 || this.editUser.value.rolling_reserve <0 ||
      this.editUser.value.lien_amount ==null || this.editUser.value.rolling_reserve ==null){
        Swal.fire("Please check lien or rolling amount");
        this.editSpinner = false;
        return;
      }
    this.api.postRequestResponseData("/rest/auth/user/edit/"+id,requestMap).subscribe(res=>{
      console.log(res);
      this.editSpinner = false;
      Swal.fire(res.msg);
    });
    }
    if (this.editUser.invalid) {
      this.editSpinner = false;
      console.log("invalid edit user form");
      console.log(this.editUser.value);
    }
  }
  backClicked() {
    this.location.back();
  }

  get s() { return this.editUser.controls; }

}

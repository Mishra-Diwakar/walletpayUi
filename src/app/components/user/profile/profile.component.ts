import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
profileForm!:FormGroup;
imageForm!:FormGroup;
Submitted=false;
profile!:File;
profilePicSize:number=0;
profilePicName='';
p2:any;
profileurl:any;
imageSrc: any;
isLoggin='';
userName='';
email = '';
mobile = '';
id='';
  constructor( private fb:FormBuilder, private api:ApiService, private router:Router) {
   
    
   }

  ngOnInit(): void {

    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.userName = atob(String(sessionStorage.getItem("userName")));
    this.mobile = atob(String(sessionStorage.getItem("mobile")));
    this.id = atob(String(sessionStorage.getItem("userId")));
    this.email = atob(String(sessionStorage.getItem("email")));
    console.log(this.isLoggin);
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null" || this.isLoggin!="true"){
      this.router.navigate(['/login']);
      return;
    }
    var userRequest = {
      id : this.id
    }
    this.api.getRequest("/rest/auth/user/get/profile").subscribe(res=>{
      if(res.profilePic!=null){
        this.profilePicName = "assets/images/user/profile/"+res.profilePic;
      }
    });
    this.profileForm = this.fb.group({
      username : ['',[Validators.required,Validators.pattern("^[a-zA-Z][a-zA-Z0-9_]{1,20}$")]],
      email : ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]],
      mobile : ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]],
      name : ['',[Validators.required,Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]]
    });
    this.profileForm.controls['username'].setValue(this.userName);
    this.profileForm.controls['name'].setValue(atob(String(sessionStorage.getItem("fullName"))));
    this.profileForm.controls['mobile'].setValue(this.mobile);
    this.profileForm.controls['email'].setValue(atob(String(sessionStorage.getItem("email"))));
    this.imageForm = this.fb.group({
      profile:['',Validators.required]
    });

  }

  profileFormSubmit(){
    this.Submitted = true;
    
   
    if(this.profileForm.valid){
      var formdata =  new FormData();
      formdata.append("email",this.email);
      formdata.append("username",this.userName);
      formdata.append("id",this.id);
      formdata.append("profile",this.profile);
      this.api.uploadProfile("/rest/auth/user/update/profile",formdata).subscribe(res=>{
        console.log(res);
        Swal.fire(res.msg);
      });
     
    }
    if(this.profileForm.invalid){
      alert("invalid");
    }
  }
  get s() { return this.profileForm.controls; }
  imageSubmit(){
    
  }
  readURL(event: any): void {
    if(this.profilePicName!=''){
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        this.profile = file;
        const reader = new FileReader();
        reader.onload = e => this.p2 = reader.result;
        reader.readAsDataURL(file);
    }
    }else{
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        this.profile = file;
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
    }
    }
    
}


}

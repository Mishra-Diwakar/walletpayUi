import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-package',
  templateUrl: './assign-package.component.html',
  styleUrls: ['./assign-package.component.css']
})
export class AssignPackageComponent implements OnInit {
  assignForm!: FormGroup;
  userType: any;
  showSpinner = false;
  isSelected = false;
  masterSelected = false;
  userList: any[] = [];
  checkedList: any;
  newUserList: any[] = [];
  requestMap:any[]=[];
  allChecked = false;
  packageName='';
  userId:number=0;
  isLoggedIn=false;
  userTypeId:number=0;
  searchText='';
  isLoggin='';
  isApiUser='';
  assignedUser:any[]=[];
  id='';
  constructor(private location:Location, private fb:FormBuilder, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    if(this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null"){
      this.router.navigate(['/login']);
      return;
    }
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    this.id = atob(String(sessionStorage.getItem("userId")));
    if(this.isApiUser=="1"){
      this.router.navigate(['/page-not-found']);
      return;
    }
    this.packageName = String(sessionStorage.getItem("packageName"));
    this.assignForm = this.fb.group({
      
    });
    var userRequest = {
      packageName : this.packageName
    }
    this.api.postRequestResponseData("/rest/auth/user/get/assignedUser",userRequest).subscribe(res=>{
      this.assignedUser = res;
    });
      this.api.getRequest("/rest/auth/user/user-list").subscribe(res=>{
        if(res){
          this.userList=res;
        }
        this.setUserList(this.userList);
      }); 
  }

  setUserList(list: any[]) {
    for (let i = 0; i < list.length; i++) {
      var obj = {
        user: list[i],
        isSelected: false
      }
      this.newUserList.push(obj);
    }
    console.log(this.newUserList);
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    this.allChecked = !this.allChecked;
    for (let i = 0; i < this.newUserList.length; i++) {
      this.newUserList[i].isSelected = this.allChecked;
    }
  }

  // Check All Checkbox Checked
  isAllSelected(data:any) {
    console.log(data);
    this.allChecked = false;
    // data.isSelected = false;
    data.isSelected = !data.isSelected;
  
  }


  assignProject() {
    this.requestMap.length=0;
    let obj;
    for(let i=0;i<this.newUserList.length;i++){
     console.log(this.newUserList[i]);
      if(this.newUserList[i].isSelected){
        // console.log(this.newUserList[i]);
        obj = { 
          userId : this.newUserList[i].user.id,
          packageName: this.packageName,
        }
        this.requestMap.push(obj);
      }
    }
    //send data to assign projet with below details
    console.log(this.requestMap);
    // if(this.assignForm.value.userType=="default"){
    //   Swal.fire("Select user type");
    //   return;
    // }
    if(this.requestMap.length==0){
      Swal.fire("Which user you want to assign");
      return;
    }
    this.showSpinner = true;

    this.api.postRequestResponseData("/rest/auth/user/assign-package/",this.requestMap).subscribe(res=>{
      console.log(res);
      this.showSpinner = false;
      Swal.fire(res.msg);
    });
  }

  back(){
    this.location.back();
  }
}

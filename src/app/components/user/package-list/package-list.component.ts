import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {
packageList :any[]=[];
isLoggin='';
isApiUser=''
  constructor(private api:ApiService, private router:Router, private location:Location) { }

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
    this.api.getRequest("/rest/auth/user/packages").subscribe(res=>{
      console.log(res)
      if(res){
        this.packageList = res;
      }
    });
  }
  assignPackage(packageName:string){
    sessionStorage.setItem("packageName",packageName);
    this.router.navigate(['/assign-package']);
  }
  editPackage(packageName:string){
    sessionStorage.setItem("packageName",packageName);
    this.router.navigate(['/edit-package']);
  }

  back(){
    this.location.back();
  }
}

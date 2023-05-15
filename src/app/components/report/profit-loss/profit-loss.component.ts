import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.css']
})
export class ProfitLossComponent implements OnInit {
  profitForm !: FormGroup;
  isLoggin = '';
  users : any[]=[];
  Submitted=false;
  searchSpinner=false;
  isApiUser='';
  constructor(private location: Location, private fb: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    console.log(this.isLoggin);
    if (this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null") {
      this.router.navigate(['/login']);
      return;
    }
    if(this.isApiUser=="1"){
      this.router.navigate(['/page-not-found']);
      return;
    }
    this.api.getRequest("/rest/auth/user/all/active").subscribe(res=>{
      this.users = res;
      console.log(this.users)
    });
    this.profitForm = this.fb.group({
      username : ['default',Validators.required],
      dateFrom : ['',Validators.required],
      dateTo : ['',Validators.required]
    });
  }

  get s(){ return this.profitForm.controls; }

  back() {
    this.location.back();
  }
  profitSubmit() {
    this.Submitted = true;
    if(this.profitForm.value.username=="default"){
      this.profitForm.controls['username'].setErrors({'required':true});
      return;
    }
    if(this.profitForm.valid){
      this.searchSpinner = true;
      var userRequest = {
        username : this.profitForm.value.username,
        dateFrom : this.profitForm.value.dateFrom,
        dateTo : this.profitForm.value.dateTo
      }
      // call api from here
      this.searchSpinner = false;
    }
    if(this.profitForm.invalid){
      this.searchSpinner=false;
      alert("invalid form")
    }
  }


}

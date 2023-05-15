import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit {
  createSpinner = false;
  isLoggin = '';
  isApiUser = '';
  banks: any[] = [];
  constructor(private location: Location, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.isLoggin = String(sessionStorage.getItem("isLoggin"));
    this.isApiUser = atob(String(sessionStorage.getItem("isApiUser")));
    console.log(this.isLoggin);
    if (this.isLoggin == undefined || this.isLoggin == '' || this.isLoggin == "null") {
      this.router.navigate(['/login']);
      return;
    }
    // if (this.isApiUser == "1") {
    //   this.router.navigate(['/page-not-found']);
    //   return;
    // }

    this.getBanks();

  }
  getBanks() {
    this.api.getRequest("/rest/auth/user/banks").subscribe(res => {
      if (res) {
        this.banks = res;
      }
    });
  }
  editBank(id: number) {
    sessionStorage.setItem("bankId", btoa(String(id)));
  }
  deleteBank(bankid: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You will not get it back!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        var userRequest = {
          id: bankid
        }
        this.api.postRequestResponseData("/rest/auth/user/deleteBank", userRequest).subscribe(res => {
          if (res) {
            Swal.fire(res.msg);
            if (res.isError == false) {
              this.getBanks();
            }
          }
        });
      }
    })
  }
  backClicked() {
    this.location.back();
  }

}

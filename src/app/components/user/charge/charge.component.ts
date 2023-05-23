import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit {

  Submitted=false;
  isLoggin='';
  isApiUser='';
  utr:any;
  chargeSpinner=false;
  headerForm!:FormGroup;
  constructor(private location:Location, private api:ApiService, private router:Router, private fb:FormBuilder) { }

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
  }
  backClicked(){
    this.location.back();
  }
  submitCharge(){
    this.chargeSpinner = true;
    if(this.utr==undefined || this.utr == '' || this.utr == null){
      Swal.fire("please fill the UTR");
      this.chargeSpinner = false;
      return;
    } 
    var chargebackRequest = {
      utr : this.utr
    }
    this.api.postRequestResponseData("/rest/auth/transaction/chargeback",chargebackRequest).subscribe(res=>{
      Swal.fire(res.msg);
      this.chargeSpinner = false;
    }); 
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LedgerService {

  constructor(private http:HttpClient) { }
  //get leder records by id
  getLedger(apiSuffix:string ,data:any){
    return this.http.post<any>(environment.API_SERVER+apiSuffix,data);
  }

  //getting dmt record by id and operator(DMT)
  getDmtRecords(apiSuffix:string,user:any){
    return this.http.post<any>(environment.API_SERVER+apiSuffix,user);
  }

  //getting aeps record by id and operator(AEPS)
  getAepsRecord(apiSuffix:string,user:any){
    return this.http.post<any>(environment.API_SERVER+apiSuffix, user);
  }

  //getting recharge record by id and operator(RECHARGE)
  getRechargeRecord(apiSuffix:string,user:any){
    return this.http.post<any>(environment.API_SERVER+apiSuffix,user);
  }

  //getting bbps record by id and operator(BBPS)
  getBbpsRecord(apiSuffix:string,user:any){
    return this.http.post<any>(environment.API_SERVER+apiSuffix,user);
  }

  //getting credit fund record
  getCreditFundRecord(apiSuffix:string, user:any){
    return this.http.post<any>(environment.API_SERVER+apiSuffix,user);
  }

  //getting all pending request for admin

  getPendingRequest(apiSuffix:string, data:any){
    return this.http.post<any>(environment.API_SERVER+apiSuffix,data);
  }
}

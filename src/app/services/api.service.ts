import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators'
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators'  //just for testing of postUser()method

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }
  userData:any=[];
  auth_token = sessionStorage.getItem("token");
  responseSuccessMessage = new Array();
  responseErrorMessage = new Array();
  skuIdd = new Subject<any>();
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token}`
  });
  options = { headers: this.headers };

  /** Service method for POST requests */
  postRequest(apiSuffix: String, requestBody: any) {

    return this.httpClient.post<any>(environment.API_SERVER + apiSuffix, requestBody, this.options).pipe(
      catchError(this.handleError)
    ).subscribe(
      (data) => {
        for (let entry of data.messages) {
          this.responseSuccessMessage.push(entry);
        }
        this.alertResponse(this.responseSuccessMessage.join("\n").trim());
      },
      (errorResponse) => {
        for (let entry of errorResponse.error.errors) {
          this.responseErrorMessage.push(entry);
        }
        this.alertResponse(this.responseErrorMessage.join("\n").trim());
      });
  }

  /** Service method for POST requests with response data */
  postRequestResponseData(apiSuffix: String, requestBody: any) {

    return this.httpClient.post<any>(environment.API_SERVER + apiSuffix, requestBody, this.options);
  }

  postRequestResponseDataLogin(apiSuffix: String, requestBody: any) {

    return this.httpClient.post<any>(environment.API_SERVER + apiSuffix, requestBody, {});
  }

  /** Method to display alert box */
  alertResponse(message: string) {
    alert(message);
  }

  /** Method to display HttpStatus code in browser console */
  handleError(error: HttpErrorResponse) {
    console.log("Http Status: " + error.status);
    return throwError(error);
  }

  /** Service method for GET requests */
  getRequest(apiSuffix: String) {
    return this.httpClient.get<any>(environment.API_SERVER + apiSuffix, this.options);
  }
  getRequestUser(apiSuffix: String,data:any) {
    return this.httpClient.post<any>(environment.API_SERVER + apiSuffix,data,this.options);
  }

  /** Service method for PUT requests */
  putRequest(apiSuffix: String, requestBody: any) {
    return this.httpClient.put<any>(environment.API_SERVER + apiSuffix, requestBody, this.options);
  }

  /** Service method for DELETE requests */
  deleteRequest(apiSuffix: String) {
    return this.httpClient.delete<any>(environment.API_SERVER + apiSuffix, this.options);
  }

  /** Service method for POST requests with headers with response data */
  postRequestResponseDataWithHeaders(apiSuffix: String, requestBody: any, header: HttpHeaders) {
    const opt = { header, responseType: 'blob' as 'json' };
    return this.httpClient.post<any>(environment.API_SERVER + apiSuffix, requestBody, opt);
  }

  uploadChecklistPhoto(queId: number, file: any) {
    let url = environment.API_SERVER + '/bulk/checklist/upload/' + queId;
    const formdata: FormData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formdata.append('files', file[i])
    }
    //formdata.append('files', file);
    return this.httpClient.post<any>(url, formdata);
  }

  uploadProfile(path:String,data:any){
   return this.httpClient.post<any>(environment.API_SERVER+path,data);
  }

  getLocation(){
   return this.httpClient.get("https://ipgeolocation.abstractapi.com/v1/?api_key=680faf216949415fbbf7ccace1f523d5"); 
   }
  
  //  downloadFile(path: String, data:any): Observable<Blob>  {
  //   return this.httpClient.post<blob>(environment.API_SERVER + path, data,this.options);
  // }
  downloadFile(path: String, data:any): Observable<Blob>  {
    return this.httpClient.post(environment.API_SERVER + path, data,{
      responseType: 'blob',
    });
  }
  
};

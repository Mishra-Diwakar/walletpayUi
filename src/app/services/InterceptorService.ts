import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  tk :string='';
  constructor(private router: Router, private loginService: LoginService) {
  }
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem("token");
    this.tk = String(token);
    if(this.tk!='null' && this.tk!=null && this.tk !='' && this.tk !=undefined){
      const payload = atob(this.tk.split('.')[1]);
      const parsePayload = JSON.parse(payload);
      if(!(parsePayload.exp > Date.now() /1000)){
        this.loginService.logOut();
        this.router.navigate(['/login']);
      }
    }
  
    if (token) {
      request = request.clone({ setHeaders: { Authorization: "Bearer " + token } });
    }
    return next.handle(request);

  }
}

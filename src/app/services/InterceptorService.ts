import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {
 constructor(private router: Router,private loginService:LoginService){
 }

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let token = sessionStorage.getItem("token");
      if (token) {
        request = request.clone({setHeaders:{Authorization: "Bearer " + token}});
      }
      return next.handle(request);
      
        }
}
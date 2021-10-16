import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url !== 'http://localhost:4200/login'){
      const token = localStorage.getItem('token')
      request = request.clone({
        setHeaders: {Authorization: 'Bearer '+ token }
      })
      console.log(request);
      
    }
    return next.handle(request);
  }
}

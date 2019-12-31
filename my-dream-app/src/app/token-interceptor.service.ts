import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  /*I'm injecting a singleton into the TokenInterceptorService, which is not a singleton, according to its configuration in the app.module.ts file, which states it's multi.*/
  constructor(private injector: Injector) { }

  /*This method intercepts http requests, transforms them into something else before sending them to the server.  In this case, it's just changing the Authorization header.*/
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}` /*It seems that Bearer has to be Bearer in this case, followed by the token value.*/
      }
    });
    return next.handle(tokenizedReq);
  }
}

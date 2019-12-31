import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private registerUrl = "http://localhost:3000/api/register";
private loginUrl = "http://localhost:3000/api/login";

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token'); //The !! transforms the return statement into a boolean value.  It's a trick instead of using if.
  }

  logoutUser () {
    localStorage.removeItem('token');
    this.router.navigate(["/login"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }
}

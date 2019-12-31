import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerUserData = {};
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this.auth.registerUser(this.registerUserData).subscribe(
      res => {
        this.router.navigate(['/login']);
        console.log(res);
      },
      error => console.error(error));
  }
}

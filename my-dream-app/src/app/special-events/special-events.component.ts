import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = [];
  constructor(private es: EventService, private router: Router) { }

  ngOnInit() {
    this.es.getSpecialEvents().subscribe(
      data => this.specialEvents = data,
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401) {
            localStorage.removeItem("token");
            this.router.navigate(["/login"]);
          }
        }
        console.log(error)
      });

  }

}

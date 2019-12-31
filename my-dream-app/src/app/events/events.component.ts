import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events = [];
  constructor(private es: EventService) { }

  ngOnInit() {
    this.es.getEvents().subscribe(
      data => this.events = data,
      error => console.log(error));

  }


}

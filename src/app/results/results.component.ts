import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ContestantService } from '../contestant.service';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  currentAttendee: Attendee;
  attendees: any;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private contestantService: ContestantService
  ) { }

  ngOnInit(): void {
  }

  getContestants$() {
    return this.httpService.getAttendees();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http-service.service';

@Component({
    selector: 'app-landing',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss']
})

export class VotingComponent implements OnInit {

  contestants: Contestant[]
  currentAttendee: Attendee

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    let currentAttendeeId: string
    this.route.queryParams.subscribe(params => {
      currentAttendeeId = params['currentAttendeeId'];
    });
    this.currentAttendee = this.httpService.getContestant(currentAttendeeId)
    this.contestants = this.httpService.getContestants(this.currentAttendee.karaokeId, this.currentAttendee.id)
  }

}

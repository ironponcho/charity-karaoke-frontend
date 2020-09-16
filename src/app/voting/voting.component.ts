import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http-service.service';

@Component({
    selector: 'app-landing',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss']
})

export class VotingComponent implements OnInit {

  contestants: Attendee[]

  currentAttendee: Attendee

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    let currentAttendeeId: string;
    this.route.queryParams.subscribe(params => {
      currentAttendeeId = params['currentAttendeeId'];
    });
    this.currentAttendee = this.httpService.getAttendee(currentAttendeeId);
    this.contestants = this.httpService.getAttendees(this.currentAttendee.karaokeId)
      .filter(attendee => attendee.song)
  }

  saveVote(forAttendeeId: string, percentage: number){

    if(this.currentAttendee.id == null){
      alert("Please log in to vote!")
      return
    }
    let vote: VoteOutbound = {
      fromAttendeeId: this.currentAttendee.id,
      forAttendeeId: forAttendeeId,
      percentage: percentage ? percentage : 0 
    }
    this.httpService.saveVote(vote)
  }

}

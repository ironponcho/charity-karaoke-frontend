import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  attendees: Attendee[]
  currentAttendee: Attendee

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    let currentAttendeeId: string;
    this.route.queryParams.subscribe(params => {
      currentAttendeeId = params['currentAttendeeId'];
    });
    this.currentAttendee = this.httpService.getAttendee(currentAttendeeId)

    this.attendees = this.httpService.getAttendees(this.currentAttendee.karaokeId).filter(attendee => attendee.receivedVotes.length > 0);
    this.attendees.forEach(attendee => attendee.averageVoteInPercentage = this.getAverage(attendee.receivedVotes))
    this.attendees.sort(function (a, b) {
      return b.averageVoteInPercentage - a.averageVoteInPercentage;
    })
      
  }

  getAverage(votes: Vote[]){
    let sum = 0
    votes.forEach(vote => sum += vote.percentage)
    return sum / votes.length
  }

}

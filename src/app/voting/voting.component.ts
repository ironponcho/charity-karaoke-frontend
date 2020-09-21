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

    this.contestants.forEach(contestant => contestant.voteFromCurrentAttendee = this.getVoteFromCurrentContestant(contestant.receivedVotes))  

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

  getVoteFromCurrentContestant(votes: Vote[]): number{

    let maybeVotes = votes.filter(vote => vote.fromAttendeeId == this.currentAttendee.id)
    if(maybeVotes.length!=1){
      return 0 
    } else {
      return maybeVotes[0].percentage
    }
  }

  isCurrentAttendee(attendeeId: string) {
    let isCurrentAttende = this.currentAttendee.id == attendeeId
    console.log(attendeeId + ": " +isCurrentAttende)
    return this.currentAttendee.id == attendeeId
  }
}

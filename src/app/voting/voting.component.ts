import { Component, OnInit } from '@angular/core';
import { ContestantService } from '../contestant.service';
import { HttpService } from '../http-service.service';
import { LoginStateService } from '../login-state-service.service';

@Component({
    selector: 'app-landing',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss']
})

export class VotingComponent implements OnInit {

  currentUser: User
  contestants

  constructor(
    private loginStateService: LoginStateService,
    private httpService: HttpService,
    private contestantService: ContestantService
  ) {}

  ngOnInit() {
    this.currentUser =  this.loginStateService.getCurrentUser()
    
    this.contestantService.getContestantsForCurrentKaraoke$().subscribe(
      res => this.contestants = res
    )

  }

  saveVote(forAttendeeId: string, percentage: number) {
    const vote: VoteOutbound = {
      fromAttendeeId: this.currentUser.id,
      forAttendeeId: forAttendeeId,
      percentage: percentage ? percentage : 0
    };
    this.httpService.saveVote(vote);
  }

  getVoteFromCurrentContestant(votes: Vote[]): number {

    const maybeVotes = votes.filter(vote => vote.fromAttendeeId == this.currentUser.id)
    if (maybeVotes.length != 1) {
      return 0;
    } else {
      return maybeVotes[0].percentage;
    }
  }

  isCurrentAttendee(attendeeId: string): Boolean {   
    return this.currentUser.id == attendeeId;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { ContestantService } from '../contestant.service';
import { HttpService } from '../http-service.service';
import { LoginStateService } from '../login-state-service.service';

@Component({
    selector: 'app-landing',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss']
})

export class VotingComponent implements OnInit {

  constructor(
    private loginStateService: LoginStateService,
    private httpService: HttpService,
    private contestantService: ContestantService
  ) {}

  ngOnInit() {
 }

  getContestants$():  Observable<Attendee[]> {
    return this.contestantService.getContestantsForCurrentKaraoke$();
  }

  saveVote(forAttendeeId: string, percentage: number) {

    this.loginStateService.getCurrentUser$().subscribe(currentUser => {
      const vote: VoteOutbound = {
        fromAttendeeId: currentUser.id,
        forAttendeeId: forAttendeeId,
        percentage: percentage ? percentage : 0
      };
      this.httpService.saveVote(vote);
    });
  }

  getVoteFromCurrentContestant(votes: Vote[]): number {

    let percentage: number;
    this.loginStateService.getCurrentUser$().pipe(first()).subscribe(currentUser => {
      const maybeVotes = votes.filter(vote => vote.fromAttendeeId == currentUser.id);
      if (maybeVotes.length != 1) {
        percentage = 0;
      } else {
        percentage = maybeVotes[0].percentage;
      }
    });
    return percentage;
  }

  isCurrentAttendee(attendeeId: string): Boolean {

    let isCurrentUser: boolean;

    this.loginStateService.getCurrentUser$().pipe(first()).subscribe(currentUser => {
      currentUser.id == attendeeId;
    });

    return isCurrentUser;
  }
}

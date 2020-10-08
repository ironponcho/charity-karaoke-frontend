import { Component, OnDestroy, OnInit } from "@angular/core";
import { ContestantService } from "../contestant.service";
import { ApiService } from "../api-service.service";
import { LoginStateService } from "../login-state-service.service";
import { ToastrService } from "ngx-toastr";
import { interval } from "rxjs/internal/observable/interval";

@Component({
  selector: "app-landing",
  templateUrl: "./voting.component.html",
  styleUrls: ["./voting.component.scss"],
})
export class VotingComponent implements OnDestroy {
  readonly intervalInMs = 5000;

  currentUser = this.loginStateService.getCurrentUser();
  contestants$ = this.contestantService.getContestantsForCurrentKaraoke$();

  reloadSubscription = interval(this.intervalInMs).subscribe(() => {
    this.contestants$ = this.contestantService.getContestantsForCurrentKaraoke$();
  });

  constructor(
    private loginStateService: LoginStateService,
    private httpService: ApiService,
    private contestantService: ContestantService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.reloadSubscription.unsubscribe;
  }

  saveVote(forAttende: Attendee, percentage: number) {
    const vote: VoteOutbound = {
      fromAttendeeId: this.currentUser.id,
      forAttendeeId: forAttende.id,
      percentage: percentage ? percentage : 0,
    };
    this.httpService.saveVote(this.currentUser.karaokeId, vote).subscribe(
      (data) => {
        this.toastr.success(
          forAttende.name + " erhält von dir " + percentage + " Punkte!"
        );
      },
      (err) => {
        this.toastr.error("Fehler beim Speichern deiner Stimme");
      }
    );
  }

  getVoteFromCurrentContestant(votes: Vote[]): number {
    const maybeVotes = votes.filter(
      (vote) => vote.fromAttendeeId == this.currentUser.id
    );
    if (maybeVotes.length != 1) {
      return 0;
    } else {
      return maybeVotes[0].percentage;
    }
  }

  identify(index, item: Attendee) {
    return item.id;
  }

  isCurrentAttendee(attendeeId: string): Boolean {
    return this.currentUser.id == attendeeId;
  }
}

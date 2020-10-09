import { Component, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "../api-service.service";
import { LoginStateService } from "../login-state-service.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-landing",
  templateUrl: "./voting.component.html",
  styleUrls: ["./voting.component.scss"],
})
export class VotingComponent implements OnDestroy {

  currentUser = this.loginStateService.getCurrentUser()
  contestants$ = this.api.getAttendees$()

  constructor(
    private loginStateService: LoginStateService,
    private api: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.api.closeWebsocketConnection()
  }

  saveVote(forAttende: Attendee, percentage: number) {
    if (percentage == 0) {
      this.toastr.error("Fehler beim Speichern deiner Stimme.");
      return;
    }
    this.api.saveVote$(this.currentUser.karaokeId, {
      forAttendeeId: forAttende.id,
      percentage: percentage ? percentage : 0,
    }).subscribe(
      (data) => {
        this.toastr.success(
          forAttende.name + " erhält von dir " + percentage + " Punkte!"
        );
      },
      (err) => {
        console.log(err);
        this.toastr.error("Fehler beim Speichern deiner Stimme");
      }
    )
  }

  getVoteFromCurrentContestant(votes: Vote[]): number {
    const maybeVotes = votes.filter(
      (vote) => vote.forAttendeeId == this.currentUser.id
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

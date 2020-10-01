import { OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiService } from "./api-service.service";
import { LoginStateService } from "./login-state-service.service";

@Injectable({
  providedIn: "root",
})
export class ContestantService implements OnInit {
  currentUser: User;

  constructor(
    private loginStateService: LoginStateService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.setCurrentUserIfNeeded();
  }

  getContestantsForCurrentKaraoke$(): Observable<Attendee[]> {
    this.setCurrentUserIfNeeded();

    let contestants: Observable<Attendee[]>;

    this.api.getAttendees(this.currentUser.karaokeId).subscribe((attendees) => {
      attendees.forEach((attendee) => {
        attendee.averageVote =
          attendee.receivedVotes.length === 0
            ? 0
            : attendee.receivedVotes
                .map((vote) => vote.percentage)
                .reduce((a, b) => a + b, 0) / attendee.receivedVotes.length;
      });
      contestants = of(attendees.filter((attendee) => attendee.song));
    });

    return contestants;
  }

  setCurrentUserIfNeeded() {
    if (this.currentUser == null || typeof this.currentUser === undefined) {
      this.currentUser = this.loginStateService.getCurrentUser();
    }
  }
}

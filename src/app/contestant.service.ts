import { OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpService } from "./http-service.service";
import { LoginStateService } from "./login-state-service.service";

@Injectable({
  providedIn: "root",
})
export class ContestantService implements OnInit {
  currentUser: User;

  constructor(
    private loginStateService: LoginStateService,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.setCurrentUserIfNeeded();
  }

  getContestantsForCurrentKaraoke$(): Observable<Attendee[]> {
    this.setCurrentUserIfNeeded();

    let contestants: Observable<Attendee[]>;

    this.httpService
      .getAttendees(this.currentUser.karaokeId)
      .subscribe((attendees) => {
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

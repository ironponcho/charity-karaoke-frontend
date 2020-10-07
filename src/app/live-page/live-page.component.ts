import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { ApiService } from "../api-service.service";
import { LoginStateService } from "../login-state-service.service";

@Component({
  selector: "app-live-page",
  templateUrl: "./live-page.component.html",
  styleUrls: ["./live-page.component.css"],
})
export class LivePageComponent {
  attendees$ = this.api
    .getAttendees(this.loginState.getCurrentUser().karaokeId)
    .pipe(shareReplay(1));

  currentlyPerformingAttendees$ = this.attendees$.pipe(
    map(
      (attendees: Attendee[]) =>
        attendees.filter((a) => a.song != null && a.isCurrentlyPerforming)[0]
    )
  );

  nextAttendee$ = this.attendees$.pipe(
    map((attendees) => {
      for (let i = 0; i < attendees.length; i++) {
        if (attendees[i].isCurrentlyPerforming) {
          if (i == attendees.length - 1) {
            return null;
          } else {
            return attendees[i + 1];
          }
        }
      }
    })
  );

  videoId$ = this.currentlyPerformingAttendees$.pipe(
    map((attendee) => this.getTrackId(attendee.song!.youtubeKaraokeLink))
  );

  constructor(private api: ApiService, private loginState: LoginStateService) {}

  getTrackId(youtubeKaraokeLink: string) {
    return youtubeKaraokeLink.replace("https://youtu.be/", "");
  }

  goToNextSinger() {}

  goToPreviousSinger() {}
}

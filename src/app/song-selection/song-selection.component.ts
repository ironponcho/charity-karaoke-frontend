import { Component, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "../api-service.service";
import { Router } from "@angular/router";
import { LoginStateService } from "../login-state-service.service";
import { ToastrService } from "ngx-toastr";
import { map, shareReplay, tap } from "rxjs/operators";
import { combineLatest, of, Subject } from "rxjs";
import { fromHttpResponse } from "../util/fromHttpResponse";

@Component({
  selector: "app-song-selection",
  templateUrl: "./song-selection.component.html",
  styleUrls: ["./song-selection.component.scss"],
})
export class SongSelectionComponent {
  readonly youtubeSharePrefix = "https://youtu.be/";
  readonly youtubeCopyPrefix = "https://www.youtube.com/watch?v=";

  songFormModel: Song = {
    originalArtist: "",
    name: "",
    youtubeKaraokeLink: "",
  };

  readonly triggerSave$ = new Subject<any>()

  readonly saveRequest$ = combineLatest([
    this.triggerSave$, 
    this.loginStateService.getCurrentUser$()
  ]).pipe(
    fromHttpResponse(()=> this.httpService.saveSong$(this.songFormModel, this.loginStateService.getCurrentUser().karaokeId))
  )

  readonly saveLoading$ = this.saveRequest$.pipe(
    map((response) => response.loading)
  )

  readonly saveSuccess$ = this.saveRequest$.pipe(
    map((response) => response.data),
    tap((data) => {
      console.error(data)
      this.toastrService.success(this.songFormModel.name + " wurde eingetragen!");
      this.router.navigate(["/voting"]);
    })
  )

  readonly saveError$ = this.saveRequest$.pipe(
    map((response) => response.error),
    tap((error) => this.toastrService.error(error.toString()))
  )

  readonly getCurrentAttendeeRequest$ = this.loginStateService.getCurrentUser$().pipe(
    fromHttpResponse((user) => this.httpService.getAttendee$(user.id))
  )
  
  readonly getCurrentAttendeeRequestLoading$ = this.getCurrentAttendeeRequest$.pipe(
    map((response) => response.loading)
  )

  readonly getCurrentAttendeeRequestError$ = this.getCurrentAttendeeRequest$.pipe(
    map((response) => response.error), 
    tap((error) => this.toastrService.error("Dein Profil konnte nicht geladen werden."))
  )

  readonly getCurrentAttendeeRequestSuccess$ = this.getCurrentAttendeeRequest$.pipe(
    map((response) => response.data), 
    tap((attendee) => {
      this.toastrService.info("Trag hier deinen Song ein!")
      if(attendee.song){
        this.songFormModel.name = attendee.song.name
        this.songFormModel.originalArtist = attendee.song.originalArtist
        this.songFormModel.youtubeKaraokeLink = attendee.song.youtubeKaraokeLink
      }
    })
  )

  constructor(
    private httpService: ApiService,
    private loginStateService: LoginStateService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  isValidYoutubeLink(): boolean {
    return (
      this.songFormModel.youtubeKaraokeLink.includes(this.youtubeSharePrefix) ||
      this.songFormModel.youtubeKaraokeLink.includes(this.youtubeCopyPrefix)
    );
  }
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "../api-service.service";
import { LoginStateService } from "../login-state-service.service";
import { ToastrService } from "ngx-toastr";
import { combineLatest, interval, merge, Subject } from "rxjs";
import { fromHttpResponse } from "../util/fromHttpResponse";
import { filter, map, shareReplay, tap } from "rxjs/operators";
import { isDefined } from "@angular/compiler/src/util";
import { Vote } from "../domain/Vote";
import { Attendee } from "../domain/Attendee";
import { Song } from "../domain/Song";

@Component({
  selector: "app-landing",
  templateUrl: "./voting.component.html",
  styleUrls: ["./voting.component.scss"],
})
export class VotingComponent implements OnInit, OnDestroy {

  intervalLength = 1000
  readonly triggerReload$ = new Subject<any>()
  currentSong?: Song = null

  currentSongRequest$ = merge(
    interval(this.intervalLength),
    this.loginStateService.getCurrentUser$()
    ).pipe(
    fromHttpResponse(()=> this.api.getCurrentSong()), 
    shareReplay(1)
  )

  readonly currentSongLoading$ = this.currentSongRequest$.pipe(
    map((response) => response.loading)
  )

  readonly currentSongError$ = this.currentSongRequest$.pipe(
    map((response) => response.error),
    tap(error => this.toastr.error("Aktueller Song konnte nicht geladen werden"))
  )

  readonly currentSongDataSub = this.currentSongRequest$.pipe(
    map((response) => response.data),
    filter(isDefined),
    filter(song => {
      return this.currentSong == null || song.id != this.currentSong.id
    }),
    tap(song =>{
      this.toastr.info(`'${song.name}' wird nun performt!`)
    })
  ).subscribe(
    song => this.currentSong = song 
  )

  contestantsRequest$ = merge([
    this.triggerReload$, 
    this.loginStateService.getCurrentUser$()
  ]).pipe(
    fromHttpResponse(()=> this.api.getAttendees$()),
    shareReplay(1)
  )
 
  readonly contestantsLoading$ = this.contestantsRequest$.pipe(
    map((response) => response.loading)
  )

  readonly contestantsData$ = this.contestantsRequest$.pipe(
    map((response) => response.data),
    filter(isDefined)
  )

  readonly contestantsError$ = this.contestantsRequest$.pipe(
    map((response) => response.error),
    tap((error) => {
      this.toastr.error(JSON.stringify(error));
    })
  )

  constructor(
    private loginStateService: LoginStateService,
    private api: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // this.currentSongRequest$.subscribe()
  }

  ngOnDestroy(): void {
    this.currentSongDataSub.unsubscribe()
  }

  saveVote(receipient: Attendee, percentage: number) {
    if (percentage == 0) {
      this.toastr.error("Fehler beim Speichern deiner Stimme.");
      return;
    }

    let vote: Vote = {
      forSongId: receipient.song.id,
      percentage: percentage ? percentage : 0,
    }
    this.api.saveVote$(this.loginStateService.getCurrentUser().karaokeId, vote).subscribe(
      (data) => {
        this.toastr.success(
          receipient.name + " erhält von dir " + percentage + " Punkte!"
        );
      },
      (err) => {
        this.toastr.error("Fehler beim Speichern deiner Stimme");
      }
    )
  }

  identify(index, item: Attendee) {
    return item.id;
  }

  isCurrentAttendee(attendeeId: string): Boolean {
    return this.loginStateService.getCurrentUser().id == attendeeId;
  }
}

import { isDefined } from "@angular/compiler/src/util";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { interval, merge, Observable, Subject } from "rxjs";
import { filter, map, shareReplay, tap } from "rxjs/operators";
import { ApiService } from "../api-service.service";
import { Attendee } from "../domain/Attendee";
import { Song } from "../domain/Song";
import { LoginStateService } from "../login-state-service.service";
import { fromHttpResponse } from "../util/fromHttpResponse";

@Component({
  selector: "app-live-page",
  templateUrl: "./live-page.component.html",
  styleUrls: ["./live-page.component.scss"],
})
export class LivePageComponent implements OnDestroy{

  readonly triggerReloadCurrent$ = new Subject<any>()
  
  currentSongId?: string = null
  allAttendeesWithSong?: Attendee[] = []
  currentAttendee?: Attendee = null
  nextContestant?: Attendee = null
  prevContestant?: Attendee = null

  currentSongIdRequest$ = merge(
    this.triggerReloadCurrent$,
    this.loginStateService.getCurrentUser$()
    ).pipe(
    fromHttpResponse(()=> this.api.getCurrentSongId()), 
    shareReplay(1)
  )

  readonly currentSongIdLoading$ = this.currentSongIdRequest$.pipe(
    map((response) => response.loading)
  )

  readonly currentSongIdError$ = this.currentSongIdRequest$.pipe(
    map((response) => response.error),
    tap(error => this.toastrService.error("Aktueller Song konnte nicht geladen werden"))
  )

  readonly currentSongIdData$ = this.currentSongIdRequest$.pipe(
    map((response) => response.data),
    filter(isDefined),
  )   

  readonly currentSongIdDataSub = this.currentSongIdData$.pipe(
    filter(songId => {
      return this.currentSongId == null || songId != this.currentSongId
    }),
  ).subscribe(
    songId => {
      this.currentSongId = songId
      this.updatedAttendees()
    } 
  )

  contestantsRequest$ = merge([
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

  readonly contestantsDataSub = this.contestantsData$.subscribe(
    (data) => {
      this.allAttendeesWithSong = data
      this.updatedAttendees()
    }
  )

  constructor(private api: ApiService, 
    private loginStateService: LoginStateService, 
    private toastrService: ToastrService) {}

  ngOnDestroy(): void {
    this.contestantsDataSub.unsubscribe();
    this.currentSongIdDataSub.unsubscribe(); 
  }

  goToNextSinger() {
    this.api.selectNextSong(this.nextContestant.song.id).subscribe(
      (data) => {
        this.toastrService.info("Der nächste ist dran")
        this.triggerReloadCurrent$.next()
      }, 
      (error) => {
        this.toastrService.error(JSON.stringify(error))
      }
    )
  }

  goToPreviousSinger() {
    this.api.selectPreviousSong(
      this.prevContestant.song.id      
      ).subscribe(
      (data) => {
        this.toastrService.info("Der nächste ist dran")
        this.triggerReloadCurrent$.next()
      }, 
      (error) => {
        this.toastrService.error(JSON.stringify(error))
      }
    )
  }

  updatedAttendees() {

    if(this.allAttendeesWithSong.length>0 && this.currentSongId){
      this.currentAttendee = this.determineCurrentAttendee()
      this.prevContestant = this.determinePrevious()
      this.nextContestant = this.determineNext()
    }
  }

  determineCurrentAttendee(): Attendee | null {
     
    let songsForKaraoke = this.allAttendeesWithSong?.filter(
      attendees => {
        return attendees.song.id == this.currentSongId
      }
      )
    
    if(songsForKaraoke.length != 1){
      this.toastrService.error("Could not determine current player")
      return null
    }
    else {
      return songsForKaraoke[0]
    }
  }

  determineNext(): Attendee {

    for (let i = 0; i < this.allAttendeesWithSong.length; i++) {
        if (this.isCurrentAttendee(this.allAttendeesWithSong[i].id)) {
          if (i == this.allAttendeesWithSong.length - 1) {
            return null;
          } else {
            return this.allAttendeesWithSong[i + 1];
          }
        }
      }
  }

  determinePrevious(): Attendee {
    for (let i = 0; i < this.allAttendeesWithSong.length; i++) {
      if (this.isCurrentAttendee(this.allAttendeesWithSong[i].id)) {
        if (i==0) {
          return null;
        } else {
          return this.allAttendeesWithSong[i - 1];
        }
      }
    }
  }

  isCurrentAttendee(attendeeId: string) {
    return this.currentAttendee.id === attendeeId
  }
}

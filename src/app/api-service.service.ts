import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EMPTY, Observable, of, Subject } from "rxjs";
import { ApiPathProviderService } from "./api-path-provider.service";
import { OutboundMapperService } from "./outbound-mapper.service";
import { map, tap } from "rxjs/operators";
import { InboundMapperService, SongForVoting } from "./inbound-mapper.service";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { LoginStateService } from "./login-state-service.service";

@Injectable({
  providedIn: "root",
})
export class ApiService{
  
  constructor(
    private http: HttpClient,
    private pathProvider: ApiPathProviderService,
    private outboundMapperService: OutboundMapperService,
    private loginStateService: LoginStateService,
    private inboundMapperService: InboundMapperService,
  ) {}

  getAllKaraokeCompetitions() {
    return this.http.get<Karaoke[]>(this.pathProvider.getKaraokesPath());
  }

  getAttendee$(attendeeId: string): Observable<Attendee | null> {
    return this.getAttendees$()
    .pipe(
      map(attendees => {
        return attendees.filter(attendee => attendee.id == attendeeId)
      }),
      map((attendees: Attendee[]) => attendees.length == 1 ? attendees[0] : null)
    )  
  }

  getAttendees$(): Observable<Attendee[]> {
    let karaokeId = this.loginStateService.getCurrentUser().karaokeId
    return this.http
      .get<SongForVoting[]>(this.pathProvider.getSongsForKaraokeHttpPath(karaokeId))
      .pipe(
        tap(console.log),
        map((songs) =>
          songs.map(
            (song) =>
              this.inboundMapperService.mapVotingInbound(song, karaokeId),
            karaokeId
          )
        )
      );

    /* Websockets 
  
    let token = this.loginStateService.getCurrentUser().token
    return webSocket<SongForVoting[]>(this.pathProvider.getSongsForKaraoke(karaokeId, token)).asObservable().pipe(
        map((songs) =>
          songs.map(
            (songForVoting) =>
              this.inboundMapperService.mapVotingInbound(songForVoting, karaokeId),
            karaokeId
          )
        )
      )
      */
  }

  getResults$() {
    return this.getAttendees$()
  }

  closeWebsocketConnection() {
    let karaokeId = this.loginStateService.getCurrentUser().karaokeId
    let token = this.loginStateService.getCurrentUser().token
    webSocket({
        url: this.pathProvider.getSongsForKaraokeWebsocketPath(karaokeId, token),
        closeObserver: new Subject<CloseEvent>(),
        openObserver: {
          next: () => console.log('Underlying WebSocket connection open')
        }
      });
  }

  saveVote$(karaokeId: string, vote: Vote): Observable<string> {
    return this.http.post<string>(
      this.pathProvider.postVotingPath(),
      this.outboundMapperService.toVoteOutbound(vote, karaokeId)
    );
  }

  saveSong$(song: Song, karaokeId: string): Observable<string> {
    return this.http.post<string>(
      this.pathProvider.postSongPath(),
      this.outboundMapperService.toSongOutbound(song, karaokeId)
    );
  }

  login$(login: Login): Observable<User> {
    return this.http
      .post<UserInbound>(
        this.pathProvider.postLoginPath(login.karaokeId),
        this.outboundMapperService.toLoginOutbound(login)
      )
      .pipe(
        map((userInbound) => {
          return this.inboundMapperService.mapUser(
            userInbound,
            login.karaokeId
          );
        })
      );
  }

  register$(registration: Registration): Observable<User> {
    return this.http
      .post<UserInbound>(
        this.pathProvider.postRegistrationPath(registration.karaokeId),
        this.outboundMapperService.toRegistrationOutbound(registration)
      )
      .pipe(
        map((userInbound) => {
          return this.inboundMapperService.mapUser(
            userInbound,
            registration.karaokeId
          );
        })
      );
  }

  selectSinger(id: string) {
    return this.http.post<void>(
      this.pathProvider.postNextSingerPath(), 
      {id: id}
    )
  }
}

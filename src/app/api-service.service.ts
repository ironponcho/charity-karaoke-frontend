import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EMPTY, NEVER, Observable, of, Subject, throwError } from "rxjs";
import { ApiPathProviderService } from "./api-path-provider.service";
import { OutboundMapperService } from "./outbound-mapper.service";
import { map, shareReplay, tap } from "rxjs/operators";
import { CurrentSongInbound, InboundMapperService, SongForVoting } from "./inbound-mapper.service";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { LoginStateService } from "./login-state-service.service";
import { Vote } from "./domain/Vote";
import { Song } from "./domain/Song";
import { Attendee } from "./domain/Attendee";

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

  getAllKaraokeCompetitions$() {
    return this.http.get<Karaoke[]>(this.pathProvider.getKaraokesPath()).pipe(shareReplay(1));
  }

  createNewKaraoke(karaoke: { name: string; date: string; }) {
    return this.http.post<Karaoke>(this.pathProvider.postNewKaraokePath(), 
    this.outboundMapperService.toKaraokeCreationOutbound(karaoke))
  }

  startKaraoke(karaokeId: string) {
    return this.http.post<any>(this.pathProvider.postKaraokeStartPath(),
    this.outboundMapperService.toKaraokeStartOutbound(karaokeId)
    )
  }

  getCurrentSong(): Observable<Song | null> {
    let karaokeId = this.loginStateService.getCurrentUser().karaokeId
    
    return of({
      id: "35",
      isCurrentSong: true,
      originalArtist: "string",
      name: "Shine on you crazy Diamond",
      youtubeKaraokeLink: "youtube"
    })
    /*
    return this.http.get<CurrentSongInbound>
      (this.pathProvider.getCurrentSongPath(karaokeId))
    .pipe(
      map(songInbound => {
        return this.inboundMapperService.mapToSongInbound(songInbound)
      })
    )
    */
  }


  shuffleKaraoke(karaokeId: string) {
    return this.http.post<any>(this.pathProvider.postShuffleKaraokePath(),
    this.outboundMapperService.toKaraokeShuffleOutbound(karaokeId)
    )
  }

  getAttendee$(attendeeId: string): Observable<Attendee | null> {
    return this.getAttendees$()
    .pipe(
      map(attendees => {
        return attendees.filter(attendee => attendee.id == attendeeId)
      }),
      map((attendees) => {
        if(attendees.length == 1){
          return attendees[0]
        } else {
          throwError("ZERO OR MORE THAN ONE ATTENDEE WERE FOUND WITH ATTENDEE-ID "+attendeeId)
        }})
    )  
  }

  getAttendees$(): Observable<Attendee[]> {
    let karaokeId = this.loginStateService.getCurrentUser().karaokeId
    let result = this.http
      .get<SongForVoting[]>(this.pathProvider.getSongsForKaraokeHttpPath(karaokeId))
      .pipe(
        map((songs) =>
          songs.map(
            (song) =>
              this.inboundMapperService.mapVotingInbound(song, karaokeId),
            karaokeId
          )
        ),
        shareReplay(1)
      );
    return result
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
        this.pathProvider.postLoginPath(login.karaoke.id),
        this.outboundMapperService.toLoginOutbound(login)
      )
      .pipe(
        map((userInbound) => {
          return this.inboundMapperService.mapUser(
            userInbound,
            login.karaoke.id
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

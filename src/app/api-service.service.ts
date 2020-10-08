import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EMPTY, Observable, of } from "rxjs";
import { ApiPathProviderService } from "./api-path-provider.service";
import { OutboundMapperService } from "./outbound-mapper.service";
import { map } from "rxjs/operators";
import { InboundMapperService, SongForVoting } from "./inbound-mapper.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private pathProvider: ApiPathProviderService,
    private outboundMapperService: OutboundMapperService,
    private inboundMapperService: InboundMapperService
  ) {}

  getAllKaraokeCompetitions() {
    return this.http.get<Karaoke[]>(this.pathProvider.getKaraokesPath());
  }

  getAttendee(karaokeId: string, attendeeId: string) {
    let results: Attendee[];

    this.getAttendees(karaokeId).subscribe((attendees) => {
      results = attendees.filter((attendee) => attendee.id === attendeeId);
    });

    if (results.length != 1) {
      console.error(
        "No attende was found for karaokeID " +
          karaokeId +
          " and attendeeId " +
          attendeeId
      );
      return EMPTY;
    } else {
      return of(results[0]);
    }
  }

  getAttendees(karaokeId: string): Observable<Attendee[]> {
    return this.http
      .get<SongForVoting[]>(this.pathProvider.getSongsForKaraoke(karaokeId))
      .pipe(
        map((songs) =>
          songs.map(
            (song) =>
              this.inboundMapperService.mapVotingInbound(song, karaokeId),
            karaokeId
          )
        )
      );
  }

  saveVote(karaokeId: string, vote: Vote): Observable<string> {
    return this.http.post<string>(
      this.pathProvider.postVotingPath(),
      this.outboundMapperService.toVoteOutbound(vote, karaokeId)
    );
  }

  saveSong(song: Song, karaokeId: string): Observable<string> {
    return this.http.post<string>(
      this.pathProvider.postSongPath(),
      this.outboundMapperService.toSongOutbound(song, karaokeId)
    );
  }

  login(login: Login): Observable<User> {
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

  register(registration: Registration): Observable<User> {
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
    console.log(id + " is next");
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EMPTY, Observable, of } from "rxjs";
import { ApiPathProviderService } from "./api-path-provider.service";
import { OutboundMapperService } from "./outbound-mapper.service";
import { map } from "rxjs/operators";
import { InboundMapperService } from "./inbound-mapper.service";

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
    return of([
      {
        id: "1",
        name: "Matthias",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "Hubert Kah",
          name: "Sternenhimmel",
          youtubeKaraokeLink: "youtube.com/watch",
        },
        receivedVotes: [
          {
            fromAttendeeId: "1",
            percentage: 81,
          },
          {
            fromAttendeeId: "4",
            percentage: 61,
          },
        ],
      },
      {
        id: "2",
        name: "Jonas",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "Lighthouse Family",
          name: "High",
          youtubeKaraokeLink: "youtube.com/watch",
        },
        receivedVotes: [
          {
            fromAttendeeId: "1",
            percentage: 71,
          },
          {
            fromAttendeeId: "2",
            percentage: 81,
          },
          {
            fromAttendeeId: "4",
            percentage: 84,
          },
          {
            fromAttendeeId: "4",
            percentage: 99,
          },
        ],
      },
      {
        id: "3",
        name: "Nico",
        karaokeId: karaokeId,
        isCurrentlyPerforming: true,
        song: {
          originalArtist: "Celine Dion",
          name: "My heart will go on",
          youtubeKaraokeLink: "youtube.com/watch",
        },
        receivedVotes: [
          {
            fromAttendeeId: "1",
            percentage: 47,
          },
          {
            fromAttendeeId: "2",
            percentage: 55,
          },
          {
            fromAttendeeId: "3",
            percentage: 97,
          },
          {
            fromAttendeeId: "4",
            percentage: 100,
          },
          {
            fromAttendeeId: "4",
            percentage: 60,
          },
        ],
      },
      {
        id: "4",
        name: "Jessy",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "林憶蓮",
          name: "至少還有你",
          youtubeKaraokeLink: "youtube.com/watch",
        },
        receivedVotes: [
          {
            fromAttendeeId: "1",
            percentage: 100,
          },
          {
            fromAttendeeId: "2",
            percentageHttpClientModuleendeeId: "3",
            percentage: 97,
          },
          {
            fromAttendeeId: "4",
            percentage: 1,
          },
          {
            fromAttendeeId: "4",
            percentage: 60,
          },
        ],
      },
      {
        id: "5",
        name: "Leif",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "Wham",
          name: "Last Christmas",
          youtubeKaraokeLink: "youtube.com/watch",
        },
        receivedVotes: [],
      },
      {
        id: "6",
        name: "Danny",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "Ronan Keating",
          name: "Live is a roller coaster",
          youtubeKaraokeLink: "youtube.com/watch",
        },
        receivedVotes: [],
      },
      {
        id: "9",
        name: "Paula",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        receivedVotes: [],
      },
      {
        id: "7",
        name: "Mike",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "Hermes House Band",
          name: "Country Roads",
          youtubeKaraokeLink: "youtube.com/watch",
        },
        receivedVotes: [],
      },
      {
        id: "8",
        name: "Jonte",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "Robbie Williams",
          name: "Angels",
          youtubeKaraokeLink: "youtube.com/watch",
        },
        receivedVotes: [],
      },
      {
        id: "10",
        name: "Niklas",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "Roland kaiser",
          name: "Warum hast du nicht nein gesagt",
          youtubeKaraokeLink: "youtube.com/watch",
        },
        receivedVotes: [],
      },
    ]);
  }

  saveVote(karaokeId: string, vote: Vote): Observable<string> {
    if (vote.percentage === 100) {
      return of(vote.fromAttendeeId);
    } else {
      return this.http.post<string>(
        this.pathProvider.postVotingPath(karaokeId),
        this.outboundMapperService.toVoteOutbound(vote)
      );
    }
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
    return this.http.post<User>(
      this.pathProvider.postRegistrationPath(registration.karaokeId),
      this.outboundMapperService.toRegistrationOutbound(registration)
    );
  }
}

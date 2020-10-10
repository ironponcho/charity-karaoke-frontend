import { Injectable } from "@angular/core";
import { Attendee } from "./domain/Attendee";
import { Song } from "./domain/Song";

@Injectable({
  providedIn: "root",
})
export class InboundMapperService {

  constructor() {}

  mapUser(userInbound: UserInbound, karaokeId: string): User {
    return {
      name: userInbound.name,
      id: userInbound.id.toString(),
      karaokeId: karaokeId,
      isAdmin: userInbound.roles.includes("USER_ADMIN"),
      token: userInbound.tokenType + " " + userInbound.accessToken,
    };
  }

  mapVotingInbound(inbound: SongForVoting, karaokeId: string): Attendee {

    return {
      id: inbound.user.id,
      name: inbound.user.username,
      karaokeId: karaokeId,
      isCurrentlyPerforming: false,
      song: {
        id: inbound.id.toString(), 
        isCurrentSong: inbound.isCurrentSong,
        originalArtist: inbound.artist,
        name: inbound.title,
        youtubeKaraokeLink: inbound.link,
      },
      receivedVotes: [],
    };
  }

  mapToKaraokeInbound(inbound: KaraokeInbound): Karaoke {
    return {
      id: inbound.id.toString(),
      name: inbound.name,
      date: inbound.date
    };
  }

  mapToSongInbound(songInbound: CurrentSongInbound): Song {

    return {
      id: songInbound.id.toString(),
      isCurrentSong: songInbound.isCurrentSong,
      originalArtist: songInbound.artist,
      name: songInbound.title,
      youtubeKaraokeLink: songInbound.link
    }
  }

}

export interface SongForVoting {
  id: number,
  title: string;
  artist: string;
  isCurrentSong: boolean,
  link: string;
  sequence: number;
  user: UserVotingOverviewInbound;
  votes: any[]
}

export interface UserVotingOverviewInbound {
  id: string;
  username: string;
}

export interface KaraokeInbound {
  id: number;
  name: string;
  date: string;
}

export interface CurrentSongInbound {
  id: number;
  isCurrentSong: boolean;
  artist: string;
  title: string;
  link: string;
}
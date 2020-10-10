import { Injectable, ɵɵtextInterpolateV } from "@angular/core";
import { Attendee } from "./domain/Attendee";
import { Song } from "./domain/Song";
import { Vote } from "./domain/Vote";

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
      isAdmin: userInbound.roles.includes("ROLE_ADMIN"),
      token: userInbound.tokenType + " " + userInbound.accessToken,
    };
  }

  mapVotingInbound(inbound: SongForVoting, karaokeId: string): Attendee {

    let votes: Vote[] = inbound.votes.map(
      vote => ({
          forSongId: inbound.id.toString(),
          percentage: vote.percentage
      })
    )
    
    let average: number = this.calculateAverage(votes)

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
      receivedVotes: votes,
      averageVote: average
    };
  }

  calculateAverage(votes: Vote[]): number {
    if(votes.length == 0 ){
      return 0
    }

    let sum = 0
    votes.forEach(vote => sum += vote.percentage)
    return sum/votes.length

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
  votes: VoteInbound[]
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

export interface VoteInbound {
  id: number
  percentage: number
}
import { Injectable } from "@angular/core";

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
}

export interface SongForVoting {
  title: string;
  artist: string;
  link: string;
  sequence: number;
  user: UserVotingOverviewInbound;
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

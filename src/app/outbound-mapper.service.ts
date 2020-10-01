import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OutboundMapperService {
  constructor() {}

  toVoteOutbound(vote: Vote): VoteOutbound {
    return {
      fromAttendeeId: vote.fromAttendeeId,
      percentage: vote.percentage,
    };
  }

  toLoginOutbound(login: Login): LoginOutbound {
    return {
      username: login.username,
      password: login.password,
      karaokeId: login.karaokeId,
    };
  }

  toRegistrationOutbound(registration: Registration): RegistrationOutbound {
    return {
      username: registration.name,
      password: registration.password,
      karaokeId: registration.karaokeId,
    };
  }

  toSongOutbound(song: Song, karaokeId: string): SongOutbound {
    return {
      artist: song.originalArtist,
      title: song.name,
      link: song.youtubeKaraokeLink,
      karaokeId: +karaokeId,
    };
  }
}

interface VoteOutbound {
  fromAttendeeId: string;
  percentage: number;
}

interface LoginOutbound {
  username: string;
  password: string;
  karaokeId: string;
}

interface RegistrationOutbound {
  username: string;
  password: string;
  karaokeId: string;
}

interface SongOutbound {
  artist: string;
  title: string;
  link: string;
  karaokeId: number;
}

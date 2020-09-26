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
    };
  }

  toRegistrationOutbound(registration: Registration): RegistrationOutbound {
    return {
      username: registration.username,
      password: registration.password,
      karaokeId: registration.karaokeId,
    };
  }

  toSongOutbound(song: Song): SongOutbound {
    return {
      originalArtist: song.originalArtist,
      name: song.name,
      youtubeKaraokeLink: song.youtubeKaraokeLink,
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
}

interface RegistrationOutbound {
  username: string;
  password: string;
  karaokeId: string;
}

interface SongOutbound {
  originalArtist: string;
  name: string;
  youtubeKaraokeLink: string;
}

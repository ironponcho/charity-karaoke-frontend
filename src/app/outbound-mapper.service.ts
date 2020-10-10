import { Injectable } from "@angular/core";
import { Song } from "./domain/Song";
import { Vote } from "./domain/Vote";

@Injectable({
  providedIn: "root",
})
export class OutboundMapperService {
  
  constructor() {}

  toVoteOutbound(vote: Vote, karaokeId: string): VoteOutbound {
    return {
      karaokeId: +karaokeId,
      recipientId: +vote.forSongId,
      percentage: vote.percentage,
    };
  }

  toLoginOutbound(login: Login): LoginOutbound {
    return {
      username: login.username,
      password: login.password,
      karaokeId: login.karaoke.id,
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
  
  toKaraokeStartOutbound(karaokeId: string): KaraokeStartOutbound {
    return {
      karaokeId: +karaokeId, 
      songId: 1
    }
  }

  toKaraokeShuffleOutbound(karaokeId: string): KaraokeShuffleOutbound {
    return {
      karaokeId: +karaokeId, 
      songId: 1
    }
  }

  toKaraokeCreationOutbound(karaoke: { name: string; date: string; }) {
    return {
      name: karaoke.name, 
      date: karaoke.date
    }
  }
}

interface VoteOutbound {
  recipientId: number;
  percentage: number;
  karaokeId: number;
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

interface KaraokeStartOutbound {
  karaokeId: number,
  songId: number
}

interface KaraokeShuffleOutbound {
  karaokeId: number,
  songId: number
}

interface KaraokeCreationOutbound {
  name: string,
  date: string
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  getAllKaraokeCompetitions() : Karaoke[] {
    return [
      {
        name: "Charity-Karaoke II", 
        description: "Elevate-Studios Hamburg", 
        id: "123465", 
        date: new Date("2020-01-01")
      }
    ]
  }

  getContestant(attendeeId: string): Contestant {
    return {
      id: attendeeId,
      name: "Nico " + attendeeId,
      karaokeId: "12345",
      isCurrentlyPerforming: true,
      song: {
        originalArtist: "Celine Dion ", 
        name: "My heart will go on", 
        youtubeKaraokeLink: "https://www.youtube.com/watch?v=I2rReu-Wzak"
      }, 
      receivedVotes: []
    }
  }

  getContestants(karaokeId: string, attendeeId: string): Contestant[] {
    return [
      {
        id: "1234",
        name: "Matthias",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "Hubert Kah", 
          name: "Sternenhimmel", 
          youtubeKaraokeLink: "youtube.com/watch"
        }, 
        receivedVotes: []
      },
      {
        id: "1234",
        name: "Jonas",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "Lighthouse Family", 
          name: "High", 
          youtubeKaraokeLink: "youtube.com/watch"
        }, 
        receivedVotes: []
      },
      {
        id: "1234",
        name: "Nico",
        karaokeId: karaokeId,
        isCurrentlyPerforming: true,
        song: {
          originalArtist: "Celine Dion", 
          name: "My heart will go on", 
          youtubeKaraokeLink: "youtube.com/watch"
        }, 
        receivedVotes: []
      },
      {
        id: "1234",
        name: "Jessy",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "林憶蓮", 
          name: "至少還有你", 
          youtubeKaraokeLink: "youtube.com/watch"
        }, 
        receivedVotes: []
      },
      {
        id: "1234",
        name: "Leif",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "Wham", 
          name: "Last Christmas", 
          youtubeKaraokeLink: "youtube.com/watch"
        }, 
        receivedVotes: []
      },
      {
        id: "1234",
        name: "Danny",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "Live is a roller coaster", 
          name: "Ronan Keating", 
          youtubeKaraokeLink: "youtube.com/watch"
        }, 
        receivedVotes: []
      },
      {
        id: "1234",
        name: "Mike",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "Hermes House Band", 
          name: "Country Roads", 
          youtubeKaraokeLink: "youtube.com/watch"
        }, 
        receivedVotes: []
      },
      {
        id: "1234",
        name: "Jonte",
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "Robbie Williams", 
          name: "Angels", 
          youtubeKaraokeLink: "youtube.com/watch"
        }, 
        receivedVotes: []
      }
    ]
  }

  saveSong(songFormModel: Song) {
    alert("Going to save " + JSON.stringify(songFormModel))
  }

  constructor() { }
}

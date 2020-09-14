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

  getAttendee(attendeeId: string): Attendee {
    return {
      id: attendeeId,
      name: "Nico " + attendeeId,
      isCurrentlyPerforming: true,
      song: {
        originalArtist: "Celine Dion " +attendeeId, 
        name: "My heart will go on", 
        youtubeKaraokeLink: "https://www.youtube.com/watch?v=I2rReu-Wzak"
      }, 
      receivedVotes: []
    }
  }

  saveSong(songFormModel: Song) {
    alert("Going to save " + JSON.stringify(songFormModel))
  }

  constructor() { }
}

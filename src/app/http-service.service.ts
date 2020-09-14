import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  getAllKaraokeCompetitions(): Karaoke[] {
    return [
      {
        name: 'Charity-Karaoke II',
        description: 'Elevate-Studios Hamburg',
        id: '123465',
        date: new Date('2020-01-01')
      }
    ];
  }

  getContestant(attendeeId: string): Contestant {
    return {
      id: attendeeId,
      name: 'Nico ' + attendeeId,
      karaokeId: '12345',
      isCurrentlyPerforming: true,
      song: {
        originalArtist: 'Celine Dion ',
        name: 'My heart will go on',
        youtubeKaraokeLink: 'https://www.youtube.com/watch?v=I2rReu-Wzak'
      },
      receivedVotes: []
    };
  }

  getContestants(karaokeId: string, attendeeId: string): Contestant[] {
    return [
      {
        id: '1',
        name: 'Matthias',
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: 'Hubert Kah',
          name: 'Sternenhimmel',
          youtubeKaraokeLink: 'youtube.com/watch'
        },
        receivedVotes: [],
        voteFromCurrentAttendee: 71
      },
      {
        id: '2',
        name: 'Jonas',
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: 'Lighthouse Family',
          name: 'High',
          youtubeKaraokeLink: 'youtube.com/watch'
        },
        receivedVotes: [],
        voteFromCurrentAttendee: 47
      },
      {
        id: '3',
        name: 'Nico',
        karaokeId: karaokeId,
        isCurrentlyPerforming: true,
        song: {
          originalArtist: 'Celine Dion',
          name: 'My heart will go on',
          youtubeKaraokeLink: 'youtube.com/watch'
        },
        receivedVotes: [],
        voteFromCurrentAttendee: 57
      },
      {
        id: '4',
        name: 'Jessy',
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: '林憶蓮',
          name: '至少還有你',
          youtubeKaraokeLink: 'youtube.com/watch'
        },
        receivedVotes: [],
        voteFromCurrentAttendee: 75
      },
      {
        id: '5',
        name: 'Leif',
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: 'Wham',
          name: 'Last Christmas',
          youtubeKaraokeLink: 'youtube.com/watch'
        },
        receivedVotes: [],
        voteFromCurrentAttendee: 71
      },
      {
        id: '6',
        name: 'Danny',
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: 'Live is a roller coaster',
          name: 'Ronan Keating',
          youtubeKaraokeLink: 'youtube.com/watch'
        },
        receivedVotes: [],
        voteFromCurrentAttendee: 91
      },
      {
        id: '7',
        name: 'Mike',
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: 'Hermes House Band',
          name: 'Country Roads',
          youtubeKaraokeLink: 'youtube.com/watch'
        },
        receivedVotes: [],
        voteFromCurrentAttendee: 98
      },
      {
        id: '8',
        name: 'Jonte',
        karaokeId: karaokeId,
        isCurrentlyPerforming: false,
        song: {
          originalArtist: 'Robbie Williams',
          name: 'Angels',
          youtubeKaraokeLink: 'youtube.com/watch'
        },
        receivedVotes: [],
        voteFromCurrentAttendee: 99
      }
    ];
  }

  saveVote(vote: Vote) {
    alert('Going to save ' + JSON.stringify(vote));
  }

  saveSong(songFormModel: Song) {
    alert('Going to save ' + JSON.stringify(songFormModel));
  }

  constructor() { }
}

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

  getAttendee(attendeeId: string): Attendee {
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
      receivedVotes: [],
      isAdmin: true
    };
  }

  getAttendees(karaokeId: string): Attendee[] {
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
        receivedVotes: [
        {
          fromAttendeeId: "2",
          percentage: 81
        },
        {
          fromAttendeeId: "4",
          percentage: 61
        },
      ],
        isAdmin: false
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
        receivedVotes: [{
          fromAttendeeId: "1",
          percentage: 71
        },
        {
          fromAttendeeId: "2",
          percentage: 81
        },
        {
          fromAttendeeId: "4",
          percentage: 84
        },
        {
          fromAttendeeId: "4",
          percentage: 99
        },
      ],
        isAdmin: false
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
        receivedVotes: [{
          fromAttendeeId: "1",
          percentage: 47
        },
        {
          fromAttendeeId: "2",
          percentage: 55
        },
        {
          fromAttendeeId: "3",
          percentage: 97
        },
        {
          fromAttendeeId: "4",
          percentage: 100
        },
        {
          fromAttendeeId: "4",
          percentage: 60
        },
      ],
        isAdmin: false
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
        receivedVotes: [
          {
            fromAttendeeId: "1",
            percentage: 100
          },
          {
            fromAttendeeId: "2",
            percentage: 55
          },
          {
            fromAttendeeId: "3",
            percentage: 97
          },
          {
            fromAttendeeId: "4",
            percentage: 1
          },
          {
            fromAttendeeId: "4",
            percentage: 60
          },
        ],
        isAdmin: false
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
        isAdmin: false
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
        isAdmin: false
      },
      {
        id: '9',
        name: 'Paula',
        karaokeId: karaokeId,
        isAdmin: false,
        isCurrentlyPerforming: false,
        receivedVotes: []
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
        isAdmin: false
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
        isAdmin: false
      }
    ];
  }

  saveVote(vote: Vote) {
    alert('Going to save ' + JSON.stringify(vote));
  }

  saveSong(songFormModel: Song) {
    alert('Going to save ' + JSON.stringify(songFormModel));
  }

  login(login: Login) {
    alert('Post Login: ' +JSON.stringify(login))
  }

  register(registration: Registration) {
    alert('Post Registration: ' +JSON.stringify(registration))
  }

  constructor() { }
}

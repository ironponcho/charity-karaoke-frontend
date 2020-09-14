import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-landing',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss']
})

export class VotingComponent implements OnInit {
  focus: any;
  focus1: any;

  items : Attendee[] = [

    {
      id: "1234",
      name: "Matthias",
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
      isCurrentlyPerforming: false,
      song: {
        originalArtist: "Robbie Williams", 
        name: "Angels", 
        youtubeKaraokeLink: "youtube.com/watch"
      }, 
      receivedVotes: []
    }
    
    

  ]

  constructor() { }

  ngOnInit() {}

}

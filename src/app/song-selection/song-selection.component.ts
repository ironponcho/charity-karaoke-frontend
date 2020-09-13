import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-song-selection',
    templateUrl: './song-selection.component.html',
    styleUrls: ['./song-selection.component.scss']
})
export class SongSelectionComponent implements OnInit {

    constructor() { }

    currentAttendee: Attendee =  {
        id: "1234",
        name: "Jonas",
        isCurrentlyPerforming: false,
        song: {
          originalArtist: "Fleetwood Mac", 
          name: "Everyhwere", 
          youtubeKaraokeLink: "https://www.youtube.com/watch?v=I2rReu-Wzak"
        }, 
        receivedVotes: []
      }

    currentCompetition: Karaoke =  {
        name: "Charity Karaoke II", 
        description: "Coole Sache!", 
        id: "1234", 
        date: new Date("2020-09-13")
      }

    songFormModel = this.currentAttendee.song

    saveSong() {
        alert("Going to save " + JSON.stringify(this.songFormModel))
    }

    ngOnInit() {}

    submitted = false;

    onSubmit() { this.submitted = true; }
  
}

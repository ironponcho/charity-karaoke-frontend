import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-song-selection',
    templateUrl: './song-selection.component.html',
    styleUrls: ['./song-selection.component.scss']
})
export class SongSelectionComponent implements OnInit {

    constructor(
        private httpService: HttpService,
        private route:ActivatedRoute
    ) { }

    focusArtistName;
    focusSongTitle;
    focusYoutubeLink;
    currentAttendee: Attendee
    songFormModel: Song

    saveSong() {
        this.httpService.saveSong(this.songFormModel)
    }

    ngOnInit() {
        let currentAttendeeId: string
        this.route.queryParams.subscribe(params => {
            currentAttendeeId = params['currentAttendeeId'];
        });
        this.currentAttendee = this.httpService.getContestant(currentAttendeeId)
        this.songFormModel = this.currentAttendee.song
    }

    submitted = false;

    onSubmit() { this.submitted = true; }
  
}

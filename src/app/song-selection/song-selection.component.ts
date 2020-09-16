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
        private route: ActivatedRoute
    ) { }

    focusArtistName;
    focusSongTitle;
    focusYoutubeLink;
    currentAttendee: Attendee;
    songFormModel: Song;

    submitted = false;

    saveSong() {
        if(this.currentAttendee.id == null){
            alert("Please log in first!")
            return
        }
        this.httpService.saveSong(this.songFormModel);
    }

    ngOnInit() {
        let currentAttendeeId: string;
        this.route.queryParams.subscribe(params => {
            currentAttendeeId = params['currentAttendeeId'];
        });
        this.currentAttendee = this.httpService.getAttendee(currentAttendeeId);
        this.songFormModel = this.currentAttendee.song;
    }

    onSubmit() { this.submitted = true; }

}

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';
import { ActivatedRoute } from '@angular/router';
import { LoginStateService } from '../login-state-service.service';

@Component({
    selector: 'app-song-selection',
    templateUrl: './song-selection.component.html',
    styleUrls: ['./song-selection.component.scss']
})
export class SongSelectionComponent implements OnInit {

    constructor(
        private httpService: HttpService,
        private route: ActivatedRoute,
        private loginStateService: LoginStateService
    ) { }

    focusArtistName;
    focusSongTitle;
    focusYoutubeLink;
    songFormModel: Song = {
        originalArtist: '',
        name: '',
        youtubeKaraokeLink: '',
    };

    submitted = false;

    saveSong() {
        this.httpService.saveSong(this.songFormModel);
    }

    ngOnInit() {
        this.loginStateService.getCurrentUser$().subscribe(currentUser => {
            this.httpService.getAttendee(currentUser.id).subscribe(currentAttendee => {
                this.songFormModel = currentAttendee.song;
            });
        });
    }

    onSubmit() { this.submitted = true; }

}

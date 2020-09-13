import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-song-selection',
    templateUrl: './song-selection.component.html',
    styleUrls: ['./song-selection.component.scss']
})
export class SongSelectionComponent implements OnInit {

    constructor(
        private httpService: HttpServiceService,
        private route:ActivatedRoute
    ) { }

    currentAttendee: Attendee

    songFormModel: Song

    saveSong() {
        this.httpService.saveSong(this.songFormModel)
    }

    ngOnInit() {
        console.log(this.route.snapshot.paramMap.get('bank'))
        this.currentAttendee = this.httpService.getAttendee(this.route.snapshot.paramMap.get('bank'))
        this.songFormModel = this.currentAttendee.song
    }

    submitted = false;

    onSubmit() { this.submitted = true; }
  
}

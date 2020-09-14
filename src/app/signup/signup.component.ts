import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    focus;
    focus1;
    focus2;
    allKaraokeCompetitions: Karaoke[]

    constructor(
        private httpService: HttpService
    ) { }

    ngOnInit() {
        this.allKaraokeCompetitions = this.httpService.getAllKaraokeCompetitions()
    }
}

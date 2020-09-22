import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    nameFocus;
    passwordFocus;
    competitionSelectionFocus;
    allKaraokeCompetitions: Karaoke[];

    registrationModel: Registration;

    constructor(
        private httpService: HttpService
    ) { }

    ngOnInit() {
        this.allKaraokeCompetitions = this.httpService.getAllKaraokeCompetitions();
        this.registrationModel = {
            karaokeId : '00000000',
            username: '',
            password: ''
        };
    }

    register() {

        if (this.registrationModel.karaokeId == '00000000') {
            console.warn('HEADS UP! YOU ARE USING THE DEFAULT KARAOKE ID');
        }


        if (this.registrationModel.karaokeId && this.registrationModel.username && this.registrationModel.password) {
        this.httpService.register(this.registrationModel);
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api-service.service';
import { LoginStateService } from '../login-state-service.service';

@Component({
  selector: 'app-karaoke-administration',
  templateUrl: './karaoke-administration.component.html',
  styleUrls: ['./karaoke-administration.component.scss']
})
export class KaraokeAdministrationComponent {

  allKaraokeCompetitions$ = this.api.getAllKaraokeCompetitions$();
  selectedModifyKaraokeId?: string

  newKaraoke = {
    name: "Charity-Karaoke", 
    date: "2020-10-10T21:30:00+02:00"
  }

  constructor(
    private api: ApiService,
    private toastrService: ToastrService, 
    private router: Router, 
    private loginStateService: LoginStateService
  ) { }
  
  startKaraoke(){
    this.api.startKaraoke(this.selectedModifyKaraokeId).subscribe(
      (data) => this.handleKaraokeStartSuccess(data), 
      (error) => this.toastrService.error(error.message)
      )
  }

  handleKaraokeStartSuccess(data: any) {
    this.toastrService.success("Das Turnier wurde gestartet!")
    
    // Perform Impersonation. Change use State 
    let currentUser = this.loginStateService.getCurrentUser()
    currentUser.karaokeId = this.selectedModifyKaraokeId
    this.loginStateService.setCurrentUser(currentUser)
    this.router.navigate(['/voting'])

  }


  shuffleKaraoke(){
    this.api.shuffleKaraoke(this.selectedModifyKaraokeId)
  }

  createNewKaraoke(){
    this.api.createNewKaraoke(this.newKaraoke).subscribe(
      (karaoke) => this.handleCreateKaraokeSuccess(karaoke),
      (error) => this.toastrService.error(error.message)
    )
  }

  handleCreateKaraokeSuccess(karaoke: Karaoke) {
    this.toastrService.success("Created " + karaoke.name)
    this.allKaraokeCompetitions$ = this.api.getAllKaraokeCompetitions$();
  }

}

interface NewKaraoke{
  name: string, 
  date: string
}
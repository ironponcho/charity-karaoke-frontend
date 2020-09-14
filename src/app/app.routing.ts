import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SongSelectionComponent } from './song-selection/song-selection.component';
import { SignupComponent } from './signup/signup.component';
import { VotingComponent } from './voting/voting.component';
import { LoginComponent } from './login/login.component';

const routes: Routes =[
    { path: 'home', component: HomeComponent },
    { path: 'register', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'voting', component: VotingComponent },
    { path: 'song-selection', component: SongSelectionComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

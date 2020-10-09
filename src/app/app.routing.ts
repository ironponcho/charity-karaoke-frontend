import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { SongSelectionComponent } from "./song-selection/song-selection.component";
import { VotingComponent } from "./voting/voting.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./registration/signup.component";
import { ResultsComponent } from "./results/results.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LivePageComponent } from "./live-page/live-page.component";
import { KaraokeAdministrationComponent } from "./karaoke-administration/karaoke-administration.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "register", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "voting", component: VotingComponent },
  { path: "results", component: ResultsComponent },
  { path: "landing-page", component: LandingPageComponent },
  { path: "live-page", component: LivePageComponent },
  { path: "song-selection", component: SongSelectionComponent },
  { path: "karaoke-administration", component: KaraokeAdministrationComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";

import { AppComponent } from "./app.component";
import { SignupComponent } from "./registration/signup.component";
import { VotingComponent } from "./voting/voting.component";
import { SongSelectionComponent } from "./song-selection/song-selection.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSliderModule } from "@angular/material/slider";
import { MatDividerModule } from "@angular/material/divider";
import { CookieModule, CookieService } from "ngx-cookie";
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import { HomeModule } from "./home/home.module";
import { LoginComponent } from "./login/login.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FooterComponent } from "./common/footer/footer.component";
import { NavbarComponent } from "./common/navbar/navbar.component";
import { ResultsComponent } from "./results/results.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { SortByAverageVotePipe } from "./sort-by-average-vote.pipe";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LivePageComponent } from "./live-page/live-page.component";
import { AuthInterceptor } from "./auth.interceptor";
import { TrimmerPipe } from "./trimmer.pipe";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { KaraokeAdministrationComponent } from './karaoke-administration/karaoke-administration.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    VotingComponent,
    SongSelectionComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ResultsComponent,
    SortByAverageVotePipe,
    LandingPageComponent,
    LivePageComponent,
    TrimmerPipe,
    KaraokeAdministrationComponent,
  ],
  imports: [
    CookieModule.forRoot(),
    ToastrModule.forRoot(),
    CommonModule,
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    MatProgressBarModule,
    HomeModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatExpansionModule,
    YouTubePlayerModule,
    MatSliderModule,
    MatDividerModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { VotingComponent } from './voting/voting.component';
import { SongSelectionComponent } from './song-selection/song-selection.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatSliderModule } from '@angular/material/slider'; 

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalErrorHandler } from 'src/GlobalErrorHandler';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    VotingComponent,
    SongSelectionComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSliderModule
  ],
  providers: [
    {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

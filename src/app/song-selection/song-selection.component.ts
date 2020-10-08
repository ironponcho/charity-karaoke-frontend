import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api-service.service";
import { Router } from "@angular/router";
import { LoginStateService } from "../login-state-service.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-song-selection",
  templateUrl: "./song-selection.component.html",
  styleUrls: ["./song-selection.component.scss"],
})
export class SongSelectionComponent implements OnInit {
  readonly youtubeSharePrefix = "https://youtu.be/";
  readonly youtubeCopyPrefix = "https://www.youtube.com/watch?v=";
  currentUser: User;

  focusArtistName;
  focusSongTitle;
  focusYoutubeLink;

  songFormModel: Song = {
    originalArtist: "",
    name: "",
    youtubeKaraokeLink: "",
  };

  submitted = false;

  constructor(
    private httpService: ApiService,
    private loginStateService: LoginStateService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.loginStateService.getCurrentUser();
    this.httpService
      .getAttendee(this.currentUser.karaokeId, this.currentUser.id)
      .subscribe((currentAttendee) => {
        this.songFormModel = currentAttendee.song;
      });
  }

  saveSong() {
    this.httpService
      .saveSong(this.songFormModel, this.currentUser.karaokeId)
      .subscribe(
        (data) => {
          this.toastrService.success(
            this.songFormModel.name + " wurde eingetragen!"
          );
          this.router.navigate(["/voting"]);
        },
        (err) => {
          this.toastrService.error(err.message);
        }
      );
  }

  onSubmit() {
    this.submitted = true;
  }

  isValidYoutubeLink(): boolean {
    return (
      this.songFormModel.youtubeKaraokeLink.includes(this.youtubeSharePrefix) ||
      this.songFormModel.youtubeKaraokeLink.includes(this.youtubeCopyPrefix)
    );
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "../api-service.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  nameFocus;
  passwordFocus;
  competitionSelectionFocus;
  allKaraokeCompetitions;

  registrationModel: Registration;

  constructor(
    private httpService: ApiService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.allKaraokeCompetitions = this.httpService.getAllKaraokeCompetitions();
    this.registrationModel = {
      karaokeId: "",
      name: "",
      password: "",
    };
  }

  register() {
    if (
      this.registrationModel.karaokeId &&
      this.registrationModel.name &&
      this.registrationModel.password
    ) {
      this.httpService.register(this.registrationModel).subscribe(
        (data) => {
          this.toastrService.success(
            "Herzlich Willkommen, " + this.registrationModel.name + "!"
          );
          this.router.navigate(["/landing-page"]);
        },
        (err) => {
          this.toastrService.error(err.message);
        }
      );
    }
  }
}

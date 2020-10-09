import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "../api-service.service";
import { LoginStateService } from "../login-state-service.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent {
  nameFocus;
  passwordFocus;
  competitionSelectionFocus;
  allKaraokeCompetitions = this.httpService.getAllKaraokeCompetitions();

  registrationModel: Registration = {
    karaokeId: "",
    name: "",
    password: "",
  };

  constructor(
    private httpService: ApiService,
    private toastrService: ToastrService,
    private loginStateService: LoginStateService,
    private router: Router
  ) {}

  register() {
    if (
      this.registrationModel.karaokeId &&
      this.registrationModel.name &&
      this.registrationModel.password
    ) {
      this.httpService.register$(this.registrationModel).subscribe(
        (user) => {
          this.loginStateService.setUserCookies(user);
          this.toastrService.success(
            "Herzlich Willkommen, " + this.registrationModel.name + "!"
          );
          this.router.navigate(["/landing-page"]);
        },
        (err) => {
          this.toastrService.error(err.message);
        }
      ).unsubscribe;
    }
  }
}

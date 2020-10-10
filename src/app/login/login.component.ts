import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "../api-service.service";
import { LoginStateService } from "../login-state-service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

  loginForm: Login;

  allKaraokeCompetitions$ = this.httpService.getAllKaraokeCompetitions$();

  constructor(
    private httpService: ApiService,
    private loginStateService: LoginStateService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = {
      username: "",
      password: "",
      karaokeId: "",
    };
  }

  login() {
    if (this.loginFormIsValid()) {

      this.httpService.login$(this.loginForm).subscribe(
        (user) => {
          this.loginStateService.setCurrentUser(user, this.loginForm.karaokeId);
          this.toastrService.success("Hallo " + user.name + "!");
          this.router.navigate(["/voting"]);
        },
        (err) => {
          this.toastrService.error(err.message);
        }
      );
    }
  }

  loginFormIsValid() {
    return (
      this.loginForm.password &&
      this.loginForm.username &&
      this.loginForm.karaokeId &&
      this.loginForm.password.length > 0 &&
      this.loginForm.username.length > 0 
    );
  }
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { constructor } from "moment";
import { HttpService } from "../http-service.service";
import { LoginStateService } from "../login-state-service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usernameFocus;
  passwordFocus;

  loginForm: Login;

  constructor(
    private httpService: HttpService,
    private loginStateService: LoginStateService
  ) {}

  ngOnInit() {
    this.loginForm = {
      username: "",
      password: "",
    };
  }

  login() {
    if (this.loginForm.password && this.loginForm.username) {
      this.httpService.login(this.loginForm);
    } else {
      this.loginStateService.setUserCookies({
        isAdmin: false,
        name: "Jonas",
        id: "2",
        karaokeId: "1234",
        token:
          "Bearer eyJhbGci9f5fef85305880101d5e302afafa20154d094b229f75773e",
      });

      alert("Successfully logged in");
    }
  }
}

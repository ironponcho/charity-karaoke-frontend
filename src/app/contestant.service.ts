import { OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiService } from "./api-service.service";
import { LoginStateService } from "./login-state-service.service";

@Injectable({
  providedIn: "root",
})
export class ContestantService implements OnInit {
  currentUser: User;

  constructor(
    private loginStateService: LoginStateService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.setCurrentUserIfNeeded();
  }

  setCurrentUserIfNeeded() {
    if (this.currentUser == null || typeof this.currentUser === undefined) {
      this.currentUser = this.loginStateService.getCurrentUser();
    }
  }
}

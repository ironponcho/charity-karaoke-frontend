import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location, PopStateEvent } from "@angular/common";
import { LoginStateService } from "src/app/login-state-service.service";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  navigationClicked$ = new BehaviorSubject<void>(void 0);
  navListener$ = this.navigationClicked$.subscribe(
    () => (this.isCollapsed = !this.isCollapsed)
  );

  isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(
    private loginStateService: LoginStateService,
    public location: Location,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.navListener$.unsubscribe();
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
  }

  getCurrentUser() {
    let currentUser = this.loginStateService.getCurrentUser();
    return currentUser;
  }

  isLoggedIn(): Boolean {
    return this.getCurrentUser().id != null;
  }

  navigateToPage() {
    this.isCollapsed = true;
  }

  performLogout() {
    this.loginStateService.performLogout();
  }

  isAuthorizedAdmin(): boolean {
    let user = this.loginStateService.getCurrentUser()
    let isAdmin = user && user.isAdmin
    return isAdmin
  }
}

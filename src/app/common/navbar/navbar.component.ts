import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { LoginStateService } from 'src/app/login-state-service.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(
    private loginStateService: LoginStateService,
    public location: Location,
    private router: Router) {
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
    let currentUser = this.loginStateService.getCurrentUser()
    console.log("currentUser: " +JSON.stringify(currentUser))
    return currentUser;
  }

  navigateToPage() {
    this.isCollapsed = true;
  }

  performLogout() {
    this.loginStateService.performLogout();
  }
}

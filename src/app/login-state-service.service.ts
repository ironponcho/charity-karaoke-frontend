import { Injectable, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginStateService implements OnInit {
  private readonly USER_COOKIE_IS_ADMIN = "USER_COOKIE_IS_ADMIN";
  private readonly USER_COOKIE_NAME = "USER_COOKIE_NAME";
  private readonly USER_COOKIE_ID = "USER_COOKIE_ID";
  private readonly USER_COOKIE_KARAOKE_ID = "USER_COOKIE_KARAOKE_ID";
  private readonly USER_COOKIE_KARAOKE_NAME = "USER_COOKIE_KARAOKE_NAME";
  private readonly USER_COOKIE_TOKEN = "USER_COOKIE_TOKEN";

  private currentUser: User = null;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    if (this.currentUser == null || typeof this.currentUser === undefined) {
      this.currentUser = this.getCurrentUser();
    }
  }

  setCurrentUser(user: User){
    this.currentUser = user
    this.setUserCookies(user)
  }

  private setUserCookies(user: User) {
    console.log("Setting User Cookies for " + user.name) ;

    this.cookieService.put(this.USER_COOKIE_IS_ADMIN, user.isAdmin.toString());
    this.cookieService.put(this.USER_COOKIE_NAME, user.name);
    this.cookieService.put(this.USER_COOKIE_ID, user.id);
    this.cookieService.put(this.USER_COOKIE_KARAOKE_ID, user.karaokeId);
    this.cookieService.put(this.USER_COOKIE_TOKEN, user.token);
    
  }

  getCurrentUser$(): Observable<User | null>{
    return of(this.getCurrentUser())
  }

  getCurrentUser(): User | null {
    if (this.currentUser != null && typeof this.currentUser != undefined) {
      return this.currentUser;
    }

    let allCookies = this.cookieService.getAll();

    let userCookies = new Map<string, string>();

    userCookies[this.USER_COOKIE_IS_ADMIN] = allCookies[this.USER_COOKIE_IS_ADMIN];
    userCookies[this.USER_COOKIE_NAME] = allCookies[this.USER_COOKIE_NAME];
    userCookies[this.USER_COOKIE_ID] = allCookies[this.USER_COOKIE_ID];
    userCookies[this.USER_COOKIE_KARAOKE_ID] = allCookies[this.USER_COOKIE_KARAOKE_ID];
    userCookies[this.USER_COOKIE_KARAOKE_NAME] = allCookies[this.USER_COOKIE_KARAOKE_NAME];
    userCookies[this.USER_COOKIE_TOKEN] = allCookies[this.USER_COOKIE_TOKEN];


    if (this.userCookiesAreValid(userCookies)) {
      return {
        isAdmin: Boolean(userCookies[this.USER_COOKIE_IS_ADMIN]),
        name: userCookies[this.USER_COOKIE_NAME],
        id: userCookies[this.USER_COOKIE_ID],
        karaokeId: userCookies[this.USER_COOKIE_KARAOKE_ID],
        token: userCookies[this.USER_COOKIE_TOKEN],
      };
    } else {
      console.warn("Invalid / Missing Cookies. User is not logged in.");

      return null;
    }
  }

  userCookiesAreValid(userCookies: Map<string, string>) {
    for (const entry of userCookies.entries()) {
      const key = entry[0];
      const value = entry[1];
      if (typeof value === "undefined" || value === null) {
        console.error(key + " is not present in the cookies");
        return false;
      }
    }
    return true;
  }

  performLogout() {
    this.cookieService.removeAll();
    this.currentUser = null;
  }
}

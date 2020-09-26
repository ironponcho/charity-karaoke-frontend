import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiPathProviderService {
  private readonly ENV_QUALIFIER = "https://localhost:8080";

  postRegistrationPath() {
    this.ENV_QUALIFIER + "/register";
  }

  postLoginPath() {
    return this.ENV_QUALIFIER + "/login";
  }

  postSongSelectionPath(karaokeId: string, userId: string) {
    return (
      this.ENV_QUALIFIER + "/karaoke/" + karaokeId + "/user/" + userId + "/song"
    );
  }

  postVotingPath(karaokeId: string) {
    return this.ENV_QUALIFIER + "/karaoke/" + karaokeId + "/vote";
  }

  constructor() {}
}

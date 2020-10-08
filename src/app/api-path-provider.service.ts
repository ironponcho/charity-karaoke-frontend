import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiPathProviderService {
  private readonly ENV_QUALIFIER = "https://charity-karaoke.fanya.dev/api";

  getSongsForKaraoke(karaokeId: string) {
    return this.ENV_QUALIFIER + "/song/" + karaokeId;
  }

  getKaraokesPath() {
    return this.ENV_QUALIFIER + "/karaoke";
  }

  postRegistrationPath(karaokeId: string) {
    return this.ENV_QUALIFIER + "/auth/signup";
  }

  postLoginPath(karaokeId: string) {
    return this.ENV_QUALIFIER + "/auth/signin";
  }

  postSongPath() {
    return this.ENV_QUALIFIER + "/song";
  }

  postVotingPath() {
    return this.ENV_QUALIFIER + "/vote";
  }

  constructor() {}
}

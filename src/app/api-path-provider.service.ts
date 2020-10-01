import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiPathProviderService {
  private readonly ENV_QUALIFIER = "https://charity-karaoke.fanya.dev/api";

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

  postVotingPath(karaokeId: string) {
    return this.ENV_QUALIFIER + "/karaoke/" + karaokeId + "/vote";
  }

  constructor() {}
}

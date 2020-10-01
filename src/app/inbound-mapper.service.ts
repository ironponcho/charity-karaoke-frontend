import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class InboundMapperService {
  constructor() {}

  mapUser(userInbound: UserInbound, karaokeId: string): User {
    return {
      name: userInbound.name,
      id: userInbound.id.toString(),
      karaokeId: karaokeId,
      isAdmin: userInbound.roles.includes("USER_ADMIN"),
      token: userInbound.tokenType + " " + userInbound.accessToken,
    };
  }
}

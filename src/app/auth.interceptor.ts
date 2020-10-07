import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginStateService } from "./login-state-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginStateService: LoginStateService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = this.loginStateService.getCurrentUser().token;

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: this.loginStateService.getCurrentUser().token,
        },
      });
    }
    return next.handle(request);
  }
}

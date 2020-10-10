import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { filter, first, map, shareReplay } from "rxjs/operators";
import { ContestantService } from "../contestant.service";
import { ApiService } from "../api-service.service";
import { LoginStateService } from "../login-state-service.service";
import { Attendee } from "../domain/Attendee";
import { merge } from "rxjs";
import { isDefined } from "@angular/compiler/src/util";
import { fromHttpResponse } from "../util/fromHttpResponse";
import { ToastrService } from "ngx-toastr";
import { tap } from "rxjs/internal/operators/tap";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.css"],
})
export class ResultsComponent implements OnInit, OnDestroy {

 contestantsRequest$ = merge([
    this.loginStateService.getCurrentUser$()
  ]).pipe(
    fromHttpResponse(()=> this.api.getAttendees$()),
    shareReplay(1)
  )
 
  readonly contestantsLoading$ = this.contestantsRequest$.pipe(
    map((response) => response.loading)
  )

  readonly contestantsData$ = this.contestantsRequest$.pipe(
    map((response) => response.data),
    filter(isDefined)
  )

    readonly contestantsError$ = this.contestantsRequest$.pipe(
    map((response) => response.error),
    filter(isDefined),  
    tap(data => this.toastr.error(data))
  )

  constructor(
    private route: ActivatedRoute,
    private loginStateService: LoginStateService,
    private api: ApiService, 
    private toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
  
  }

  ngOnInit(): void {
    
  }

}

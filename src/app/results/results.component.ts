import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { filter, map, shareReplay } from "rxjs/operators";
import { ApiService } from "../api-service.service";
import { LoginStateService } from "../login-state-service.service";
import { merge } from "rxjs";
import { isDefined } from "@angular/compiler/src/util";
import { fromHttpResponse } from "../util/fromHttpResponse";
import { ToastrService } from "ngx-toastr";
import { tap } from "rxjs/internal/operators/tap";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
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

  getColorForIndex(i: number){
    
    let color = "white"

    if(i == 0) color = "rgb(255,223,0)"
    if(i == 1) color = "rgb(192,192,192)"
    if(i == 2) color = "rgb(205, 127, 50)"

    return color
  }
}

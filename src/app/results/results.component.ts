import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { ContestantService } from "../contestant.service";
import { ApiService } from "../api-service.service";
import { LoginStateService } from "../login-state-service.service";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.css"],
})
export class ResultsComponent implements OnInit {

  contestants$ = this.httpService.getAttendees$

  constructor(
    private route: ActivatedRoute,
    private loginStateService: LoginStateService,
    private httpService: ApiService
  ) {}

  ngOnInit(): void {}

}

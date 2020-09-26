import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { ContestantService } from "../contestant.service";
import { ApiService } from "../api-service.service";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.css"],
})
export class ResultsComponent implements OnInit {
  currentAttendee: Attendee;

  constructor(
    private route: ActivatedRoute,
    private httpService: ApiService,
    private contestantService: ContestantService
  ) {}

  ngOnInit(): void {}

  getContestants$() {
    return this.contestantService.getContestantsForCurrentKaraoke$();
  }
}

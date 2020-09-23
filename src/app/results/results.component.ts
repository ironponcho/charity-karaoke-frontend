import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { ContestantService } from "../contestant.service";
import { HttpService } from "../http-service.service";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.css"],
})
export class ResultsComponent implements OnInit {
  currentAttendee: Attendee;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private contestantService: ContestantService
  ) {}

  ngOnInit(): void {}

  getContestants$() {
    return this.contestantService.getContestantsForCurrentKaraoke$();
  }

  getAverage(votes: Vote[]) {
    let sum = 0;
    if (votes.length === 0) {
      return sum;
    }
    votes.forEach((vote) => (sum += vote.percentage));
    return sum / votes.length;
  }
}

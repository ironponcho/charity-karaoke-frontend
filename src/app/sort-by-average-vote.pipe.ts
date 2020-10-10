import { Pipe, PipeTransform } from "@angular/core";
import { orderBy } from "lodash";
import { Attendee } from "./domain/Attendee";

@Pipe({
  name: "sortByAverageVote",
})
export class SortByAverageVotePipe implements PipeTransform {
  transform(value: Attendee[]): Attendee[] {
    if (!value || value.length == 0) {
      return value;
    }

    if (value.length <= 1) {
      return value;
    }

    return orderBy(value, ["averageVote"], ["desc"]);
  }
}

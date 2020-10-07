import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "trim",
})
export class TrimmerPipe implements PipeTransform {
  transform(
    value: string,
    limit = 25,
    completeWords = false,
    ellipsis = "..."
  ) {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(" ");
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}

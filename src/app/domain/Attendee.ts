import { Song } from "./Song";
import { Vote } from "./Vote";

export interface Attendee {
  id: string;
  name: string;
  karaokeId: string;
  isCurrentlyPerforming: boolean;
  song?: Song;
  receivedVotes: Vote[];
  voteFromCurrentAttendee?: number;
  averageVote?: number;
}

interface Attendee {
    id: string, 
    name: string, 
    isCurrentlyPerforming: boolean, 
    song?: Song,
    receivedVotes?: Vote[]
}
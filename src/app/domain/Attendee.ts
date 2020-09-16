interface Attendee {
    id: string
    name: string
    karaokeId: string
    isCurrentlyPerforming: boolean
    isAdmin: Boolean
    song?: Song
    receivedVotes: Vote[],
    averageVoteInPercentage?: number
}

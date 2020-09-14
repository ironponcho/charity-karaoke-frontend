interface Contestant {
    id: string, 
    name: string,
    karaokeId: string
    isCurrentlyPerforming: boolean, 
    song: Song,
    receivedVotes: Vote[]
}
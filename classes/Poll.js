class Poll {
    #candidates = {}
    #strawPollId = ''
    #title = ''

    get candidates() {
        return this.#candidates
    }

    set candidates(candidates) {
        this.#candidates = candidates
    }

    get isClosed() {
        return !!this.#strawPollId
    }

    get strawPollId() {
        return this.#strawPollId
    }

    set strawPollId(pollId) {
        this.#strawPollId = pollId
    }

    get title() {
        return this.#title
    }

    set title(title) {
        this.#title = title
    }

    addCandidate(username, candidate) {
        this.#candidates[username] = candidate
    }

    resetPoll() {
        this.#title = ''
        this.#strawPollId = ''
        this.#candidates = {}
    }
}

module.exports = Poll

class Poll {
    #title = ''
    #strawPollId = ''
    #candidates = {}

    get title() {
        return this.#title
    }

    set title(title) {
        this.#title = title
    }

    get strawPollId() {
        return this.#strawPollId
    }

    set strawPollId(pollId) {
        this.#strawPollId = pollId
    }

    get candidates() {
        return this.#candidates
    }

    set candidates(candidates) {
        this.#candidates = candidates
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

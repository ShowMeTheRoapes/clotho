const { STRAWPOLL_KEY } = require('../config.json')
const { Poll } = require('../classes')
const axios = require('axios').default

const STRAWPOLL_URL = 'https://strawpoll.com/api/poll'
const headers = { 'API-KEY': STRAWPOLL_KEY }

/**
 * Create a StrawPoll for the given Poll using the StrawPoll API.
 * https://strawpoll.com/api-docs
 * @param {Poll} poll The Poll object holding all Poll information
 */
function createStrawPoll(poll) {
    const body = {
        poll: {
            title: poll.title,
            answers: Object.values(poll.candidates).map(c => c.candidate),
        }
    }

    return axios.post(STRAWPOLL_URL, body, { headers })
}

/**
 * Get the results of a StrawPoll using the StrawPoll API.
 * https://strawpoll.com/api-docs
 * @param {string} pollId The StrawPoll ID provided from the StrawPoll API
 */
function getStrawPollResults(pollId) {
    return axios.get(`${STRAWPOLL_URL}/${pollId}`, { headers })
}


module.exports = {
    createStrawPoll,
    getStrawPollResults,
}

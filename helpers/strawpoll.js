const { STRAWPOLL_KEY } = require('../config.json')
const axios = require('axios').default
const STRAWPOLL_URL = 'https://strawpoll.com/api/poll'

/**
 * Create a StrawPoll for the given Poll using the StrawPoll API.
 * https://strawpoll.com/api-docs
 * @param {object} poll The Poll object holding all Poll information
 */
async function createStrawPoll(poll) {
    const headers = { 'API-KEY': STRAWPOLL_KEY }
    const body = {
        poll: {
            title: poll.title,
            answers: Object.values(poll.candidates).map(c => c.candidate),
        }
    }

    return axios.post(STRAWPOLL_URL, body, { headers })
}

module.exports = createStrawPoll

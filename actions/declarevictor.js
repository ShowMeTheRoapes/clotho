const { STRAWPOLL_KEY } = require('../config.json')
const { Message } = require('discord.js')
const axios = require('axios').default

/**
 * Determine the victor of the StrawPoll and post it in the channel.
 * @param {object} poll The Poll object holding all Poll information
 * @param {Message} message The Message object from the Discord.js API
 */
async function declareVictor(poll, message) {
    // TODO: Ensure a poll is running before trying this
    // TODO: Ensure a StrawPoll ID exists before trying this

    const getResponse = await axios.get(`https://strawpoll.com/api/poll/${poll.strawPollId}`, { headers: { 'API-KEY': STRAWPOLL_KEY } })
    const results = getResponse.data.content.poll.poll_answers

    results.sort((a, b) => {
        if (a.votes < b.votes) return -1
        if (a.votes > b.votes) return 1
        return 0
    })

    const winner = results.filter(res => res.votes === results[results.length - 1].votes)
    if (winner.length > 1) {
        message.channel.send(`There has been a tie between the following candidates: ${winner.map(cand => cand.answer).join(', ')}\nBreak the tie however you see fit!`)
    } else {
        message.channel.send(`A champion has been selected! The winner of "${poll.title}" is... ***${winner[0].answer}!***`)
    }

    // TODO: Extract resetting poll information to a function
    poll.candidates = {}
    poll.title = ''
    poll.strawPollId = ''
}

module.exports = declareVictor

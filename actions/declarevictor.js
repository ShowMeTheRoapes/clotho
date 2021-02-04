const { Message } = require('discord.js')
const { Poll } = require('../classes')
const { getStrawPollResults, createStrawPoll } = require('../helpers')

const sortByVotes = (a, b) => {
    if (a.votes < b.votes) return -1
    if (a.votes > b.votes) return 1
    return 0
}

/**
 * Validate the poll state before attempting to declare a winner
 * @param {Poll} poll The Poll object holding all Poll information
 */
function validate(poll) {
    if (!poll.title) {
        throw new Error('There is currently no active poll! Please begin a poll with the **!!startpoll** command (**!!help** for more details).')
    }

    if (!poll.strawPollId) {
        throw new Error('A StrawPoll has not been created yet! Please create a StrawPoll using the **!!closepoll** command (**!!help** for more details).')
    }
}

/**
 * Determine the victor of the StrawPoll and post it in the channel.
 * @param {Poll} poll The Poll object holding all Poll information
 * @param {Message} message The Message object from the Discord.js API
 */
async function declareVictor(poll, message) {
    validate(poll)

    const response = await getStrawPollResults(poll.strawPollId)
    const { poll_answers } = response.data.content.poll
    poll_answers.sort(sortByVotes)

    const winner = poll_answers.filter(answer => answer.votes === poll_answers[poll_answers.length - 1].votes)

    if (!winner.length) {
        console.error(`Not sure how this happened, but winner array has a value of ${winner}. This is very unexpected!`)
        message.reply('ERROR: Something went wrong while trying to declare the winner! Please check the logs.')
    }

    if (winner.length > 1) {
        message.channel.send(`There has been a tie between the following candidates: ${winner.map(cand => cand.answer).join(' :fire: ')}\nPlease vote again on the tiebreaker StrawPoll provided below!`)

        poll.candidates = poll.candidates.filter(c => winner.some(w => w.answer.toLowerCase() === c.candidate.toLowerCase()))
        const response = await createStrawPoll(poll)
        poll.strawPollId = response.data.content_id

        message.channel.send(`Please vote on StrawPoll: https://strawpoll.com/${poll.strawPollId}`)
    } else {
        message.channel.send(`A champion has been selected! The winner of "${poll.title}" is... ***${winner[0].answer}!***`)
        poll.resetPoll()
    }
}

module.exports = declareVictor

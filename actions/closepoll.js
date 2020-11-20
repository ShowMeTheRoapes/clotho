const { Message } = require('discord.js')
const { createStrawPoll } = require('../helpers')

/**
 * Validate the input and the poll state before closing the current poll
 * @param {object} poll
 */
function validate(poll) {
    if (!poll.title) {
        throw new Error('There is currently no active poll! Please begin a poll with the **!!startpoll** command (**!!help** for more details).')
    }

    if (!Object.keys(poll.candidates).length) {
        throw new Error('No candidates have been submitted yet! Please wait for all members to submit their candidates for this poll using the **!!submit** command before closing it (**!!help** for more details).')
    }
}

/**
 * Close the current poll, create a StrawPoll, and post it in the channel automatically.
 * @param {object} poll The Poll object holding all Poll information
 * @param {Message} message The Message object from the Discord.js API
 */
async function closePoll(poll, message) {
    validate(poll)

    message.channel.send('Thank you for your submissions! A poll will be created with your candidates shortly.')

    const response = await createStrawPoll(poll)
    poll.strawPollId = response.data.content_id

    message.channel.send(`Please vote on StrawPoll: https://strawpoll.com/${poll.strawPollId}`)
}

module.exports = closePoll

const { Message } = require('discord.js')

/**
 * Validate the input and the poll state before allowing another poll to start
 * @param {object} poll The Poll object holding all Poll information
 * @param {string} title The proposed title of the poll
 */
function validate(poll, title) {
    if (poll.title) {
        throw new Error(`Poll "${poll.title}" is already running! Please wait until the current poll is complete to start a new one.`)
    }

    if (!title) {
        throw new Error('Please provide a title for the poll.')
    }
}

/**
 * Start a poll with a title.
 * If a poll is already active, it will reject the request until that poll is closed.
 * @param {object} poll The Poll object holding all Poll information
 * @param {Message} message The Message object from the Discord.js API
 * @param {String[]} args The arguments that were provided after the command
 */
function startPoll(poll, message, args) {
    const title = args.join(' ').trim()
    try {
        validate(poll, title)
    } catch (error) {
        message.reply(`ERROR: ${error.message}`)
        return
    }

    poll.title = title
    message.channel.send(`Poll "${poll.title}" has begun! Please submit your candidates using the command **!!submit [candidate]**`)
}

module.exports = startPoll

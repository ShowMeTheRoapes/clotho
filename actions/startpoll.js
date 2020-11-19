/**
 * Start a poll with a title.
 * If a poll is already active, it will reject the request until that poll is closed.
 * @param {object} poll The Poll object holding all Poll information
 * @param {object} message The Message object from the Discord.js API
 * @param {String[]} args The arguments that were provided after the command
 */
function startPoll(poll, message, args) {
    if (poll.title) {
        message.reply(`Poll "${poll.title}" is already running! Please wait until the current poll is complete.`)
        return
    }

    const title = args.join(' ').trim()
    if (!title) {
        message.reply('Please provide a title for the poll.')
        return
    }

    poll.title = title
    message.channel.send(`Poll "${poll.title}" has begun! Please submit your candidates using the command **!!submit [candidate]**`)
}

module.exports = startPoll

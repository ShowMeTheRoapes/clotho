const { Message } = require('discord.js')
const { Poll } = require('../classes')

/**
 * Reset the poll object so that it has a clean slate.
 * @param {Poll} poll The Poll object holding all poll information
 * @param {Message} message The Message object from the Discord.js API
 */
function reset(poll, message) {
    poll.resetPoll()
    message.channel.send('Poll has been reset! Use the **!!startpoll** command to begin a new one.')
}

module.exports = reset

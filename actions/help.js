const { Message } = require('discord.js')

const helpMessage = `
Here's a list of the valid commands for Clotho!

**!!ping** - Test that the bot is healthy.
**!!startpoll [title]** - Begin a poll with the given title.
**!!submit [candidate for poll]** - Submit your candidate for the current poll. If you have already submitted a candidate, using this command again will replace your submission.
**!!closepoll** - Stop taking submissions for the current poll and create a StrawPoll with the given candidates.
**!!declare** - Declares a victor of the StrawPoll and erases the values in the poll object.
**!!reset** - Resets all poll information to nothing. You have a clean slate!

The typical order for using these commands is the way they are listed above (with the exception of the **!!ping** command).
`

/**
 * Send a message to the channel that lists all of the eligible commands
 * @param {Message} message The Message object from the Discord.js API
 */
function help(message) {
    message.channel.send(helpMessage)
}

module.exports = help

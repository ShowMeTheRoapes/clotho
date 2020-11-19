const helpMessage = `
Here's a list of the valid commands for Clotho!

**!!ping** - Test that the bot is healthy.
**!!startpoll [title]** - Begin a poll with the given title.
**!!submit [candidate for poll]** - Submit your candidate for the current poll.
**!!closesubmissions** - Stop taking submissions for the current poll and create a poll with the given candidates.
`

/**
 * Send a message to the channel that lists all of the eligible commands
 * @param {object} message The Message object from the Discord.js API
 */
function help(message) {
    message.channel.send(helpMessage)
}

module.exports = help

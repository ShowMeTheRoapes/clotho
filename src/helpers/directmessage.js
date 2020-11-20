const { User } = require("discord.js")

/**
 * Send a direct message to the given user
 * @param {User} user The Discord.js User to send a message to
 * @param {string} dmText The text to be sent to the given user
 */
async function directMessage(user, dmText) {
    const dmChannel = await user.createDM()
    dmChannel.send(dmText)
}

module.exports = directMessage

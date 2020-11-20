const { Message } = require('discord.js')

/**
 * A simple ping function to check if the bot is running.
 * @param {Message} message The Message object from the Discord.js API
 */
function ping(message) {
    message.reply('Clotho is up and running!')
}

module.exports = ping

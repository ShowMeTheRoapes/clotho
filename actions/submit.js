const { Message } = require('discord.js')
const { Poll } = require('../classes')
const { directMessage } = require('../helpers')

/**
 * Validate the input and the poll state before allowing another poll to start
 * @param {Poll} poll The Poll object holding all Poll information
 * @param {Message} message The Message object from the Discord.js API
 * @param {string} candidate The proposed candidate being submitted
 */
async function validate(poll, message, candidate) {
    if (!poll.title) {
        throw new Error('A poll has not been started! Please start one with the **!!startpoll** command.')
    }

    if (!candidate) {
        throw new Error('No candidate was provided! Please use the **!!help** command to see proper usage')
    }

    const duplicateSubmissions = Object.keys(poll.candidates)
        .filter(user => user !== message.author.username)
        .filter(user => poll.candidates[user].candidate.toLowerCase() === candidate.toLowerCase())

    if (duplicateSubmissions.length) {
        await directMessage(`Unfortunately, your proposed candidate "${candidate}" has already been submitted by another member. Please submit a different candidate.`)
        throw new Error('Your candidate has already been submitted by another user. Please submit again!')
    }
}

/**
 * Allow a user to submit a candidate for the poll.
 * If the user has already submitted a candidate and another is submitted,
 * the new one will replace the old one.
 * @param {Poll} poll The Poll object holding all Poll information
 * @param {Message} message The Message object from the Discord.js API
 * @param {string[]} args The arguments that were provided after the command
 */
async function submit(poll, message, args) {
    const newCandidate = args.join(' ').trim()
    const { author } = message
    const { username } = author

    await validate(poll, message, newCandidate)

    if (username in poll.candidates) {
        message.reply("Clotho has received another submission from you! It will replace your previous submission.")
        await directMessage(author, `Clotho received another submission from you!\nYour previous candidate, "${poll.candidates[username].candidate}", will be replaced with your new submission, "${newCandidate}".`)
    } else {
        message.reply('Your submission has been saved!')
        await directMessage(author, `Clotho has received your candidate "${newCandidate}"!`)
    }

    poll.addCandidate(username, {
        user: author,
        candidate: newCandidate,
    })
}

module.exports = submit

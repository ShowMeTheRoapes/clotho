/**
 * Allow a user to submit a candidate for the poll.
 * If the user has already submitted a candidate and another is submitted,
 * the new one will replace the old one.
 * @param {object} poll The Poll object holding all Poll information
 * @param {object} message The Message object from the Discord.js API
 * @param {String[]} args The arguments that were provided after the command
 */
async function submit(poll, message, args) {
    const newCandidate = args.join(' ')
    const { username } = message.author

    if (username in poll.candidates) {
        message.reply("Clotho has received another submission from you! It will replace your previous submission.")

        const dm = await message.author.createDM()
        dm.send(`Clotho received another submission from you!\nYour previous candidate, "${poll.candidates[username].candidate}", will be replaced with your new submission, "${newCandidate}".`)
    } else {
        message.reply('your submission has been saved!')

        const dm = await message.author.createDM()
        dm.send(`Clotho has received your candidate "${newCandidate}"!`)
    }

    const duplicateSubmissions = Object.keys(poll.candidates)
        .filter(user => user !== message.author.username)
        .filter(user => poll.candidates[user].candidate.toLowerCase() === newCandidate.toLowerCase())

    if (duplicateSubmissions.length) {
        message.reply('Actually, this candidate has already been submitted by another user. Please submit again!')

        const dm = await message.author.createDM()
        dm.send(`Unfortunately, your proposed candidate "${newCandidate}" has already been submitted. Please submit a different candidate.`)
        return
    }

    poll.candidates[username] = {
        user: message.author,
        candidate: newCandidate,
    }
}

module.exports = submit

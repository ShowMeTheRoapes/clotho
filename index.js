const Discord = require('discord.js')
const config = require('./config.json')
const axios = require('axios').default
const { ping }  = require('./actions')

const client = new Discord.Client()
const prefix = '!!'

const poll = {
    title: '',
    strawPollId: '',
    candidates: {},
}

client.on('message', async message => {
    const isIgnorable = message.author.bot || !message.content.startsWith(prefix)
    if (isIgnorable) return

    const commandBody = message.content.slice(prefix.length)
    const args = commandBody.split(' ')
    const command = args.shift().toLowerCase()

    const runCommand = (actionName, actionFunc) => {
        console.log(`${actionName} command received from ${message.author.username}`)
        actionFunc()
        message.delete()
    }

    switch (command) {
        case 'ping':
            console.log(`Ping received from ${message.author.username}`)
            ping(message)
            break

        case 'start':
            const title = args.join(' ')
            if (!title) {
                message.reply('Please provide a title for the poll.')
                break
            }
            pollTitle = title

            message.channel.send(`Poll "${pollTitle}" has begun! Please submit your candidates using the command **!!submit [candidate]**`)
            message.delete()
            break

        case 'submit':
            const newCandidate = args.join(' ')
            const { username } = message.author

            if (username in options) {
                message.reply("Clotho has received another submission from you! It will replace your previous submission.")
                message.author.createDM()
                    .then(dm => dm.send(`Clotho received another submission from you!\nYour previous candidate, "${options[username].candidate}", will be replaced with your new submission, "${newCandidate}".`))
            } else {
                message.reply('your submission has been saved!')
                message.author.createDM()
                    .then(dm => dm.send(`Clotho has received your candidate "${newCandidate}"!`))
            }

            const duplicateSubmissions = Object.keys(options)
                .filter(user => user !== message.author.username)
                .filter(user => options[user].candidate.toLowerCase() === newCandidate.toLowerCase())

            if (duplicateSubmissions.length) {
                message.reply('Actually, this candidate has already been submitted by another user. Please submit again!')
                message.author.createDM()
                    .then(dm => dm.send(`Unfortunately, your proposed candidate "${newCandidate}" has already been submitted. Please submit a different candidate.`))
                break
            }

            options[username] = {
                user: message.author,
                candidate: newCandidate,
            }

            message.delete()
            break

        case 'closesubmissions':
            message.channel.send('Thank you for your submissions! A poll will be created with your candidates shortly.')

            const body = {
                poll: {
                    title: pollTitle,
                    answers: Object.values(options).map(o => o.candidate),
                }
            }
            const createResponse = await axios.post('https://strawpoll.com/api/poll', body, { headers: { 'API-KEY': config.STRAWPOLL_KEY } })
            pollId = createResponse.data.content_id
            message.channel.send(`Please vote on StrawPoll: https://strawpoll.com/${pollId}`)

            message.delete()

            break

        case 'declare':
            const getResponse = await axios.get(`https://strawpoll.com/api/poll/${pollId}`, { headers: { 'API-KEY': config.STRAWPOLL_KEY } })
            const results = getResponse.data.content.poll.poll_answers
            results.sort((a, b) => {
                if (a.votes < b.votes) return -1
                if (a.votes > b.votes) return 1
                return 0
            })
            const winner = results.filter(res => res.votes === results[results.length - 1].votes)

            if (winner.length > 1) {
                message.channel.send(`There has been a tie between the following candidates: ${winner.map(cand => cand.answer).join(', ')}\nBreak the tie however you see fit!`)
            } else {
                message.channel.send(`A champion has been selected! Enjoy ${winner[0].answer}!`)
            }

            message.delete()
            options = {}
            pollTitle = 'Default Poll Title'
            pollId = ''

            break

        case 'help':
            const helpMessage = `
Here's a list of the valid commands for Clotho!

**!!ping** - Test that the bot is healthy.
**!!submit [candidate for poll]** - Submit your candidate for the current poll.
**!!closesubmissions** - Stop taking submissions for the current poll and create a poll with the given candidates.
`
            message.channel.send(helpMessage)
            break

        default:
            message.reply(`"${prefix}${command}" is not a recognizable command! Please use "!!help" to get a list of valid commands.`)
            break
    }
})

client.login(config.BOT_TOKEN)
console.log('Clotho is up and running!')

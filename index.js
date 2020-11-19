const Discord = require('discord.js')
const config = require('./config.json')
const axios = require('axios').default
const actions  = require('./actions')

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

    const runCommand = async (actionName, actionFunc) => {
        console.log(`${actionName} command received from ${message.author.username}`)
        await actionFunc()
        message.delete()
    }

    switch (command) {
        case 'ping':
            await runCommand('Ping', () => actions.ping(message))
            break

        case 'startpoll':
            await runCommand('Start Poll', () => actions.startPoll(poll, message, args))
            break

        case 'submit':
            await runCommand('Submit', () => actions.submit(poll, message, args))
            break

        case 'closepoll':
            await runCommand('Close Poll', () => actions.closePoll(poll, message))
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
            await runCommand('Help', () => actions.help(message))
            break

        default:
            message.reply(`"${prefix}${command}" is not a recognizable command! Please use "!!help" to get a list of valid commands.`)
            break
    }
})

client.login(config.BOT_TOKEN)
console.log('Clotho is up and running!')

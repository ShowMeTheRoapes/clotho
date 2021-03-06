const Discord = require('discord.js')
const config = require('./config.json')
const actions = require('./actions')
const { Poll } = require('./classes')

const client = new Discord.Client()
const prefix = '!!'

const poll = new Poll()

client.on('message', async message => {
    const isIgnorable = message.author.bot || !message.content.startsWith(prefix)
    if (isIgnorable) return

    const commandBody = message.content.slice(prefix.length)
    const args = commandBody.split(' ')
    const command = args.shift().toLowerCase()

    const runCommand = async (actionName, actionFunc) => {
        console.log(`${actionName} command received from ${message.author.username}`)

        try {
            await actionFunc()
        } catch (error) {
            console.error(error.message)
            message.reply(`ERROR: ${error.message}`)
        } finally {
            message.delete()
        }
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
            await runCommand('Declare Victor', () => actions.declareVictor(poll, message))
            break

        case 'reset':
            await runCommand('Reset Poll', () => actions.reset(poll, message))
            break

        case 'help':
            await runCommand('Help', () => actions.help(message))
            break

        default:
            message.reply(`"${prefix}${command}" is not a recognizable command! Please use "!!help" to get a list of valid commands.`)
            break
    }
})

client.login(config.BOT_TOKEN).then(() => {
    client.user.setActivity('!!help', { type: 'PLAYING' })
})
console.log('Clotho is up and running!')

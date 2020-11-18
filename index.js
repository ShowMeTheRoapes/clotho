const Discord = require('discord.js')
const config = require('./config.json')

const client = new Discord.Client()
const prefix = '!!'
client.on('message', message => {
    const isIgnorable = message.author.bot || !message.content.startsWith(prefix)
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return

    const commandBody = message.content.slice(prefix.length)
    const args = commandBody.split(' ')
    const command = args.shift().toLowerCase()

    switch (command) {
        case 'ping':
            const timeTaken = Date.now() - message.createdTimestamp
            message.reply(`Go fuck yourself!`)
            break;

        default:
            break;
    }
})

client.login(config.BOT_TOKEN)

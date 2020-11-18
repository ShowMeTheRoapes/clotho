const Discord = require('discord.js')
const config = require('./config.json')

const client = new Discord.Client()
const prefix = '!!'
client.on('message', message => {
    const isIgnorable = message.author.bot || !message.content.startsWith(prefix)
    if (isIgnorable) return

    const commandBody = message.content.slice(prefix.length)
    const args = commandBody.split(' ')
    const command = args.shift().toLowerCase()

    switch (command) {
        case 'ping':
            message.reply(`Go fuck yourself!`)
            break;

        default:
            break;
    }
})

client.login(config.BOT_TOKEN)

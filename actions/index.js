const ping = require('./ping')
const startPoll = require('./startpoll')
const submit = require('./submit')
const closePoll = require('./closepoll')
const declareVictor = require('./declarevictor')
const help = require('./help')
const reset = require('./reset')

module.exports = {
    ping,
    startPoll,
    submit,
    closePoll,
    declareVictor,
    help,
    reset,
}

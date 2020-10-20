require('@babel/polyfill')
const { Client, Collection } = require('discord.js')
const fs = require('fs')
const path = require('path')
const { botToken } = require('./config')

const client = new Client()

client.commands = new Collection()
client.aliases = new Collection()
client.mongoose = require('./utils/mongoose')

client.categories = fs.readdirSync(path.resolve(__dirname, './commands/'))
;['command'].forEach((handler) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    require(`./handlers/${handler}`)(client)
})

const files = fs.readdirSync(path.join(__dirname, '/events')) // Read the content files in the directory before starting the bot.

files.forEach((fileName) => {
    if (fileName.endsWith('.js')) {
        // Looking for .js files only.
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const event = require(`./events/${fileName}`)
        const eventName = fileName.split('.')[0] // Get the event name of the file.

        console.log(`Successfully loaded the ${eventName} event.`)
        client.on(eventName, event.bind(null, client))
    }
})

client.login(botToken)

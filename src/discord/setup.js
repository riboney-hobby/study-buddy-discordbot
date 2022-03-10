const fs = require('fs')
const path = require('path')
const { Collection } = require('discord.js')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9')

// helpers
const commandsFolderPath = path.join(__dirname, './commands')
const eventsFolderPath = path.join(__dirname, './events')

const commandFiles = fs.readdirSync(commandsFolderPath).filter(file => file.endsWith('.js'))
const eventFiles = fs.readdirSync(eventsFolderPath).filter(file => file.endsWith('.js'));

const commands = (() => commandFiles.map(file => require(path.join(commandsFolderPath, file))))()
const events = (() => eventFiles.map(file => require(path.join(eventsFolderPath, file))))()

// src: https://discordjs.guide/creating-your-bot/command-handling.html#reading-command-files
const clientCommands = (() => {
    const cc = new Collection()

    commands.forEach(c => cc.set(c.data.name, c))
    
    return cc
})()

// src: https://discordjs.guide/interactions/slash-commands.html#guild-commands
const registerCommands = async (token, botID, guildID) => {
    const rest = new REST({ version: '9' }).setToken(token);
    const commandsJSON = commands.map(c => c.data.toJSON())

    try{
        await rest.put(Routes.applicationGuildCommands(botID, guildID), { body: commandsJSON })
        console.log('Successfully registered application commands.')
    } catch(err){
        console.log('Error in command registration!')
        throw err
    }
}

const registerListeners = (client) => {
	// eslint-disable-next-line no-unused-vars
	return new Promise((resolve, _reject) => {

        for(const event of events){
            if(event.once) client.once(event.name, (...args) => event.execute(...args))
            else client.on(event.name, (...args) => event.execute(...args))
        }

		resolve()
	})
}

module.exports = {
    clientCommands,
    registerCommands,
    registerListeners
}
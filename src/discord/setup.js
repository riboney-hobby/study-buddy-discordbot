const fs = require('fs')
const path = require('path')
const { Collection } = require('discord.js')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9')

// helpers
const commandPaths = path.join(__dirname, './commands')
const commandFiles = fs.readdirSync(commandPaths).filter(file => file.endsWith('.js'))
const commands = (() => commandFiles.map(file => require(path.join(commandPaths, file))))()

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

module.exports = {
    clientCommands,
    registerCommands
}
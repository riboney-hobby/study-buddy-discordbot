const {Client, Intents } = require('discord.js')

const { clientCommands, registerCommands, registerListeners } = require('./setup')

// helper
const initializeBot = () => {
	const client = new Client({ intents: [
		Intents.FLAGS.GUILDS, 
		Intents.FLAGS.GUILD_MEMBERS, 
		Intents.FLAGS.GUILD_MESSAGES] });
	client.commands = clientCommands
	return client;
}

const client = initializeBot();

// Login to Discord with your client's token
const start = async (token, botID, guildID) => {
    
	try{
		const res = await Promise.all([
			registerCommands(token, botID, guildID),
			client.login(token),
			registerListeners(client)
		])

		return res
	} catch(err){
		console.error(`Error: ${err}\n`)
		throw err
	}
}

const destroy = () => {
	client.destroy()
	console.log('Discord bot closed!')
}

module.exports = {
    start,
	destroy
}
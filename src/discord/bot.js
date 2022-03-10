const {Client, Intents } = require('discord.js')

const { clientCommands, registerCommands } = require('./setup')

// helper
const initializeBot = () => {
	const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
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
			registerListeners()
		])

		return res
	} catch(err){
		console.error(`Error: ${err}\n`)
		throw err
	}
}

const registerListeners = () => {
	// eslint-disable-next-line no-unused-vars
	return new Promise((resolve, _reject) => {
		// When the client is ready, run this code (only once)
		client.once('ready', () => console.log('Ready!'));

		client.on('interactionCreate', async interaction => {
			if (!interaction.isCommand()) return;

			const command = client.commands.get(interaction.commandName);

			if (!command) return

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		})

		resolve()
	})
}

const destroy = () => {
	client.destroy()
	console.log('Discord bot closed!')
}

module.exports = {
    start,
	destroy
}
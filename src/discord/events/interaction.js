module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction) {
        const client = interaction.client
		const command = client.commands.get(interaction.commandName)

        if (!command) return

        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(error)
            client.user.send('There was an error while executing this command!')
        }
	},
};
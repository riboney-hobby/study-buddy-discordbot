// src: https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
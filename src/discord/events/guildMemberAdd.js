const config = require('../../globals/config')

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	execute(guildMember) {
        const client = guildMember.client
        const channel = client.channels.cache.get(config.WELCOME_ID)
        channel.send(`Hello <@${guildMember.user.id}>!\n` 
        + 'Please introduce yourself and allow some time for approval!\n\n'
        + 'Channels will be hidden & inaccessible until you are approved'
        )
	},
};
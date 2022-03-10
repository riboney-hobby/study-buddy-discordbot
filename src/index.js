const config = require('./globals/config')
const bot = require('./discord/bot')

bot.start(config.BOT_TOKEN, config.BOT_CLIENT_ID, config.GUILD_ID)
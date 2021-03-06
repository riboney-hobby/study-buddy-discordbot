
require('dotenv').config()

const BOT_TOKEN = process.env.BOT_TOKEN
const BOT_CLIENT_ID = process.env.BOT_CLIENT_ID
const GUILD_ID = process.env.GUILD_ID
const GITHUB = process.env.GITHUB
const WELCOME_ID = process.env.WELCOME_ID

module.exports = {
    BOT_TOKEN,
    BOT_CLIENT_ID,
    GUILD_ID,
    GITHUB,
    WELCOME_ID
}
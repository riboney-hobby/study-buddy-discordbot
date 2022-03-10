const { SlashCommandBuilder } = require('@discordjs/builders')

const config = require('../../globals/config')

const data = new SlashCommandBuilder()
    .setName('home')
    .setDescription('Display github home for bot')

const execute = async (interaction) => await interaction.reply(`${config.GITHUB}`)

module.exports = {
    data: data,
    execute: execute
}
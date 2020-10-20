const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Check the bot latency',
    execute: async (message) => {
        const m = await message.channel.send('Please wait...')
        let embed = new Discord.MessageEmbed()
            .addField(
                '⌛ Latency',
                `**${m.createdTimestamp - message.createdTimestamp}ms**`
            )
            .addField('💓 API', `**${Math.floor(message.client.ws.ping)}ms**`)
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor('RANDOM')
            .setTimestamp()
        return m.edit(`🏓 Poong!`, embed)
    },
}

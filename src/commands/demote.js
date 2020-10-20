const Guild = require('../models/guild')
const Util = require('../utils/utils.js')

module.exports = {
    name: 'demote',
    description: 'Remove a user from admin of ListBot',
    execute: async (message) => {
        // check if user promoting is admin
        const guildID = message.guild.id
        const authorId = message.author.id

        const guild = await Guild.findOne({ guildID })

        const authorIsAdmin = guild.guildAdminsId.some(
            (adminId) => adminId === authorId
        )

        if (!authorIsAdmin) return
        // get mentioned user id
        const mentionedUserId = message.mentions.users.first().id

        // check if user is really an admin
        const userId = guild.guildAdminsId.findIndex(
            (adminId) => adminId === mentionedUserId
        )

        if (userId !== -1) {
            // remove the user id from user admin
            guild.guildAdminsId.splice(userId, 1)
            guild.save()
            let embededMessage = Util.embedMessage(
                'Succesfully removed user from admin',
                message.author.tag,
                '0xffff00',
                'Hooray'
            )
            message.channel.send(embededMessage)
        } else {
            // user is not an admin
            let embededMessage = Util.embedMessage(
                'The user is not an admin',
                message.author.tag,
                '0xffff00',
                'Awww'
            )
            message.channel.send(embededMessage)
        }
    },
}

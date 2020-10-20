const Util = require('../utils/utils.js')
const Item = require('../models/Item.js')
const ChannelRepository = require('../repositories/channel-repository')

module.exports = {
    name: 'multi-add',
    description: 'Add multiple elements to the list',

    execute: async (message, args) => {
        let item = [...args]

        let { channel } = message

        const dbChannel = await ChannelRepository.findOrCreate(channel)

        item.forEach(async (instance) => {
            let newItem = new Item({
                content: instance,
                author: message.author.tag,
            })

            dbChannel.items.push(newItem)
        })

        dbChannel.save()

        let embededMessage = Util.embedMessage(
            'Successfully added',
            message.author.tag,
            '0xffff00',
            item
        )
        channel.send(embededMessage)
    },
}

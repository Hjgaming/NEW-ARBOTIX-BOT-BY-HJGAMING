const { MessageEmbed } = require("discord.js");

module.exports = {
        name: "credits",
        aliases: [''],
        category: 'info',
        description: 'Shows A Arbotix credits',
        usage: '',
        accessableby: 'everyone',

    run: async (bot, message, args) => {
            const embed = new MessageEmbed()
                .setTitle(`Arbotix Credits`)
                .setColor("GREEN")
                .setDescription(`**arbotix** is a bot created by **HJGAMING AND PARAS** and **discord.gg/icx** we provide all copyrights and add license to our application!`)
                .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed)
    }
};

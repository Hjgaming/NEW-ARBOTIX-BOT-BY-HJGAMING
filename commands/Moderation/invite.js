const { MessageEmbed } = require("discord.js");
const { MessageButton } = require("discord-buttons");

module.exports = {
    name: "invite",
    description: "To invite the bot to your servers.",
    aliases: ["inv"],
    usage: "",
    categoery: "🤖 Information Commands",

    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle(`${client.user.username} || Invite`)
        .setDescription(`Want to invite me to your server? Then [click here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) to invite me to your server.`)
        .setColor(`BLURPLE`)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

        const invite = new MessageButton()
        .setStyle(`url`)
        .setLabel(`Invite`)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)

        message.channel.send({ button: invite, embed: embed })

    }
};

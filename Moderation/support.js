
const { MessageEmbed } = require("discord.js");
const { MessageButton } = require("discord-buttons");

module.exports = {
    name: "support",
    description: "Join My Support Server",
    aliases: ["inv"],
    usage: "",
    categoery: "Others",

    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle(`${client.user.username} || Support server`)
        .setDescription(`Join My support server? Then [click here](https://discord.gg/JCNj58X28A) to Join my support server`)
        .setColor(`BLURPLE`)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

        const invite = new MessageButton()
        .setStyle(`url`)
        .setLabel(`support server`)
        .setURL(`https://discord.gg/JCNj58X28A`)

        message.channel.send({ button: invite, embed: embed })

    }
};


const { MessageEmbed, version: djsversion } = require("discord.js");
const { utc } = require("moment");
const version = "1.0.0";
const os = require("os");
const ms = require("ms");
module.exports = {
  name: "botinfo",
  description: "Get bot information",
  usage: "botinfo",
  category: "🤖 Information Commands",
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setAuthor(
        `Information about the ${message.client.user.username} Bot`,
        `
        ${message.client.user.displayAvatarURL()}`
      )
      .addField("💻 Bot Name", `\`\`\`${message.client.user.username}\`\`\``)
      .addField("💻 Bot Developer", `\`\`\`HJ GAMING DEV\`\`\``)
      .addField("💻 Bot Developer", `\`\`\`PARAS OP DEV\`\`\``)
      .addField("💻 Ping", `\`\`\`${client.ws.ping}\`\`\``)
      .addField("💻 uptime", `\`\`\`${ms(client.uptime)}\`\`\``)
      .addField("💻 Bot Developer",
       `<@589154804601716838>`)
      .addField("💻 Bot Developer",
       `<@782935884181798932>`)
       
      .addField(
        "💻 Total Server ",
        `\`\`\`${client.guilds.cache.size}\`\`\``,
        true
      )
      .addField(
        "💻 Total Channel",
        `\`\`\`${client.channels.cache.size}\`\`\``,
        true
      )
      
      .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
      
      .addField("💻 API Latency", `\`${(client.ws.ping)}ms\``, true)
      
      
      .addField("📁 Voice-Channels", `\`${client.channels.cache.filter(ch => ch.type === "voice").size}\``, true)

      .addField(
        "💻 Total Users",
        `\`\`\`${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()}\`\`\``,
        true
      )

      .addField("💻 Bot Library", `\`\`\`discord.js\`\`\``)
      .addField(
        "💻 Invite Link Below",
        `[Invite](https://discord.com/api/oauth2/authorize?client_id=878929654931677195&permissions=8&scope=bot)
     `
      )
      .setImage(`${message.client.user.displayAvatarURL()}`)
      .setColor("RANDOM")
      
      .setFooter("Coded by: HJ GAMING DEV")

    message.channel.send(embed);
  }
};

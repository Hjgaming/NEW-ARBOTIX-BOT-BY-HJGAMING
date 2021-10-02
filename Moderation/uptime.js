const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
  name: "uptime",
  aliases: ["online"],
  category: "info",
  description: "Shows Bot's Up time.",
  usage: "uptime",

  run: async (client, message, args) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    const embed = new Discord.MessageEmbed()
    .setTitle("UpTime")
    .setDescription("arbotix uptime")
    .addField("**__UPTIME:__**", `\`${days}d\`-\`${hours}h\`-\`${minutes}m\`-\`${seconds}s\``)
    .setColor("BLUE")
    .setFooter("©️ Arbotix ")
    .setTimestamp();
    
    return message.channel.send(embed);
  }
  
}
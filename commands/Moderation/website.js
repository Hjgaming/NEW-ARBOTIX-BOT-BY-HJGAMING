const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
module.exports = {

name : "website",
category: 'Others',
run : async (client, message, args) => {

let embed = new Discord.MessageEmbed()

.setTitle("Arbotix Website")
.setDescription("Arbotix Website Made By HJGAMING")
.setColor("RANDOM")


.addField("ARBOTIX WEBSITE","[Click here](https://ARBOTIX-NEW.hjgamingyt.repl.co)");


message.channel.send(embed);
  }
};
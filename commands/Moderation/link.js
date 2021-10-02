const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
module.exports = {

name : "link",
category: 'Others',
run : async (client, message, args) => {

let embed = new Discord.MessageEmbed()

.setTitle("Arbotix bot all useful links")
.setDescription("arbotix v2 invite link , top.gg , support server , arbotix invite link")
.setColor("RANDOM")
.addField("ARBOTIX INVITE LINK","[Click here](https://discord.com/oauth2/authorize?client_id=769974477185744937&permissions=8&scope=bot)")

.addField("ARBOTIX V2 INVITE LINK","[Click here](https://discord.com/oauth2/authorize?client_id=878929654931677195&permissions=8&scope=bot)")

.addField("SUPPORT SERVER","[Click here](https://discord.gg/Z3UbE99KES)")

.addField("ARBOTIX 1 TOP.GG","[Click here](http://top.gg/bot/769974477185744937/vote)")

.addField("ARBOTIX 2 TOP.GG","[Click here](https://top.gg/bot/878929654931677195/vote)")

.addField("ARBOTIX WEBSITE","[Click here](https://ARBOTIX-NEW.hjgamingyt.repl.co)")

.addField("INB VOTE LINK","[Click here](https://inbbotlist.com/bots/828638287328444466/vote)");

message.channel.send(embed);
  }
};
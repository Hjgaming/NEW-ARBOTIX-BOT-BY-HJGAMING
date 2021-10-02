const db = require("quick.db"); //WE WILL BE USING QUICK.DB

module.exports = {
  name: "welcomechannel",
  aliases: ["wc", "welcomechannel"],
  usage: "welcomechannel <channel>",
  description: "set welcome channel",
  category: "welcome",

  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send({
        embed: {
          title: "Missing Permissions",
          color: "RED"
        }
      });
    let Channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]) ||
      message.guild.channels.cache.find(c =>
        c.name.toLowerCase().includes(args[0])
      );
    if (!Channel)
      return message.channel.send({
        embed: {
          title: "Missing Channel",
          description: "Missing required arguments!",
          fields: [
            {
              name: "Usage",
              value:
                "`welcomechannel <channelID | channelMention | channelName>`"
            }
          ],
          timestamp: new Date(),
          color: "RED"
        }
      });
    await db.set(`welcome_${message.guild.id}`, Channel.id);
    await message.channel.send({
      embed: {
        title: "Success!",
        description: `Join channel set as: <#${Channel.id}>! All welcome messages will be redirected here. If this was a mistake, please configure it again`,
        color: "GREEN",
        timestamp: new Date()
      }
    });
  }
};

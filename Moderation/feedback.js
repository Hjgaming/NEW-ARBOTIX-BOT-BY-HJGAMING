const { feedBackChannelId } = require("../../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "feedback",
  description: "Give feedback about the bot",
  category: "⚙️ Utility Commands",
  run:async(bot, message, args) => {
    const feedback = args.join(" ");

    if (!feedback)
      return message.channel.send(
        "If you wanna be nice please give some feedback."
      );

    if (!feedBackChannelId || feedBackChannelId === "") return;

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(`${message.author.username} New Feedback`)
      .setDescription(feedback)
      .setFooter(message.author.username)
      .setTimestamp();

    bot.channels.cache.get(feedBackChannelId).send(embed);

    message.channel.send("Successfully sent feedback!");
  },
};
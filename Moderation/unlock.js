module.exports = {
  name: "unlock",
  description: "UnLock channel",
  category: "⛔️ moderation",
  usage: "unlock <channel>",

  run: async (client, message, args) => {
    
    
        if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** You Can't Run This Commands`
        }
      });
    
    let channeltolock =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[1]);

    if (!channeltolock)
      return message.reply({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** Mention channel`
        }
      });

    let everyone = message.guild.roles.cache.get(message.guild.id);

    channeltolock
      .updateOverwrite(
        everyone,
        {
          SEND_MESSAGES: true
        },
        [`REPONSIBLE MODERATOR | ${message.author.tag}`]
      )
      .then(message.reply(`Unlocked Channel ${channeltolock} ! `))
      .catch(console.error);
  }
};

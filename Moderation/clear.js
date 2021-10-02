module.exports = {
  name: "clear",
  aliases: ["purge", "op"],
  category: "⛔️ moderation",
  usage: "clear <amount>",
  description: "Clears the chat",
  run: async (client, message, args) => {
    if (message.deletable) {
      message.delete();
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** You Can't Run This Commands`
        }
      });

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** I need mange message premission`
        }
      });

    // Check if args[0] is a number
    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
      return message.reply(
        "Yeah.... That's not a numer? I also can't delete 0 messages by the way."
      );
    }

    let deleteAmount;

    if (parseInt(args[0]) > 100) {
      deleteAmount = 100;
    } else {
      deleteAmount = parseInt(args[0]);
    }

    message.channel
      .bulkDelete(deleteAmount, true)
      .then(deleted =>
        message.channel.send(`I deleted \`${deleted.size}\` messages.`)
      )
      .catch(err => message.reply(`Something went wrong... ${err}`));
  }
};

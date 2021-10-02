const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "warn",
  category: "⛔️ moderation",
  usage: "warn <@mention> <reason>",
  description: "Warn anyone who do not obey the rules",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** You can't run this command `
        }
      });
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** mention user.... `
        }
      });
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** I can't warn bots... `
        }
      });
    }

    if (message.author.id === user.id) {
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** I can't warn you..! `
        }
      });
    }

    if (user.id === message.guild.owner.id) {
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** I can't warn owner `
        }
      });
    }

    const Reason = args.slice(1).join(" ");
    let reason = `${message.member.user.username} [${Reason ||
      "No Reason Provided!"}]`;

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === 3) {
      return message.channel.send(
        `${
          message.mentions.users.first().username
        } already reached his/her limit with 3 warnings`
      );
    }

    if (warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1);
      user.send(
        `You have been warned in **${message.guild.name}** for ${reason}`
      );
      await message.channel.send(
        `You warned **${user.user.username}** for ${reason}`
      );
    } else if (warnings !== null) {
      db.add(`warnings_${message.guild.id}_${user.id}`, 1);
      user.send(
        `You have been warned in **${message.guild.name}** for ${reason}`
      );
      await message.channel.send(
        `You warned **${user.user.username}** for ${reason}`
      );
    }
  }
};

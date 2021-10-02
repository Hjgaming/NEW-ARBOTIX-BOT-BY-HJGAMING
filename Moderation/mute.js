const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute anyone who break rules",
  category: "⛔️ moderation",
  usage: "mute <@mention> <reason>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** You can't run this command `
        }
      });
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** I need Mange Role permission !`
        }
      });
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** mention user..`
        }
      });
    }

    if (user.id === message.author.id) {
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** I can't mute you..`
        }
      });
    }

    if (user.id === client.user.id)
    return message.channel.send({
      embed: {
        color: "ff0000",
        description: `:pleading_face: **${message.member.user.username}** Pls Don't mute me..... `
      }
    });

  if (user.id === message.guild.owner.user.id)
    return message.channel.send({
      embed: {
        color: "ff0000",
        description: `:crossed_swords: **${message.member.user.username}** Bruh You can't mute owner `
      }
    });


    let Reason = args.slice(1).join(" ");
    let reason = `${message.member.user.username} [${Reason || "No Reason Provided!"}]`


    //TIME TO LET MUTED ROLE

    let muterole = message.guild.roles.cache.find(x => x.name === "Muted");

    if (!muterole) {
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** I cant Find **Muted** role ...! `
        }
      });
    }
    
    if (user.roles.cache.has(muterole)) {
      return message.channel.send("Given User is already muted");
    }

    user.roles.add(muterole);

    await message.channel.send(
      `You muted **${
        message.mentions.users.first().username
      }** For \`${reason}\``
    );

    user.send(`You are muted in **${message.guild.name}** For \`${reason}\``);

    //WE ARE DONE HERE
  }
};
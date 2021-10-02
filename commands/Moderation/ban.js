const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  aliases: [],
  description: "ban A Member!",
  usage: "ban <Mention Member>",
  category: "⛔️ moderation",

  run: async (client, message, args) => {
    //Start

    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** You Can't Run This Commands`
        }
      });

      if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** I need ban premission`
        }
      });


    let Member = message.mentions.members.first()
    let User = message.guild.member(Member);

    if (!User)
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** Mention User `
        }
      });

    if (!message.guild.members.cache.get(User.id))
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** I can't Find this user `
        }
      });

    if (User.id === message.author.id)
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** I can't ban you `
        }
      });

    if (User.id === client.user.id)
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:pleading_face: **${message.member.user.username}** Pls Don't ban me..... `
        }
      });

    if (User.id === message.guild.owner.user.id)
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** Bruh You can't ban owner `
        }
      });

    let Reason = args.slice(1).join(" ");

    if (!User.bannable)
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** I can't ban **${Member.username}**`
        }
      });
let reason = `${message.member.user.username} [${Reason || "No Reason Provided!"}]`
    try {
      console.log(`Member Is Going To Get ban!`);
      setTimeout(function() {
        User.ban({ days: 7, reason: `${reason}` })
      }, 2000);

      const avatar = User.user.displayAvatarURL({ dynamic: true });
      let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(`!${Member.user.username} has been ban`, `${avatar}`)
        .addField(
          ":small_orange_diamond: Moderator",
          `\`\`\`${message.member.user.username}\`\`\``,
          true
        )
        .addField(
          `:small_orange_diamond: Reason`,
          `\`\`\`${Reason || "No Reason Provided!"}\`\`\``,
          true
        )

      if (User && Member.bot === false)
        Member.send(
          `You Have Been banned From **${message.guild.name}** For ${Reason ||
            "No Reason Provided!"}`
        );
      message.channel.send(embed);
      console.log(
        `User: ${User.user.username} (${Member.id}) Just Got banned From ${
          message.guild.name
        } For ${Reason || "No Reason Provided!"}`
      );
    } catch (error) {
      return message.channel
        .send({
          embed: {
            color: "ff0000",
            description: `:crossed_swords: **${message.member.user.username}** I Can't ban That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!`
          }
        })
        .then(() => console.log(error));
    }

    //End
  }
};

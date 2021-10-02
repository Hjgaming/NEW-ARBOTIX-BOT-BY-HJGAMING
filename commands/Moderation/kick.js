const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  aliases: [],
  description: "kick A Member!",
  usage: "kick <Mention Member>",
  category: "⛔️ moderation",

  run: async (client, message, args) => {
    //Start

    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** You Can't Run This Commands`
        }
      });

      if (!message.guild.me.hasPermission("KICK_MEMBERS"))
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** I need kick premission`
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
          description: `:crossed_swords: **${message.member.user.username}** I can't kick you `
        }
      });

    if (User.id === client.user.id)
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:pleading_face: **${message.member.user.username}** Pls Don't kick me..... `
        }
      });

    if (User.id === message.guild.owner.user.id)
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** Bruh You can't kick owner `
        }
      });

    let Reason = args.slice(1).join(" ");

    if (!User.kickable)
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** I can't kick **${Member.username}**`
        }
      });
let reason = `${message.member.user.username} [${Reason || "No Reason Provided!"}]`
    try {
      console.log(`Member Is Going To Get kick!`);
      setTimeout(function() {
        User.kick(reason)
      }, 2000);

      const avatar = User.user.displayAvatarURL({ dynamic: true });
      let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(`!${Member.user.username} has been kicked`, `${avatar}`)
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
          `You Have Been kicked From **${message.guild.name}** For ${Reason ||
            "No Reason Provided!"}`
        );
      message.channel.send(embed);
      console.log(
        `User: ${User.user.username} (${Member.id}) Just Got kicked From ${
          message.guild.name
        } For ${Reason || "No Reason Provided!"}`
      );
    } catch (error) {
      return message.channel
        .send({
          embed: {
            color: "ff0000",
            description: `:crossed_swords: **${message.member.user.username}** I Can't kick That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!`
          }
        })
        .then(() => console.log(error));
    }

    //End
  }
};

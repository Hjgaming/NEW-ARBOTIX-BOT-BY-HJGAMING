const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban",
  aliases: [],
  description: "Unban A Member!",
  usage: "Unban <Member ID>",
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
          description: `:crossed_swords: **${message.member.user.username}** I need Ban premission`
        }
      });

    if (!args[0])
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** Provide User id !`
        }
      } );

    if (isNaN(args[0])) return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** invilde id !`
        }
      });

    if (args[0] === message.author.id)
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** You are already unban`
        }
      });

    if (args[0] === message.guild.owner.user.id)
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** bruh owner's id`
        }
      });

    if (args[0] === client.user.id)
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** I am already unban !`
        }
      });

    let FetchBan = await message.guild.fetchBans();

    let Member;
    Member =
      FetchBan.find(
        b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      FetchBan.get(args[0]) ||
      FetchBan.find(
        bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase()
      );

    if (!Member)
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** Check user id already unban or inviald `
        }
      });

    let Reason = args.slice(1).join(" ") || "No Reason Provided!";

    try {
      message.guild.members.unban(Member.user.id, Reason);
    } catch (error) {
      return message.channel.send({
        embed: {
          color: "ff0000",
          description: `:crossed_swords: **${message.member.user.username}** Some Error....................`
        }
      });
    }
    const avatar = Member.user.displayAvatarURL({ dynamic: true });


    let embed = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor(`!${Member.user.username} has been unbanned`, `${avatar}`)
      .addField(`:small_orange_diamond:Moderator`, `\`\`\`${message.author.tag} (${message.author.id}}\`\`\``,true)
      .addField(`:small_orange_diamond:Unbanned Member`, `\`\`\`${Member.user.tag} (${Member.user.id}\`\`\``,true)
      .addField(`:small_orange_diamond:Reason`, `\`\`\`${Reason || "No Reason Provided!"}\`\`\``,true)

    return message.channel.send(embed);

    //End
  }
};
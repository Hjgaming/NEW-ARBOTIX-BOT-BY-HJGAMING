module.exports = {
    name: "unmute",
    category: "⛔️ moderation",
    usage: "unmute <@mention>",
  
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
          description: `:crossed_swords: **${message.member.user.username}** you are already unmuted..`
        }
      });
    }

    if (user.id === client.user.id)
    return message.channel.send({
      embed: {
        color: "ff0000",
        description: `:pleading_face: **${message.member.user.username}** i am already unmuted.... `
      }
    });

  if (user.id === message.guild.owner.user.id)
    return message.channel.send({
      embed: {
        color: "ff0000",
        description: `:crossed_swords: **${message.member.user.username}** Bruh this is owner `
      }
    });

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
        return message.channel.send("User is not muted");
      }
  
      user.roles.remove(muterole);

      await message.channel.send(
        `**${message.mentions.users.first().username}** is unmuted`
      );
  
      user.send(`You are now unmuted from **${message.guild.name}**`);



    }

}
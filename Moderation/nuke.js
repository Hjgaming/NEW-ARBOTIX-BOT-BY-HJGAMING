module.exports = {
  name: "nuke",
  category: "⛔️ moderation",
};

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("you don't have the permission for that.");
  if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I don't have the permission for that.");

  if (!message.channel.parentID) {
    message.channel.clone({ position: message.channel.rawPosition }).then((ch) => {
      ch.send("Channel nuked \n https://i.gifer.com/6Ip.gif").then((msg) => msg.delete({ timeout: 20000 }));
    });
  } else {
    message.channel.clone({ parent: message.channel.parentID, position: message.channel.rawPosition }).then((ch) => {
      ch.send("Channel nuked \n https://i.gifer.com/6Ip.gif").then((msg) => msg.delete({ timeout: 20000 }));
    });
  }
  message.channel.delete();
};
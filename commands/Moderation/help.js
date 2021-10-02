const { MessageEmbed } = require("discord.js");
const db = require("quickmongo")
module.exports = {
  name: ".",
  description:
    "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "info",
  run: async (client, message, args) => {
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Description", command.description || "Not Provided :(")
        .addField("Usage", "`" + command.usage + "`" || "Not Provied")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setDescription(`:white_small_square:**${client.user.username}** Help \n\n:small_orange_diamond:For more info **help <cmd name>**\n`)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setImage('https://media.discordapp.net/attachments/860531684242882560/883385758130503751/standard_1.gif')


      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for (const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`:white_small_square: ${category.toUpperCase()}`, `:small_orange_diamond: ${desc}`);
      }

      /*https://cdn.discordapp.com/attachments/831863614729748500/838638168559190096/standard.gif
      

     /* let database = db.get(`cmd_${message.guild.id}`)

      if(database && database.length) {
        let array =[]
        database.forEach(m => {
          array.push("`" + m.name + "`")
        })

        emx.addField("Custom Commands", array.join(", "))
      }
*/
      return message.channel.send(emx);
    }
  }
};
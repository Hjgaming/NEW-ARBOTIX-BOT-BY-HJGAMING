const {MessageEmbed } = require("discord.js")
module.exports = {
  name: "guildCreate",
  async execute(client,guild) {
	let owner = await client.users.fetch('589154804601716838');
	owner.send(
		new MessageEmbed()
			.setTitle('New Guild!')
			.setDescription(
				`I have been added to **${guild.name}** with **${
					guild.memberCount
				}** members`
			)
			.setColor('BLURPLE')
	);
}}

const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'addrole',
	botPermission: [
		'EMBED_LINKS',
		'READ_MESSAGE_HISTORY',
		'USE_EXTERNAL_EMOJIS',
		'ADD_REACTIONS',
		'MANAGE_ROLES'
	],

	aliases: ['role', 'a!role'],
	category: "⛔️ moderation",
	description: 'Add role to any user',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('MANAGE_ROLES')) {
			return message.channel.send('sorry you need permission to mute someone');
		}
		if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
			return message.channel.send('I do not have permission to mute');
		}
		let target =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]);

		if (!target)
			return message.reply(`\
please mention user!`);

	

		if (!arole) return message.reply(`⚠️ please mention role for add!`);
		let botRolePosition = message.guild.member(message.client.user).roles
			.highest.position;
		let rolePosition = arole.position;
		let userRolePossition = message.member.roles.highest.position;

		if (userRolePossition <= rolePosition)
			return message.channel.send(
				` Failed to add the role to the user because your role is lower than the specified role.`
			);

		if (botRolePosition <= rolePosition)
			return message.channel.send(
				` Failed to add the role to the user because my highest role is lower than the specified role.`
			);
		let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
		let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });

		const embed = new MessageEmbed()

			.setColor('RANDOM')
			.setDescription(
				`✔changed role for ${
					target.user.username
				} added ${arole}`
			);

		await message.channel.send(embed);

		target.roles.add(arole).catch(err => {});
	}
};

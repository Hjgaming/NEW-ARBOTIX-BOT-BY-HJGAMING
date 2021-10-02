const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'roleinfo',
	category: '⛔️ moderation',
	description: 'Displays information about a provided role.',
	aliases: ['role', 'ri'],
	usage: 'roleinfo <role>',
	run: async (client, message, args) => {
		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
		if(!role) {
			return message.channel.send(
				':x: Please provide a valid role.',
			);
		}

		let permissions;
		if(role.permissions.toArray().length !== 0) {
			permissions = role.permissions.toArray().map(x => x.split('_').map(y => y[0] + y.slice(1).toLowerCase()).join(' ')).join(', ');
		}
		else {
			permissions = 'None';
		}
		const embed = new MessageEmbed()
			.setColor(role.hexColor)
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.setTitle('Role Information')
			.addFields(
				{ name: 'Role Name', value: `\`\`\`${role.name}\`\`\``, inline:true },
				{ name: 'Role ID', value: `\`\`\`${role.id}\`\`\``, inline:true },
				{ name: 'Hex Color', value: `\`\`\`${role.hexColor.toUpperCase()}\`\`\`` },
				{ name: 'Members', value: `\`\`\`${role.members.size}\`\`\``, inline:true },
				{ name: 'Hoisted', value: `\`\`\`${role.hoist ? 'Yes' : 'No'}\`\`\``, inline:true },
				{ name: 'Mentionable', value: `\`\`\`${role.mentionable ? 'Yes' : 'No'}\`\`\``, inline:true },
				{ name: 'Created', value: `\`\`\`${moment(role.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')} | ${Math.floor((Date.now() - role.createdTimestamp) / 86400000)} day(s) ago\`\`\`` },
			)
			.addField('Permissions', [
				`\`\`\`${permissions}\`\`\``,
			]);

		return message.channel.send(embed);
	},
};
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'device',
	category: '🤖 Information Commands',
	description: 'Tells you which devices a user is on.',
	usage: 'device <member>',
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle(`${member.user.username}'s device`)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		if (member.presence.clientStatus.mobile) {
			embed.addFields([
				{ name: '📱 Mobile', value:'🟢', inline: true },
				{ name: '🖥 Desktop', value:'🔴', inline: true },
				{ name: '🌐 Web', value:'🔴', inline: true },
			]);
		}
		else if (member.presence.clientStatus.desktop) {
			embed.addFields([
				{ name: '📱 Mobile', value:'🔴', inline: true },
				{ name: '🖥 Desktop', value:'🟢', inline: true },
				{ name: '🌐 Web', value:'🔴', inline: true },
			]);
		}
		else if (member.presence.clientStatus.web) {
			embed.addFields([
				{ name: '📱 Mobile', value:'🔴', inline: true },
				{ name: '🖥 Desktop', value:'🔴', inline: true },
				{ name: '🌐 Web', value:'🟢', inline: true },
			]);
		}


		message.channel.send(embed);
	},
};
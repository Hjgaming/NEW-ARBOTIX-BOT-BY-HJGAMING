const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'move',
	category: '🎶 Music Commmands',
	run: async (client, message, args) => {
		const player = message.client.manager.players.get(message.guild.id);
		const color = message.guild.me.roles.highest.color;

		if (!player) {
			let embed = new MessageEmbed()
				.setColor('428CCF')
				.setDescription(
					'⚠️ there is nothing playing in this server'
				);
			return message.channel.send(embed);
		}

		const { channel } = message.member.voice;

		if (!channel) {
			let embed = new MessageEmbed()
				.setColor('428CCF')
				.setDescription(
					'⚠️ Please connect to a voice channel'
				);
			return message.channel.send(embed);
		}

		if (channel.id !== player.voiceChannel) {
			let embed = new MessageEmbed()
				.setColor(color)
				.setDescription(
					`must join this channel \`${
						message.guild.channels.cache.get(player.voiceChannel).name
					}\`if you want use my command`
				);
			return message.channel.send(embed);
		}

		if (!args[0] || !args[1]) {
			let embed = new MessageEmbed()
				.setColor('428CCF')

				.setDescription(
					`⚠️ mention channel or give channel id!`
				);
			return message.channel.send(embed);
		}

		if (isNaN(args[0]) || isNaN(args[1])) {
			let embed = new MessageEmbed()
				.setColor('428CCF')
				.setDescription(
					`⚠️ That is not a vaild channel`
				);
			return message.channel.send(embed);
		}

		if (
			args[0] > player.queue.length ||
			args[0] <= 0 ||
			args[1] > player.queue.length ||
			args[1] <= 0
		) {
			let embed = new MessageEmbed()
				.setColor('428CCF')
				.setDescription(
					`⚠️ That is not valid channel`
				);
			return message.channel.send(embed);
		}

		let embed = new MessageEmbed()
			.setColor(color)
			.setDescription(
				`**[${player.queue[args[0] - 1].title}](${
					player.queue[args[0] - 1].uri
				})**` +
					' ' +
					messages.messages.to +
					' ' +
					args[1] +
					'.'
			);

		const element = player.queue[args[0] - 1];
		player.queue.splice(args[0] - 1, 1);
		player.queue.splice(args[1] - 1, 0, element);

		return message.channel.send(embed);
	}
};

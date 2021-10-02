const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'volume',
	category: '🎶 Music Commmands',
	run: (client, message, args) => {
		const player = message.client.manager.players.get(message.guild.id);
		const color = message.guild.me.roles.highest.color;

		if (!player) {
			let embed = new MessageEmbed()
				.setColor('428CCF')
				.setDescription(
					'⚠️ There is nothing playing'
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
				.setColor('428CFF')
				.setDescription(
					`⚠️ Must be in \`${
						message.guild.channels.cache.get(player.voiceChannel).name
					}\`if you want use me!`
				);
			return message.channel.send(embed);
		}

		if (!args.length) {
			let embed = new MessageEmbed()
				.setColor('428CCF')

				.setDescription(
					`❎ Provide me volume in 1 to 100 `
				)
				.setFooter('EX :- P!volume 60');
			return message.channel.send(embed);
		}

		if (isNaN(args[0])) {
			let embed = new MessageEmbed()
				.setColor('428CCF')
				.setDescription(
					'⚠️ that is not a vaild number'
				);
			return message.channel.send(embed);
		}

		if (args[0] < 1 || args[0] > 100) {
			let embed = new MessageEmbed()
				.setColor('428CFF')
				.setDescription(
					'⚠️ Volume always be 1 to 100'
				);
			return message.channel.send(embed);
		}

		const volume = Number(args[0]);

		player.setVolume(volume);
		return message.channel.send(`🔊 Volume seted to ${args[0]}`);
	}
};

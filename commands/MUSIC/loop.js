const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'loop',
  category: '🎶 Music Commmands',
	run: (client, message, args) => {
		const player = message.client.manager.players.get(message.guild.id);
		const color = message.guild.me.roles.highest.color;

		if (!player) {
			let embed = new MessageEmbed()
				.setColor('428CCF')
				.setDescription(
					'⚠️ there is nothing playing to loop'
				);
			return message.channel.send(embed);
		}

		const { channel } = message.member.voice;

		if (!channel) {
			let embed = new MessageEmbed()
				.setColor('428CCF')
				.setDescription(
					'⚠️ Please connect with voice channel'
				);
			return message.channel.send(embed);
		}

		if (channel.id !== player.voiceChannel) {
			let embed = new MessageEmbed()
				.setColor(color)
				.setDescription(
					`must join to ${
						message.guild.channels.cache.get(player.voiceChannel).name
					}if you want use my command`
				);
			return message.channel.send(embed);
		}

		if (args[0] && args[0].toLowerCase() == 'song') {
			if (player.trackRepeat == false) {
				player.setTrackRepeat(true);
				return message.channel.send('🔂 LOOP ENABLED');
			} else {
				player.setTrackRepeat(false);
				return message.channel.send('LOOP DISABLED');
			}
		}

		if (args[0] && args[0].toLowerCase() == 'queue') {
			if (player.queueRepeat == false) {
				player.setQueueRepeat(true);
				return message.react('🔁');
			} else {
				player.setQueueRepeat(false);
				return message.react('❌');
			}
		}

		if (
			!args[0] ||
			args[0].toLowerCase() != 'song' ||
			args[0].toLowerCase() != 'queue'
		) {
			let embed = new MessageEmbed()
				.setColor('428CCF')
				.setTitle('TRY THIS')
				.setDescription(`a!loop queue`);
			return message.channel.send(embed);
		}
	}
};

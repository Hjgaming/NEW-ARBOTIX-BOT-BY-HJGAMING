const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'join',
	category: '🎶 Music Commmands',
	run: async (client, message, args) => {
		// const color = message.guild.me.roles.highest.color
		const { channel } = message.member.voice;

		if (!channel) {
			let embed = new MessageEmbed()
				.setColor('428CCF')
				.setDescription(
					`⚠️ Please connect with voice channel`
				);
			return message.channel.send(embed);
		}

		if (
			message.guild.me.voice.channel &&
			message.guild.me.voice.channel.id !== channel.id
		) {
			let embed = new MessageEmbed()
				.setColor('428CCF')
				.setDescription(
					`⚠️ You must have to join ${
						message.guild.me.voice.channel
					}`
				);
			return message.channel.send(embed);
		}

		if (!message.guild.me.voice.channel) {
			const player = message.client.manager.create({
				guild: message.guild.id,
				voiceChannel: channel.id,
				textChannel: message.channel.id,
				selfDeafen: true
			});

			if (!channel.joinable) {
				let embed = new MessageEmbed()
					.setColor('428CCF')

					.setDescription(
						"⚠️ I can't able to join your voice channel"
					);
				return message.channel.send(embed);
			}

			player.connect();
			return message.react('🎵');
		}
	}
};

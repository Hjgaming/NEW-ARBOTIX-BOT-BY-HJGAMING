const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'pause',
  category: '🎶 Music Commmands',
	run: (client, message) => {
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

		if (player.paused) {
			player.pause(false);
			return message.react('▶️');
		} else if (!player.paused) {
			player.pause(true);
			return message.channel.send('⏸️ Paused');
		}
	}
};

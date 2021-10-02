const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'stop',
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

		player.destroy();
		return message.channel.send('🛑 Stopped');
	}
};

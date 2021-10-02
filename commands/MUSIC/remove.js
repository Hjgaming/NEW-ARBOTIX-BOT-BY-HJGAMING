const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'remove',
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
				.setColor(color)
				.setTitle(messages.messages.incorrectUse)
				.setDescription(`${prefix}${messages.messages.noRemoveArgs}`);
			return message.channel.send(embed);
		}

		if (isNaN(args[0])) {
			let embed = new MessageEmbed()
				.setColor(color)
				.setDescription(messages.messages.isnanRemove);
			return message.channel.send(embed);
		}

		if (args[0] > player.queue.length || args[0] <= 0) {
			let embed = new MessageEmbed()
				.setColor(color)
				.setDescription(messages.messages.noQueueLength);
			return message.channel.send(embed);
		}

		player.queue.splice(args[0] - 1, 1);
		return message.react('✅');
	}
};

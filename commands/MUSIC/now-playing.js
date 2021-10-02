const { MessageEmbed } = require('discord.js');
const { porgressBar } = require('music-progress-bar');
const { time2 } = require('../../utils/Utils.js');

module.exports = {
	name: 'nowplaying',
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

		const { title, author, duration, uri } = player.queue.current;

		const progressBar = porgressBar(
			{
				currentPositon: player.position > 0 ? player.position : '1',
				endPositon: duration,
				width: 12,
				barStyle: '▬',
				currentStyle: '🔘'
			},
			{
				format: ' **  <bar>  ** '
			}
		);

		let embed = new MessageEmbed()
			.setColor('GREEN')
			.setAuthor(author, message.author.avatarURL({ dynamic: true }))
			.setTitle(title)
			.setURL(uri)
			.setImage(`${player.queue.current.displayThumbnail('hqdefault')}`)
			.setDescription(
				`${player.playing ? '▶️' : '⏸️'}  ${progressBar}  \`[${
					player.position <= 60000
						? `${time2(player.position)}s`
						: time2(player.position)
				}/${time2(duration)}]\``
			);
		return message.channel.send(embed);
	}
};

const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'search',
  category: '🎶 Music Commmands',
	run: async (client, message, args) => {
		const color = message.guild.me.roles.highest.color;
		const { channel } = message.member.voice;

		if (!channel) {
			let embed = new MessageEmbed()
				.setColor('428CCF')
				.setDescription(
					'⚠️ Pleae connect with a voice channel'
				);
			return message.channel.send(embed);
		}

		if (!args.length) {
			let embed = new MessageEmbed()
				.setColor('428CCF')
				.setDescription(
					`⚠️ provide  me song name or url link!`
				);
			return message.channel.send(embed);
		}

		let play = message.client.manager.players.get(message.guild.id);

		if (!play) {
			const player = message.client.manager.create({
				guild: message.guild.id,
				voiceChannel: channel.id,
				textChannel: message.channel.id,
				selfDeafen: true
			});

			if (!channel.joinable) {
				let embed = new MessageEmbed()
					.setColor('428CFF')

					.setDescription(
						"⚠️ I can't able to join your voice channel"
					);
				return message.channel.send(embed);
			}

			player.connect();
		}

		const player = message.client.manager.players.get(message.guild.id);

		if (player.options.voiceChannel !== channel.id) {
			let embed = new MessageEmbed()
				.setColor('428CFF')
				.setDescription(
					`⚠️ Must join \`${channel.name}\``
				);
			return message.channel.send(embed);
		}

		const search = args.join(' ');
		let res;

		try {
			res = await player.search(search, message.author);
			if (res.loadType === 'LOAD_FAILED') {
				if (!player.queue.current) player.destroy();
				throw new Error(res.exception.message);
			}
		} catch (err) {
			let embed = new MessageEmbed()
				.setColor('428CFF')
				.setDescription(
					`⚠️ I can't find results about \`${search}\``
				);
			return message.channel.send(embed);
		}

		switch (res.loadType) {
			case 'SEARCH_RESULT':
				let max = 5;
				if (res.tracks.length < max) max = res.tracks.length;

				const results = res.tracks
					.slice(0, max)
					.map((track, index) => `${++index}) [${track.title}](${track.uri})`)
					.join('\n');

				let embed = new MessageEmbed()
					.setColor(color)
					.setTitle('SELECT YOUR SONG!')
					.setDescription(results);
				const msg = await message.channel.send(embed);
				await msg.react('1️⃣');
				await msg.react('2️⃣');
				await msg.react('3️⃣');
				await msg.react('4️⃣');
				await msg.react('5️⃣');

				const filter = (reaction, user) =>
					['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].includes(reaction.emoji.name) &&
					user.id === message.author.id;
				const reactions = await msg.awaitReactions(filter, { max: 1 });
				const choice =
					reactions.get('1️⃣') ||
					reactions.get('2️⃣') ||
					reactions.get('3️⃣') ||
					reactions.get('4️⃣') ||
					reactions.get('5️⃣');

				let first;

				if (choice.emoji.name === '1️⃣') first = 1;
				if (choice.emoji.name === '2️⃣') first = 2;
				if (choice.emoji.name === '3️⃣') first = 3;
				if (choice.emoji.name === '4️⃣') first = 4;
				if (choice.emoji.name === '5️⃣') first = 5;

				const index = Number(first) - 1;
				const track = res.tracks[index];
				await player.queue.add(track);
				await msg.delete();

				if (!player.playing && !player.paused && !player.queue.length)
					player.play();
				let embed2 = new MessageEmbed()
					.setColor('GREEN')
					.setTitle('ADDED TO QUEUE')
					.setDescription(`[${track.title}](${track.uri})`);
				if (player.queue.length >= 1) message.channel.send(embed2);
				return;
		}
	}
};

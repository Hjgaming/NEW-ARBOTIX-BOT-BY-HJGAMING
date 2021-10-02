const Discord = require('discord.js');
const moment = require('moment');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
	name: 'binfo',
	category: '🤖 Information Commands',
	aliases: ['bot', 'info', 'stats'],
	description: 'Give the information of the bot',
	example: `${config.Prefix}botinfo`,

	run: async (client, message, args) => {
		let usersCount = 0;
		for (const guild of client.guilds.cache) {
			usersCount += (await guild[1].members.fetch()).size;
		}

		let Days = Math.floor(client.uptime / 86400000);
		let Hours = Math.floor(client.uptime / 3600000) % 24;
		let Minutes = Math.floor(client.uptime / 60000) % 60;
		let Seconds = Math.floor(client.uptime / 1000) % 60;
		const RemoveUseless = Duration => {
			return Duration.replace('0 Day\n', '')
				.replace('0 Hour\n', '')
				.replace('0 Minute\n', '');
		};

		const Developer = client.users.cache.get(config.Owner);

		let Uptime = await RemoveUseless(
			`${Days}${Days > 1 ? 'd' : 'd'} ${Hours}${
				Hours > 1 ? 'h' : 'h'
			} ${Minutes}${Minutes > 1 ? 'm' : 'm'} ${Seconds}${
				Seconds > 1 ? 's' : 's'
			}`
		);

		const embed = new Discord.MessageEmbed()

			.setAuthor(client.user.tag, client.user.displayAvatarURL())
			.setTitle(`Information`)
			.addField(
				`💠 Name | ID`,
				`\`\`\`${client.user.tag} | ${client.user.id}\`\`\``,
				true
			)
			.addField(
				`⚜️ Used By`,
				`\`\`\`${client.guilds.cache.size} Servers\`\`\``,
				true
			)
			.addField(
				`🚻 User Count`,
				`\`\`\`${usersCount} Users\`\`\``,
				true
			)
			.addField(
				`🔢 Channel Count`,
				`\`\`\`${client.channels.cache.size} Channels\`\`\``,
				true
			)
			.addField(
				`☢️ Made With`,
				`\`\`\`Discord.js & Node.js\`\`\``,
				true
			)

      
      
			.addField(
				`${emoji.CreationDate} Creation Date`,
				`\`\`\`${moment
					.utc(client.user.createdAt)
					.format('DD/MMM/YYYY')}\`\`\``,
				true
			)
			.addField(
				`🌑 Bot Ping`,
				`\`\`\`Latency: ${Date.now() -
					message.createdTimestamp} ms\nAPI Latency: ${Math.round(
					client.ws.ping
				)} ms\`\`\``,
				true
			)
			.addField(
				`☣️ Command Size`,
				`\`\`\`${client.commands.size} Commands\n${
					client.aliases.size
				} Aliases\`\`\``,
				true
			)
			.addField(`🔷 Prefix`, `\`\`\`a!\`\`\``, true)
			.addField(
				`✳️ Developer`,
				`\`\`\`${Developer} | ${config.Owner}\`\`\``,
				true
			)
			.addField(`🔘 Uptime`, `\`\`\`${Uptime}\`\`\``, true)
			.addField(
				`${emoji.Link} Links`,
				`[Add Me](${config.Invite}) | [Join Server](${config.Server})`
			)
			.setColor(message.guild.me.displayHexColor)
			.setTimestamp();

		message.channel.send(embed);
	}
};

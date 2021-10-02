const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'date',
	category: '⚙️ Utility Commands',
	description: 'Shows the current time.',
	aliases: ["day"],
	usage: 'time',
	run: async (client, message, args) => {
		const pEmbed = new MessageEmbed()
			.setColor('BLUE')
			.addField('Today is', `${moment(Date.now()).format('dddd, MMMM Do YYYY,')}`);
		message.channel.send(pEmbed);
	},
};
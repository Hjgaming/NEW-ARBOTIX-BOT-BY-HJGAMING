module.exports = {
  showStats: true, // Booleen | true / false
	website: {
		protocol: 'https://', // https:// or http://
		domain: 'ARBOTIX-NEW.hjgamingyt.repl.co', // website link without protocol ex. bot-website.tejas1794.repl.co
		port: 3000,
    cookieSecret: '' // Cookie secret | charaters used store client data
	},
  bot: {
    name: 'ARBOTIX BOT', // Bot Name
    token: 'BOT TOKEN', // Bot token if showing Stats
    logo: 'https://cdn.discordapp.com/attachments/890891716142444544/892427916279971890/IMG_20210928_203945.png', //Bot Logo used in embeds and favicon
    description: '1 - Emote-Manger, 2 - Moderation, 3 - Music, 4 - Info, 5 - Utilty, 6 - Suggestion', //description of your bot used in embed and website
    support: 'https://discord.gg/BZbPT2dyPk', // support server url of your bot
    invite: 'https://discord.com/api/oauth2/authorize?client_id=878929654931677195&permissions=8&scope=bot', // invite link of your bot
    botlist: 'https://top.gg/bot/878929654931677195/vote', // Voting website Ex. top.gg
    feature1: {
      main: 'HELP COMMAND', // Feature 1 Heading
      description: 'Dropdown help command with 70+ command and many more command comingsoon.' // Feature 1 Description
    },
    feature2: {
      main: 'DEV INFO', // Feature 2 Heading
      description: '1 - Bot Dev [HJ GAMING], 2 - Bot Dev [PARAS GAMING], 3 - Bot Name [ARBOTIX BOT]'
    },
      feature3: {
      main: 'Arbotix Info', // Feature 3 Heading
      description: '1 - Bot Dev [HJ GAMING], 2 - Bot Dev [PARAS GAMING], 3 - Bot Name [ARBOTIX BOT]' // Feature 1 Description
    }
  },
  img: {
    img1: 'https://media.discordapp.net/attachments/890891716142444544/892429730987511828/Screenshot_2021_0928_204632.jpg', // help cmd image of your bot ex. https://cdn.discordapp.com/attachments/868823136538333184/889852973713354823/Capture.PNG
    img2: 'https://media.discordapp.net/attachments/890891716142444544/892429731478261860/Screenshot_2021_0928_204701.jpg' // most famous command image of your bot Ex. https://cdn.discordapp.com/attachments/868823136538333184/889853204697849926/Capture.PNG
  }
  
};

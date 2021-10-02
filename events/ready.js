const { Manager } = require("erela.js");
const Spotify  = require("erela.js-spotify");
const { MessageEmbed } = require("discord.js")


module.exports = {
  name: "ready",
  async execute(client) {
    console.log(`Hi, ${client.user.username} is now online!`);
    setInterval(() => {
      const statuses = [
        `a!help |LAG FREE MUSIC`,
        `a!help |5+ FILTERS`,
        `a!help |24/7`,
        `a!help || v1.0.0`,
      ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity("a!help", { type: "LISTENING" });
    }, 60000);

const nodes = [
    
    
      {
      host: "lavalink-repl.parasop.repl.co", // Optional if Lavalink is local
      port: 443, // Optional if Lavalink is set to default
      password: "youshallnotpass", // Optional if Lavalink is set to default
      secure: true
    },
  
    ];
  const clientID = "3c772cb0fa1642159603a1c897ddbfaf"
  const clientSecret = "f1c4d9fce1d44fc4bf93145b8b3b2ed5"

  client.manager = new Manager({
    nodes,
    plugins: [ new Spotify({ clientID, clientSecret }) ],
    autoPlay: true,
    secure: false,
    send: (id, payload) => {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    }
  });
//initialize the manager
  client.manager.init(client.user.id);

  console.log(`Logged in as ${client.user.tag}`);
  
  //on node connect. NOTE: NODE HERE IS YOUR LAVALINK NODE/Server
  
  //link
  
  
  //24/7
  


  //Node error event
  client.manager.on("nodeError", (node, error) => {
      console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`);
  
  
    
  });
  
  client.on("raw", d => client.manager.updateVoiceState(d));

  //Track start
  client.manager.on("trackStart", (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);
    let min = Math.floor((track.duration/1000/60) << 0), sec = Math.floor((track.duration/1000) % 60);
    let sec2;
      if(sec < 10) {
          sec2 = `0${sec}`
      }
      else {
          sec2 = sec
      }

     let np = new MessageEmbed()
    .setColor("GREEN")
   .setTitle(` NOW PLAYING`)
    .setDescription(` 
    [${track.title}](${track.uri})[${track.requester}]
     
`)
channel.send(np).then(m => m.delete({ timeout: track.duration }));
  });
  
  client.manager.on("queueEnd", player => {
   if (player.twentyFourSeven) return;

			// When the queue has finished
			player.timeout = setTimeout(() => {
				const vcName = client.channels.cache.get(player.voiceChannel) ? client.channels.cache.get(player.voiceChannel).name : 'unknown';
				const embed = new MessageEmbed()
					.setDescription(`I left 🔉 **${vcName}** because I was inactive for too long.`);
				const channel = client.channels.cache.get(player.textChannel);
				if (channel) channel.send(embed);
				player.destroy();
			}, 180000);});
  
  
   
client.manager.on("socketClosed", (player, payload) => {
		if(payload.byRemote === true) player.destroy();
	});
	
  client.manager.on("playerMove", (player, currentChannel, newChannel) => {
	 
	
	});
      
  
  
  
  
  
  },
};
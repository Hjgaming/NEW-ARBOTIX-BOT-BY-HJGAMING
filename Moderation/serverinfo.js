const { MessageEmbed } = require("discord.js");
const { formatDate, toCapitalize } = require("../../utils/functions");
const regions = require("../../data/regions.json");

module.exports = {
  name: "serverinfo",
  description: "Get info about the server",
  category: "⚙️ Utility Commands",
  aliases: ["guild", "server"],
  run:async(bot, message) =>{
    const { guild } = message;
    const {
      name,
      memberCount,
      premiumSubscriptionCount,
      premiumTier,
      verified,
      partnered,
    } = guild;
    const roles = guild.roles.cache.size;
    const channels = guild.channels.cache.size;
    const emojis = guild.emojis.cache.size;
    const createdAt = formatDate(guild.createdAt);
    const joined = formatDate(message.member.joinedAt);
    const boosts = premiumSubscriptionCount;
    const boostLevel = premiumTier;
    const owner = (guild.owner && guild.owner.user.tag) || "error";
    const isVerified = verified
      ? "Yes, this server is verified"
      : "Nope, this server isn't verified";
    const isPartnered = partnered
      ? "Yes, this server is partnered"
      : "Nope, this server isn't partnered";
    const inviteBanner = guild.bannerURL({
      size: 2048,
      format: "png",
      dynamic: true,
    });

    const regionKey = guild.region;
    const regionData = regions.filter((region) =>
      region.keys.includes(regionKey)
    )[0];
    const region = `${regionData.flag ? regionData.flag : ""} ${toCapitalize(
      regionKey
    )}`;

    const verLevel = guild.verificationLevel;
    const mfaLevel = guild.mfaLevel;

    const embed = new MessageEmbed()
      .setTitle(name)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
      .setColor("BLUE")
      .addField("**Server Owner**", owner, true)
      .addField("**Roles Count**", roles, true)
      .addField("**Channel Count**", channels, true)
      .addField("**Emoji Count**", emojis, true)
      .addField("**Member Count**", memberCount, true)
      .addField("**Created At**", createdAt, true)
      .addField("**Joined At**", joined, true)
      .addField("**Region**", region, true)
      .addField("**Verification level**", verLevel, true)
      .addField("**MFA level**", mfaLevel, true)
      .addField("**Boosts**", boosts, true)
      .addField("**Boost Level**", boostLevel, true)
      .addField("**Verified**", isVerified, true)
      .addField("**Partnered**", isPartnered, true)
      .setImage(inviteBanner);
    message.channel.send(embed);
  },
};
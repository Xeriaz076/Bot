/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const color = require("../../config.json").color;

module.exports = {
  name: "update",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(message.author.id !== "922666000304963635") return message.reply("Ini Khusus Bang **WizzSec** Ya Dek...");
    
    const updt = message.guild.channels.cache.get("900708280547041280");

    if (!args[0]) return message.channel.send({content: `**❗ • Mention Your Update Version!**`})
    
    if (!args[1]) return message.channel.send({content: `**❗ • Tag Your Bot!!**`})
    
    if (!args[2]) return message.channel.send({content: `**❗ • Mention your BOT Update List!**`});

    const reportEmbed = new MessageEmbed()
      .setTitle(`📝 • ${message.author.username}`)
      .setDescription(`**Version:** \`\`\`${args[0]}\`\`\`\n**Bot:** ${args[1]}\n**Update List: ↓**\n\`\`\`${args.slice(2).join(" ")}\`\`\``)
      
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setColor("000000")
      .setFooter(message.channel.name)
      .setTimestamp();

    
    updt.send({ embeds: [reportEmbed], content: `**📢 • **@everyone** • 📢**`})
    let idk = new MessageEmbed()
      .setDescription(`**✅ • Successfully Sent update!**`)
      
    .setColor(color);
    
    message.channel.send({ embeds: [idk] });
  },
};

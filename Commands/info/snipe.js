const { Client, Message, MessageEmbed } = require('discord.js')
const color = require("../../config.json").color;

module.exports = {
  name: 'snipe',
  description: "Displays the last deleted message",
  run: async (client, message, args, Discord) => {
    const msg = client.snipes.get(message.channel.id)
    if (!msg) return message.reply({ content: 'There is nothing to snipe!'})
    const embed = new MessageEmbed()
    .setDescription(`Snipe **${msg.author}**\n**Message:** ${msg.content}`)
    .setColor("RANDOM")
    .setFooter(`Request by ${message.author.username}`)
    .setThumbnail(client.user.displayAvatrURL)
    .setTimestamp()
    message.delete()
    message.channel.send({ embeds: [embed] })
  
    if (msg.image) {
const embed1 = new MessageEmbed()
    .setImage(msg.image)
    .setTimestamp()
   
    message.channel.send({ embeds: [embed1] }) 
    }
  }
} 

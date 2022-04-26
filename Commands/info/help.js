const { MessageEmbed } = require("discord.js");
const client = require("../../index");

module.exports = {
  name: "help",
      aliases: ["h"],
  run: async (client, message, args) => {
  let e = new MessageEmbed()
    .setAuthor(`List Perintah Bot`, client.user.displayAvatarURL({ dynamic: true }))
    .setColor("BLUE")
    .setFields(
      { name: 'Perintah Samp', value: '`samp`,`players`' },{ name: 'Perintah Umum', value: '`list`,`dm`' },
    )
    .setFooter("Martin SA-MP");
    message.channel.send({ embeds: [e] })

message.react("🦇")    
  }
}
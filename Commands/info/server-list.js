const fetch = require("node-fetch")
const { Client, MessageEmbed, Message} = require("discord.js")
const color = require("../../config.json").color;
const moment = require("moment");

module.exports = {
    name: 'samp',
    aliases: ["samps"],
    description: 'Get info Samp',
    
    run: async (client, message, args, prefix) => {
      
      if (!args[0]) return message.channel.send(`**Contoh nya Ini Ya Dek **\`Ip\`**:**\`Port\`**!**`);
      

      const split = args.join(" ").split(":");
const ip = split[0];
const port = split[1];

       const json = await fetch(`http://anabellebot.online/API/sampquery?ip=${ip}&port=${port}`).then(r => r.json())
        if (json.response === "Something Went Wrong Please Check ip And port correcly or Please Try Again Later") return message.channel.send(`**SERVER MENGALAMI MT ATAU KENA DDOS**`)

      if (json.response.isPlayersIngame > 10) return;
      
      var pw = {
            "true": "Enable",
            "false": "Disable"
        };

      
        
        const embed = new MessageEmbed()
            .setTitle(`${json.response.hostname}`)
          .setThumbnail("https://media.discordapp.net/attachments/899281914500878346/900969660873334805/samp-logo-png-6.png")
          .addField("Gamemode", `\`\`\`${json.response.gamemode}\`\`\``)
          .addField("Server Ip And Port" , `\`\`\`${json.response.serverip}\`\`\``)
          .addField("Language", `\`\`\`${json.response.language}\`\`\``)
          .addField("Players Info", `\`\`\`${json.response.maxplayers}/${json.response.isPlayerOnline}\`\`\``)
        .addField("Map Name", `\`\`\`${json.response.rule.mapname}\`\`\``)
          .addField("Version", `\`\`\`${json.response.rule.version}\`\`\``)
       .addField("Website", `\`\`\`${json.response.rule.weburl}\`\`\``)
    .addField(`${json.response.isPlayerOnline} • Players Online`, `\`\`\`[ID] | Name | Score | Ping |\n${json.response.isPlayersIngame || "Too Many Players!"}\`\`\``)
.setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
          .setTimestamp()
            .setColor(color);
        message.channel.send({embeds: [embed]})

      
      
    }
         }
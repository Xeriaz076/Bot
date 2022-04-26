const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
 name: 'serverlist',
  aliases: ["top"],
  owner: true,
  run: async (client, message, args) => {


      let i0 = 0;
      let i1 = 20;
      let page = 1;

      let description;
   
      description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
        .map(r => r)
        .map((r, i) => `**${i + 1})** ${r.name}  \`(${r.memberCount} Members)\`
↑– \`\`\`(${r.id})\`\`\``)
          .slice(0, 20)
          .join("\n");

      let emb = new MessageEmbed()
    .setColor("GREEN")
    .setFooter(`Page ${page}/${Math.ceil(client.guilds.cache.size / 20)}`)
    .setDescription(description);

   let pages = new MessageActionRow().addComponents(
   new MessageButton()
  .setStyle("SECONDARY")
  .setEmoji("⬅️")
 .setCustomId("previous"),
   new MessageButton()
  .setStyle("SECONDARY")
  .setEmoji("➡️")
  .setCustomId("next")
   )
   
   let dis = new MessageActionRow().addComponents(
   new MessageButton()
  .setStyle("SECONDARY")
  .setEmoji("⬅️")
  .setDisabled(true)
 .setCustomId("previous"),
   new MessageButton()
  .setStyle("SECONDARY")
  .setEmoji("➡️")
  .setDisabled(true)
  .setCustomId("next")
   )  
      
  if(client.guilds.cache.size < 20) return message.channel.send({
      embeds: [emb],
      components: [dis]
  }) 
   
      let msg = await message.channel.send({
          embeds: [emb],
          components: [pages]
      });
 
    let filter = (i) => i.user.id === message.author.id;

      let collector = msg.createMessageComponentCollector({
    filter
      });

      collector.on("collect", async (i) => {
        if (i.customId === "previous") {
        i0 = i0 - 20;
        i1 = i1 - 20;
        page = page - 1;
        
    if (i1 < 9) return msg.delete();

    description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
        .map(r => r)
        .map((r, i) => `**${i + 1})** ${r.name} \`(${r.memberCount} Members)\`
↑– \`\`\`(${r.id})\`\`\``)
          .slice(i0, i1)
          .join("\n");

    emb.setFooter(`Page ${page}/${Math.round(client.guilds.cache.size / 20)}`)
    .setDescription(description);

        msg.edit({
        embeds: [emb]
            
        });
        }

        if (i.customId === "next") {

          i0 = i0 + 20;
          i1 = i1 + 20;
          page = page + 1;

          if (i1 > client.guilds.cache.size + 20) return msg.delete();   
      if (!i0 || !i1) return msg.delete();

         description = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
        .map(r => r)
        .map((r, i) => `**${i + 1})** ${r.name} \`( ${r.memberCount} Members)\`
↑– \`\`\`(${r.id})\`\`\``)
          .slice(i0, i1)
          .join("\n");


    emb.setFooter(`Page ${page}/${Math.round(client.guilds.cache.size / 20)}`)
    .setDescription(description)      
    msg.edit({
        embeds: [emb]
    })
        }
      })
  }
     }
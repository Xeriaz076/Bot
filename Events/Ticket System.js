const {
    MessageActionRow,
    MessageButton
} = require('discord.js');
const {
    MessageEmbed
} = require('discord.js')
const client = require('../index')

client.on("interactionCreate", async (interaction) => {

    await interaction.deferUpdate();
    if (interaction.isButton()) {
        if (interaction.customId === 'tic') {

          const thread = await interaction.channel.threads.create({
                name: `${interaction.user.tag}`,
                autoArchiveDuration: 1440, // this is 24hrs 60 will make it 1 hr
                //type: 'private_thread', // for private tickets u need server boosted to lvl 1 or 2 ok u need lvl 2, since mine is not boosted i will remove this LINE ONLY!
            });
            await thread.setLocked(true)
            const embed = new MessageEmbed()
                .setTitle('Ticket')
                .setDescription('Halo, \n Staff akan berada di sini sesegera mungkin sementara memberi tahu kami tentang masalah Anda!\nTerima kasih!')
                .setColor('GREEN')
                .setTimestamp()
                .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                    dynamic: true
                }));

          const del = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('del')
                    .setLabel('🗑️ Delete Ticket!')
                    .setStyle('DANGER'),
                );
            interaction.user.send('Tiket Anda telah dibuka!');
            thread.send({
                content: `Welcome <@${interaction.user.id}>`,
                embeds: [embed],
                components: [del]
            }).then(interaction.followUp({
                content: 'Created Ticket!',
                ephemeral: true
            }))
            console.log(`Created thread: ${thread.name}`);
            setTimeout(() => {
                interaction.channel.bulkDelete(1)
            }, 5000)
        } else if (interaction.customId === 'del') {

          const thread = interaction.channel
            thread.delete();

          }
    }
})
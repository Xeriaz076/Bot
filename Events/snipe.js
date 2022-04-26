const client = require('../index')

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return //To make your code more easier we will add discord to our parameters
    if (!message.content.startsWith(client.prefix)) return;
    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");
    const Discord = require('discord.js') // add this
    let command = client.commands.get(cmd)
    //make the const command to let command

    if (!command) command = client.commands.get(client.aliases.get(cmd)) // I have already added it, then add
    if (command) {
        // User Perms
        if (!message.member.permissions.has(command.UserPerms || [])) return message.channel.send(`You need \`${command.UserPerms || []}\` Permissions`) // Added this

        // Bot Perms
        if (!message.guild.me.permissions.has(command.BotPerms || [])) return message.channel.send(`I need \`${command.BotPerms || []}\` Permissions`)

        await command.run(client, message, args, Discord)
        }
      })
        client.snipes = new Map();
client.on('messageDelete', async function (message, channel) {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null // this is it for the regular snipe comamnd
  })
})

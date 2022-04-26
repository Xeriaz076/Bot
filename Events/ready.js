const client = require('../index.js');
const mongoose = require("mongoose");
const config = require("../config.json");
//const mongooseConnectionString = "mongodb+srv://CakkaX:cakkamongodb@cakkax.qbhp7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongooseConnectionString = "mongodb+srv://Aryan:v62DVRBsQQthGPgU@bot.nk7zs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const activities = [
  { name: "Martin SA-MP", type: 'COMPETING' }
];

/*
mongodb+srv://xstyleboy:xscakka@cluster0.85mv3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
*/

client.on('ready', () => {
  client.user.setPresence({ status: 'online', activity: activities[0] });
  let activity = 1;
  setInterval(() => {
    activities[3] = { name: `${client.config.prefix}help`, type: 'COMPETING' };
    activities[4] = { name: `${client.guilds.cache.size} Servers`, type: 'COMPETING' };
    if(activity >4) activity = 0;
    client.user.setActivity(activities[activity]);
    activity++;
  }, 5000);
    client.logger.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=', 'ready');
    client.logger.ready(`${client.user.tag}, ready to watch [${client.users.cache.size}] users in [${client.guilds.cache.size}] servers.`, 'ready');
    client.logger.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=', 'ready');
  if (!mongooseConnectionString) return;

  mongoose.connect(mongooseConnectionString).then(() => console.log('Connected to mongodb!!'));
});
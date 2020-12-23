const { Client, Collection } = require ('discord.js');
const { cpuUsage } = require('process');
const config = require ('./config/settings');

const client = new Client({
    disableMentions: 'everyone',
    disabledEvents: ['TYPING_START']
});

client.commands = new Collection();
client.aliases = new Collection();
client.limits = new Map();
client.config = config;
client.token = process.env.TOKEN;

const commands = require ('./structures/commands');
commands.run(client);

const events = require ('./structures/events');
events.run(client);

client.login(client.token);
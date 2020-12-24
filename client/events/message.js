const { MessageEmbed } = require ('discord.js');
const imgStructure = require('../images/imageStructure');
const ratetime = new Set();

const ms = require ('ms');

module.exports = (client, message) => {

    if (message.author.bot) return;

    let botPrefix = 'dmod.' // Chnageable

    const args = message.content.split(/ +/g);

    const commands = args.shift().slice(prefix.length).toLowerCase();

    const cmd = client.commands.get(commands) || client.aliases.get(commands);

    if (!message.content. toLowerCase().startsWith(prefix)) return;

    let not_a_command = new MessageEmbed()
    .setAuthor('Command Not Found!!', imgStructure.dmod_transparent)
    .setColor(imgStructure.mainColor)
    .setDescription(`${commands} is not a valid command`)
    .addField('Need Help?', `${botPrefix}help - Displays a list of Available Commands.`)
    .setTimestamp()
    .setFooter(`Executed By: ${message.author.username}`, imgStructure.dmod_transparent)

    if (!cmd) return message.channel.send(not_a_command);

    if (!message.channel.permissionsFor(message.guild.me).toArray().includes('SEND_MESSAGES')) return;

    if (cmd.limits) {

        const current_cooldown = client.limits.get(`${commands}-${message.author.id}`);

        if (!current_cooldown) client.limits.set(`${commands}-${message.author.id}`, 1);

    } else {

        if (current_cooldown >= cmd.limits.rateLimit) {

            let cooldown_timeout = ms(cmd.limits.cooldown - (Date.now() - ratetime[message.author.id + commands].times));

            let cooldown_message = new MessageEmbed()
            .setAuthor('Whoa, To fast!', imgStructure.dmod_transparent)
            .setColor(imgStructure.mainColor)
            .setDescription('You are being Rate Limited!!')
            .addField('Time Left', '``' + `${cooldown_timeout.hours}h ${cooldown_timeout.minutes}m ${cooldown_timeout.seconds}s` + '``')
            .setTimestamp()
            .setFooter(`Triggered By: ${message.author.username}`)

            return message.channel.send(cooldown_message);
        }

        client.limits.set(`${commands}-${message.author.id}`, current_cooldown + 1);

        ratetime.add(message.author.id + commands)

        ratetime[message.author.id + commands] = {

            times: Date.now()
        }
    }

    setTimeout(() => {

        client.limits.delete(`${commands}-${message.author.id}`);

        ratetime.delete(message.author.id + commands)
    }, cmd.limits.cooldown);
  }
       cmd.run(client, message, args)

       const missingPerms = (member, perms) => {
        const missingPerms = member.permissions.missing(perms)
        .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);
    
        return missingPerms.length > 1 ? 
        `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
        missingPerms[0];
    
    }
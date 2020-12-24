const { MessageEmbed } = require('discord.js');
const structures = require ('../images/imageStructure')

module.exports.run = async (client , message, args) => {

    try {

    let embed = new MessageEmbed()
      .setAuthor('dmod help', structures.dmod_transparent)
      .setColor(structures.mainColor)
      .setDescription('Here is my available commands')
      .addField('Help', '``dmod.help``', true)
      .setTimestamp()

      if (!args[0]) return message.channel.send(embed)

      if(args[0] && client.commands.has(args[0])){

          const cmd = client.commands.get(args[0]);

          let cmdname = cmd.help.name.charAt(0).toUpperCase() + cmd.help.name.slice(1)

          let aliases = "No aliases for that command"

          if(cmd.help.aliases.length === 0){

              aliases = "No aliases for that command"

          }else{

              aliases = cmd.help.aliases.join("\n")

          }

          let embed2 = new MessageEmbed()
          .setAuthor(`${cmdname} command info`, structures.dmod_transparent)
          .setColor(structures.mainColor)
          .addField('Prefix', '``dmod.``', true)
          .addField('Category', `${cmd.help.category}`)
          .addField('Name', `${cmd.help.name}`, true)
          .addField('Description', `${cmd.help.description}`, true)
          .addField('Usage', `${cmd.help.example}`, true)
          .addField('Aliases', `${aliases}`, true)
          .setTimestamp()
          .setFooter(`Syntax: <> = Required | [] = Optional`, structures.dmod_transparent)

          return message.channel.send(embed2);

      } else {

        message.channel.send('You did not select a valid option');
      }


    } catch (e) {
        let error = new MessageEmbed()
        .setTitle('Whoops, Something went wrong!!!')
        .setColor(structures.mainColor)
        .setDescription("If this issue continues please contact our Dev Team")
        .addField("Error", `${e.message}`)
        .setTimestamp()

    return message.channel.send(error);
    }
}


module.exports.help = {
    name: "help",
    category: "info",
    aliases: ['helpme', 'h'],
    description: "Send you a list of all commands!",
    example: "``help``\n``help <command_name>``"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["EMBED_LINKS"],
    ownerOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

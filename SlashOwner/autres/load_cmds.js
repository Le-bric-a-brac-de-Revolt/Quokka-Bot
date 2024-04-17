const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder, 
  AttachmentBuilder, 
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder , 
  TextInputComponent,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  PermissionsBitField,
  Colors,
} = require("discord.js");

const fs = require('fs');


module.exports = {
   name: "load_cmds",
   usage: "txt <text>",
   cooldownsUser: 5000, 
   description: "Liste de tout les serveurs du bot.",
   toggleOff: false,
   commanddev: false,
   developersOnly: false,

   default_member_permissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel ],
   botpermissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel ],
   type: ApplicationCommandType.ChatInput,

   status_command: `🟢`,

   options: [],


   run: async (client, interaction, args) => {

    try{

		if (!interaction.member.roles.cache.has(`1048895513883312198`)){
			return;
		}

		// let x = require(`../../SlashCommands/utilitaires`)

		fs.readdirSync('./SlashCommands/utilitaires').forEach(async (dir) => {
      const commands = fs.readdirSync(`./SlashCommands/utilitaires/${dir}`)//.filter(file => file.endsWith('.js'));
    //r (let file of commands) {

    console.log(commands)
        let pull = require(`../../SlashCommands/utilitaires/${file}`);
        console.log(pull.name, pull);
        // CMDS_OWNER.push(pull);
    // }
  
  });
  
  } catch (err) {
    const files = require(`../../Functions/erreur_cmds.js`);
        files.err_cmds(client, interaction, err)
 }


  }
}

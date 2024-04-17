const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  PermissionsBitField
} = require("discord.js");

module.exports = {
  name: "help",
  name_localizations: {
		"fr": 'aide'
	},
  type: ApplicationCommandType.ChatInput,
  options: [
    {
       name: 'version',
       description: 'Version adaptée pour votre appareil.',
       type: ApplicationCommandOptionType.String, 
       required: false, 
       choices: [ 
          { name: "📱 - Téléphone.",value: "tel" },
          { name: "💻 - Ordinateur.", value: "PC"},
        ]
   },
 ],
      status_command: `🟢`,
      cooldownsUser: 15000, 
      default_member_permissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel],
      botpermissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel],
  toggleOff: false,
  description: "Menu d'aide du bot.",
  run: async (client, interaction) => {

try {

  const I_bot_maj = require('../../interactions_multiples/Buttons_Maj_Bot/bot_help_panel.js');
  return I_bot_maj.bot_help (client, interaction,)

} catch (err) { 

  const files = require(`../../Functions/erreur_cmds.js`);
  files.err_cmds(client, interaction, err)

}

  },
};

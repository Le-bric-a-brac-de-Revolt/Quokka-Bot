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

const { color_bot_hex, invite_bot, linksupport, appDirectoryBotLink } = require("../../botconfig/main.json");

module.exports = {
        name: "bot",
        name_localizations: {
          "fr": "robot"
        },
        description: "Vous donne tout types d'informations sur le bot.",
        cooldownsUser: 15000, 
        dm_permission: true,
        default_member_permissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel],
        botpermissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel],
        type: ApplicationCommandType.ChatInput,

        options: [

          {
            name: 'informations', type: ApplicationCommandOptionType.Subcommand, description: 'Vous donne des informations concernant le bot.', options:
                [],   
          },

          {
            name: 'liens', type: ApplicationCommandOptionType.Subcommand, description: 'Vous donne les liens utiles du bot.', options:
                [],   
          },

          {
            name: 'crédit-et-remerciements', type: ApplicationCommandOptionType.Subcommand, description: 'Crédit et remerciements du bot.', options:
                [],   
          },
        ],

        status_command: `🟢`,


        run: async (client, interaction, args) => {


          const command = interaction.options._subcommand;
          await interaction.deferReply()

          try {


if(command == `informations`){
        const I_bot_maj = require('../../interactions_multiples/Buttons_Maj_Bot/Bot_infos_panel.js');
       return I_bot_maj.maj_bot_info(client, interaction,)
}

if(command == `crédit-et-remerciements`){ 

  const EmbedBotCredit = new EmbedBuilder()
     .setTitle(`🎓 - Crédit et Remerciements de ${client.user.username}`)
       .setDescription(`> **Un grand merci à tous ceux qui travaillent sur ce projet. Ce n'est pas simplement un projet destiné à échouer une fois de plus, mais plutôt un projet qui prospérera grâce à la motivation de chacun. Merci à tous !**`
                      + `\n\n\n> *Icônes : certaines icônes utilisées sur le bot sont fournies par [icones8](https://icones8.fr/) et sont soumises à la licence Creative Commons Attribution-NoDerivs 3.0 Unported. Le lien vers la licence est disponible [ici](https://icones8.fr/license) ou [ici](https://creativecommons.org/licenses/by-nd/3.0/).*`)
     .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: false, size: 1024}))
     .setImage("https://cdn.discordapp.com/attachments/1096553055119491163/1096744936772223038/Frame_9_15.png")               
     .setColor(color_bot_hex)
     .setTimestamp();

    return interaction.editReply({ embeds : [EmbedBotCredit], ephemeral: false, }).catch(()=>{})
}


if(command == `liens`){

        const row = new ActionRowBuilder()
        .addComponents(
               new ButtonBuilder()
               .setLabel(`Répertoire d\'application de ${client.user.username}`)
               .setStyle(ButtonStyle.Link)
               .setURL(appDirectoryBotLink),
        )
      
      let link_topgg = `https://top.gg/bot/1035925300544016535`
      let link_discordbotgg = `https://discord.bots.gg/bots/1035925300544016535`
        let invite = new EmbedBuilder()
        .setTitle(`📌 - Liens utiles de ${client.user.username} !`)
        .setColor(color_bot_hex)
        .setTimestamp()
        .setImage("https://media.discordapp.net/attachments/1096552238819848345/1096749749555703919/Frame_9_32.png")
        .setDescription(`> [🦊 - Serveur support](${linksupport})`
                     + `\n> [🤖 - Ajouter le Bot](${invite_bot})`
                     + `\n> [🗃️ - Répertoire d'application](${appDirectoryBotLink})`
                     + `\n> [📡 - Top.gg](${link_topgg})`
                     + `\n> [📡 - Discord Bots.gg](${link_discordbotgg})`
                    + `\n> [😺 - gitHub](https://github.com/Fox-y-Production/Foxy-collaboratif)`);
      
       return interaction.editReply({ embeds: [invite], components: [row], ephemeral: false,}).catch(()=>{})
}

        } catch (err) {
          const files = require(`../../Functions/erreur_cmds.js`);
              files.err_cmds(client, interaction, err)
       }


    }
}

//// By
/////// Revolt
////////////// Owner Project 
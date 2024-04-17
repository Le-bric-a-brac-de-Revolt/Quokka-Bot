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

const { color_bot_hex } = require("../../botconfig/main.json")

module.exports = {
  name: "kick",
  name_localizations: {
    "fr": 'expulser',
  	},
  description: "Expulser un membre.",
  cooldownsServeur: 15000, 
  toggleOff: false,
  commanddev: false,
  developersOnly: false,
  dm_permission: false,
  default_member_permissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.KickMembers ],
  botpermissions:  [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.KickMembers],
  options: [
      {
              name: "utilisateur",
              description: "Quel utilisateur souhaites-tu expulser ? ",
              type: ApplicationCommandOptionType.User,
              required: true,
       }, 
      {
          name: "raison",
          description: "La raison de l'expulsion.",
          type: ApplicationCommandOptionType.String,
          required: false,
          max_length: 1000,
      }
  ],

  status_command: `🟢`,

run: async (client, interaction, args) => {
      try {

        let member = interaction.options.getMember(`utilisateur`)

        let raison = interaction.options.getString(`raison`)
        if(!raison) raison = "Pas de raison fournie.";

        if(interaction.user.id === member?.user.id){
           return interaction.reply({embeds: [new EmbedBuilder()
                                          .setTitle(`:x: - Tu ne peux pas t'expulser toi même !`)
                                          .setColor(`Red`)], ephemeral: true})
           }

        if((await interaction.guild.fetchOwner().id === interaction.user.id)){
         return interaction.reply({embeds: [new EmbedBuilder()
                                        .setTitle(`:x: - Tu ne peux pas expulser le propriétaire du serveur !`)
                                        .setColor(`Red`)], ephemeral: true})
          }
        if(!member?.kickable){
           return interaction.reply({embeds: [new EmbedBuilder()
                                          .setTitle(`:x: - Je ne peux expulser ce membre.`)
                                          .setColor(`Red`)], ephemeral: true})
           }
        if(interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0){
           return interaction.reply({embeds: [new EmbedBuilder()
              .setTitle(`:x: - Tu ne peux pas expulser cet utilisateur, car il est plus haut hiérarchiquement.`)
              .setColor(`Red`)], ephemeral: true})
          }

        try {

      let msg_user = new EmbedBuilder()
          .setTitle(`📤 - Tu a été expulser !`)
          .addFields([
              { name: `Serveur:`, value: `> ${interaction.guild.name || `:x:`}`},
              { name: `Modérateur:`, value: `> [${interaction.user.tag || `:x:`}](https://discord.com/users/${interaction.user.id}), ${interaction.user}`},
              { name: `Raison:`, value: `>>> ${raison || `:x:`}`}
          ])
          .setColor( color_bot_hex || `Red`)
          .setTimestamp();

          await member.send({ embeds: [msg_user]}).catch(()=> {return;})
          await member.kick({reason: `${raison} | Expulser par ${interaction.user.tag}`})

          let msg_modo = new EmbedBuilder()
          .setTitle(`📤 - Un utilisateur a été expulser !`)
          .addFields([
              { name: `Utilisateur:`, value: `> [${member.user.tag || `:x:`}](https://discord.com/users/${member.id}), ${member}`},
              { name: `Modérateur:`, value: `> [${interaction.user.tag || `:x:`}](https://discord.com/users/${interaction.user.id}), ${interaction.user}`},
              { name: `Raison:`, value: `>>> ${raison || `:x:`}`}
          ])
          .setColor( color_bot_hex || `Red`)
          .setTimestamp();
          await interaction.reply({ embeds: [msg_modo]}).catch(()=> {return;})

      } catch (err) {
          let msg_err = new EmbedBuilder()
          .setTitle(`:x: - Une erreur s'est produite lors de l'expulsion de l'utilisateur.`)
          .setDescription(`**Erreur**\n\n> \`${err || `:x:`}\``)
          .setColor(`Red`)
          .setTimestamp();
          await interaction.reply({ embeds: [msg_err], ephemeral: true}).catch(()=> {return;})
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
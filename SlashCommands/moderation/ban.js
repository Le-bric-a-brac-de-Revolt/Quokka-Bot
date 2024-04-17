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
  name: "ban",
  name_localizations: {
    "fr": "bannir"
  },
  description: "Bannir un membre.",
  cooldownsServeur: 15000, 
  toggleOff: false,
  commanddev: false,
  developersOnly: false,
  dm_permission: false,
  default_member_permissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.BanMembers ],
  botpermissions:  [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.BanMembers],
  options: [
      {
              name: "utilisateur",
              description: "Quel utilisateur souhaitez - vous bannir ?",
              type: ApplicationCommandOptionType.User,
              required: true,
       }, 
      {
          name: "raison",
          description: "Raison du bannissement.",
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
                                          .setTitle(`:x: - Vous ne pouvez pas bannir vous même !`)
                                          .setColor(`Red`)], ephemeral: true})
           }

        if((await interaction.guild.fetchOwner().id === interaction.user.id)){
         return interaction.reply({embeds: [new EmbedBuilder()
                                        .setTitle(`:x: - Vous ne pouvez pas bannir le propriétaire du serveur !`)
                                        .setColor(`Red`)], ephemeral: true})
          }
        if(!member?.bannable){
           return interaction.reply({embeds: [new EmbedBuilder()
                                          .setTitle(`:x: - Je ne peux bannir ce membre.`)
                                          .setColor(`Red`)], ephemeral: true})
           }
        if(interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0){
           return interaction.reply({embeds: [new EmbedBuilder()
              .setTitle(`:x: - Vous ne pouvez pas bannir cet utilisateur, car il est plus haut hiérarchiquement.`)
              .setColor(`Red`)], ephemeral: true})
          }


        try {

      let msg_user = new EmbedBuilder()
          .setTitle(`🔨 - Tu as été banni !`)
          .addFields([
              { name: `Serveur :`, value: `> ${interaction.guild.name || `:x:`}`},
              { name: `Modérateur :`, value: `> [${interaction.user.tag || `:x:`}](https://discord.com/users/${interaction.user.id}), ${interaction.user}`},
              { name: `Raison :`, value: `>>> ${raison || `:x:`}`}
          ])
          .setColor( color_bot_hex || `Red`)
          .setTimestamp();

          await member.send({ embeds: [msg_user]}).catch(()=> {return;})
          await member.ban({reason: `${raison} | Bannie par ${interaction.user.tag}`})


          const row = new ActionRowBuilder()
          .addComponents(
              new ButtonBuilder()
              .setLabel(`- Débannir ${member.user.tag}`)
              .setEmoji(`🔧`)
              .setCustomId(`btn_Unban/${member.id || member.user.id}`)
              .setStyle(ButtonStyle.Danger)
              )   

          let msg_modo = new EmbedBuilder()
          .setTitle(`🔨 - ${member.user.tag || `:x:`} a été banni !`)
          .addFields([
              { name: `Utilisateur :`, value: `> [${member.user.tag || `:x:`}](https://discord.com/users/${member.id}), ${member}`},
              { name: `Modérateur :`, value: `> [${interaction.user.tag || `:x:`}](https://discord.com/users/${interaction.user.id}), ${interaction.user}`},
              { name: `Raison :`, value: `>>> ${raison || `:x:`}`}
          ])
          .setColor( color_bot_hex || `Red`)
          .setTimestamp();
          await interaction.reply({ embeds: [msg_modo], components: [row]}).catch(()=> {return;})

      } catch (err) {
          let msg_err = new EmbedBuilder()
          .setTitle(`:x: - Une erreur s'est produite lors du bannissement de l'utilisateur.`)
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
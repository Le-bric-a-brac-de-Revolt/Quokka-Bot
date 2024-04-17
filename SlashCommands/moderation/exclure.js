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

const msss = require('convert-ms');

const ms = require("ms")

module.exports = {
   name: "timout",
   name_localizations: {
    "fr": "exclure"
  },
   description: `Exclure un membre temporairement.`,
   toggleOff: false,
   vipmember: false,
   cooldownsServeur: 15000, 
   dm_permission: false,
   type: ApplicationCommandType.ChatInput, 
   default_member_permissions: [ PermissionsBitField.Flags.ModerateMembers],
   botpermissions: [ PermissionsBitField.Flags.ModerateMembers ],
   status_command: `🟢`,



	options: [
      { name: "membre", description: "Sélectionnez un membre.", type: ApplicationCommandOptionType.User, required: true, },

      { name: "raison", description: "Raison de l'exclusion.", type:  ApplicationCommandOptionType.String, required: true, max_length: 100,},

      { name: "temps", description: "Temps de l'exclusion.", type: ApplicationCommandOptionType.String, required: true,     choices: [ 
       
         { name: "5 minutes",value: "300000" },
         { name: "15 minutes", value: "900000"}, 
         { name: "30 minutes", value: "1800000"}, 
         { name: "45 minutes", value: "2700000"}, 


         { name: "1 heure", value: "3600000"},
         { name: "2 heures", value: "7200000"},
       //  { name: "3 heures", value: "10800000"},
         { name: "5 heures", value: "18000000"},
         { name: "7 heures", value: "25200000"},
         { name: "10 heures", value: "36000000"},
         { name: "12 heures", value: "43200000"},
         { name: "14 heures", value: "50400000"},
         { name: "16 heures", value: "57600000"},
         { name: "18 heures", value: "64800000"},
         { name: "20 heures", value: "72000000"},
         { name: "22 heures", value: "79200000"},

         { name: "1 jour",value: "86400000" },
         { name: "2 jours", value: "172800000"}, 
         { name: "3 jours", value: "259200000"},
         { name: "4 jours", value: "345600000"},
         { name: "5 jours", value: "432000000"},
         { name: "6 jours", value: "518400000"},

         { name: "1 semaine", value: "604800016.56"},
         { name: "2 semaines", value: "1209600033.12"},
         { name: "3 semaines", value: "1814400049.68"},

         { name: "1 mois", value: "2419200066.23"},
       ]},


       

	],


  /*  { name: 'rôle', type: 'ROLE', description: 'Rôle général qui sera donné', required: true },
{ name: 'canal', type: 'CHANNEL', description: 'canal ou sera afficher l\'interaction', required: true },],*/


   run: async (client, interaction, args) => {

    try{

 let membre = interaction.options.getMember(`membre`);
 let raison = interaction.options.getString(`raison`);
 let temps = ms(interaction.options.getString(`temps`));

 if (membre.user.id == interaction.user.id){
   const role_haut = new EmbedBuilder()
   .setTitle(`:x: - Tu ne peux pas t'exclure toi même.`)
   .setColor(`Red`)
     return interaction.reply({embeds: [role_haut], ephemeral: true,});
   }


   if (membre.user.id == client.user.id){
      const role_haut = new EmbedBuilder()
      .setTitle(`:x: - Tu ne peux pas m'exclure.`)
      .setColor(`Red`)
      .setTimestamp()
        return interaction.reply({embeds: [role_haut], ephemeral: true,});
      }

      if (membre?.user.bot){
         const role_haut = new EmbedBuilder()
         .setTitle(`:x: - Tu ne peux pas exclure un bot.`)
         .setColor(`Red`)
         .setTimestamp()
           return interaction.reply({embeds: [role_haut], ephemeral: true,});
         }

 if (interaction.guild.members.me.roles.highest.comparePositionTo(membre.roles.highest) <= 0){
   const role_haut = new EmbedBuilder()
   .setTitle(`:x: - Il semblerait que le rôle de \`${membre.user.username}\` soient plus haut que mon rôle !`)
   .setDescription(`> :bulb: - Je ne peux pas exclure un membre plus haut que moi.`)
   .setColor(`Red`)
   .setTimestamp()
     return interaction.reply({embeds: [role_haut], ephemeral: true,});
   }


   if (interaction.member.roles.highest.comparePositionTo(membre.roles.highest) <= 0){
      const role_haut = new EmbedBuilder()
      .setTitle(`:x: - Il semblerait que ton premier rôle soient plus bas ou égale du premier rôle de \`${membre.user.username}\` !`)
      .setDescription(`> :bulb: - Je ne peux pas exclure un membre plus haut que toi.`)
      .setColor(`Red`)
      .setTimestamp()
        return interaction.reply({embeds: [role_haut], ephemeral: true,});
      }


      try {

   await membre.timeout(temps, raison)

   const row = new ActionRowBuilder()
   .addComponents(
       new ButtonBuilder()
       .setLabel(`- Inclure ${membre.user.tag}.`)
       .setEmoji(`📥`)
       .setCustomId(`btn_Inclure/${membre.id || membre.user.id}`)
       .setStyle(ButtonStyle.Danger)
       ) 

   const membre_exclut = new EmbedBuilder()
   .setTitle(`💥 - Tu as été exclu(e) !`)
   .setDescription(`> ⌛ - Tu as été exclu pendant **${msss.toMinutes(temps)}.**`
                    + `\n> - **Raison:** ${raison}`
                    + `\n> - **Modérateur/trice:** ${interaction.user.tag}`
                    + `\n> - **Serveur:** ${interaction.guild.name}`)
   .setColor(`Red`)
   .setTimestamp()
      membre.user.send({embeds: [membre_exclut]}).catch(()=> {return})


    const bien_passer = new EmbedBuilder()
    .setTitle(`✅ - Le membre \`${membre.user.username}\` a été exclu !`)
    .setDescription(`> ⌛ - \`${membre.user.username}\` a été exclu pendant **${msss.toMinutes(temps)}.**`
                     + `\n> 🔶 - **Raison :** ${raison}`)
    .setColor(`Red`)
    .setTimestamp()
      return interaction.reply({embeds: [bien_passer], components: [row]});


      } catch (err) {

         const role_haut = new EmbedBuilder()
         .setTitle(`:x: - Il semblerait que je n'aie pas pu exclure \`${membre.user.username}\` !`)
         .setDescription(`> :bulb: - Sûrement un problème de permission, aller jeter un coup d'œil !`)
         .setColor(`Red`)
           return interaction.reply({embeds: [role_haut], ephemeral: true,});

      }

    } catch (err) {
      const files = require(`../../Functions/erreur_cmds.js`);
          files.err_cmds(client, interaction, err)
   }

   
}
};

//// By
/////// Revolt
////////////// Owner Project 
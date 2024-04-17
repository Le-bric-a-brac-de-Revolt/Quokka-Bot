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

const { color_bot_hex } = require("../../botconfig/main.json");


module.exports = {
   name: "clear",
   name_localizations: {
    "fr": 'nettoyage',
  	},
   description: "Nettoyer vos canaux avec la suppression de masse.",
   type: ApplicationCommandType.ChatInput,
   cooldownsServeur: 10000,
   developersOnly: false,
   toggleOff: false,
   dm_permission: false,

   default_member_permissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel
                      | PermissionsBitField.Flags.ManageChannels | PermissionsBitField.Flags.ManageMessages ],
   botpermissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel
                      | PermissionsBitField.Flags.ManageChannels | PermissionsBitField.Flags.ManageMessages ],

   options: [
                {
                    name: "nombre",
                    description: "Nombre de messages à supprimer.",
                    type: ApplicationCommandOptionType.Number,
                    required: true,
                    max_length: 3,
                    max_value: 100
                },
],

status_command: `🟢`,


   run: async (client, interaction, args) => {

    const command = interaction.options._subcommand;

    function getImageEasterEggLink() {
     // Générer un nombre aléatoire entre 0 et 1
     const randomValue = Math.random();
   
     // Si le nombre aléatoire est inférieur à 1/150, renvoyer le lien, sinon renvoyer "undefined"
     if (randomValue < 1 / 150) {
       return "https://cdn.discordapp.com/attachments/978342867594518529/1166363941795004507/nettoyageYumpus.png";
     } else {
        return null;
     }
   }
   
   // Utilisation de la fonction
   const EasterEggLinkImage = getImageEasterEggLink();
   
try{   
   try {

     const target = interaction.options.getNumber("nombre");
if (!isNaN(target)) {
 let amount = 1;
 if (target === '1' || target === '0') {
   amount = 1;
 } else {
   amount = target;
   if (amount > 99) {
     amount = 99;
   }
 }
 await interaction.channel.bulkDelete(amount, true).then((_message) => {
  const embed1 = new EmbedBuilder()
         .setColor(color_bot_hex)
           .setTitle(`:broom: - Ternimé`)
             .setDescription(`:broom: - J'ai effacé \`${_message.size}\` messages !\n> 📜 - Je ne peux effacer les messages de plus de 15 jours, et les messages système.`)
               .setImage(EasterEggLinkImage)
        return interaction.reply({ embeds : [embed1], ephemeral: true,})
     .catch(()=> {return})
 })
} else {

const embed2 = new EmbedBuilder()
         .setColor("Red")
           .setTitle(`:broom: - Ternimé`)
             .setDescription('Entrez le nombre de messages que vous souhaitez effacer !\n> 📜 - Je ne peux effacer les messages de plus de 15 jours, et les messages système.')
        return interaction.reply({ embeds : [embed2], ephemeral: true,}).then((sent) => {
         setTimeout(function () {
           sent.delete().catch(()=> {return})
         }, 4500).catch(()=> {return})
      }).catch(()=> {return})
     }

   } catch (err) {

     const embed1 = new EmbedBuilder()
         .setColor(color_bot_hex)
           .setTitle(`:broom: - Ternimé`)
             .setDescription(`> J'ai effacé \`${_message.size}\` messages !\n> 📜 - Je ne peux effacer les messages de plus de 15 jours, et les messages système.`)
               .setImage(EasterEggLinkImage)
        return interaction.reply({ embeds : [embed1], ephemeral: true,})

   }

    
  } catch (err) {
    interaction.reply({ content : `Erreur : \n\n` + err, embeds : [Erreurproduite], ephemeral: true,}).catch(()=> {return})
    
    } finally { 
       return;
    }
    }}


//// By
/////// Revolt
////////////// Owner Project 
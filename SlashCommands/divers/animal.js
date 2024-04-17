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

module.exports = {
    default_member_permissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel],
    botpermissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel],
    name: "animal",
    description: "Génère des images d'animaux.",
    cooldownsServeur: 5000, 
    developersOnly: false,
    toggleOff: false,
    dm_permission: true,
   commande_beta_test: false,
    type: ApplicationCommandType.ChatInput,
    status_command: `🟢`,

    options: [

        {
            name: 'quadrupèdes', type: ApplicationCommandOptionType.Subcommand, description: 'Animal quadrupèdes.', options:
                [
                { name: 'animal', description: 'sélectionne l\'animal.', type: ApplicationCommandOptionType.String, required: true,     
                    choices: [ 
                       { name: "🦊 - Renard", value: "fox"},
                       { name: "😺 - Chat", value: "cat"},
                       { name: "🐶 - Chien", value: "dog"},
                       { name: "🦒 - Girafe", value: "giraffe"},
                       { name: "🐹 - Hamster", value: "hamster"},
                       { name: "🦘 - Kangourou", value: "kangaroo"},
                       { name: "🐆 - Léopard", value: "leopard"}, // 10
                       { name: "🦎 - Lézard", value: "lezard"},
                       { name: "🦁 - Lion", value: "lion"},
                       { name: "🐺 - Loup", value: "wolf"},
                   ]},
               ],   
        },

        {
     name: 'bipède', type: ApplicationCommandOptionType.Subcommand, description: 'Animal Bipède.', options:
       [
       { name: 'animal', description: 'sélectionne l\'animal.', type: ApplicationCommandOptionType.String, required: true,     
       choices: [ 
          { name: "🦚 - Paon", value: "paon"},
          { name: "🐿️ - Quokka", value: "quokka"},
          { name: "🐒 - Singe", value: "singes"},
      ]},
    ]
    },

  /* {
    name: 'marin', type: ApplicationCommandOptionType.Subcommand, description: 'Animal Marin.', options:
    [
       { name: 'animal', description: 'sélectionne l\'animal.', type: ApplicationCommandOptionType.String, required: true,     
       choices: [ 
      ]},

    ]
},*/

    ],

    run: async (client, interaction, args) => {

  //  const command = interaction.options._subcommand;
    let animal = interaction.options.getString(`animal`)
    await interaction.deferReply()

try {

        const files = require(`../../interactions_multiples/animals/animals.js`);
        files.animalsFile(client, interaction, animal)

} catch (err){
    const files = require(`../../Functions/erreur_cmds.js`);
  files.err_cmds(client, interaction, err)
}

} }


//// By
/////// Revolt
////////////// Owner Project 
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField, } = require("discord.js");
const { color_bot_hex } = require("../../botconfig/main.json");
const { bitfieldToArray } = require(`../../Functions/ListeFrPermissions.js`)

  module.exports = {
    name: "set-autorole",
    name_localizations: {
      "fr": "set-interaction-rôle"
    },
    cooldownsServeur: 30000, 
    toggleOff: false,
    description: "Créé un panel rôles, pour que les membres choisissent les rôles qu'ils veulent.",
    default_member_permissions: [ PermissionsBitField.Flags.Administrator ],
    botpermissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel |
                      PermissionsBitField.Flags.ManageRoles ],
    type: ApplicationCommandType.ChatInput,

 options: [

  { name: "titre", description: "Titre de l'embed", type: ApplicationCommandOptionType.String, required: true, max_length: 200 },

  {
    name: "bouton-type",
    description: "Sélectionnez un type de bouton.",
    type: ApplicationCommandOptionType.String,
    required: true,
    choices: [ 
      { name: "Bouton violet",value: "Primary" },
      { name: "Bouton gris", value: "Secondary"},
      { name: "Bouton vert", value: "Success"},
      { name: "Bouton rouge", value: "Danger"},
    ]

  },

  { name: 'rôle-1', description: 'Rôle qui sera dans le panel, pour choisir un rôle.', type:  ApplicationCommandOptionType.Role,  required: true, },
  { name: 'rôle-2', description: 'Rôle qui sera dans le panel, pour choisir un rôle.', type:  ApplicationCommandOptionType.Role,  required: false, },
  { name: 'rôle-3', description: 'Rôle qui sera dans le panel, pour choisir un rôle.', type:  ApplicationCommandOptionType.Role,  required: false, },
  { name: 'rôle-4', description: 'Rôle qui sera dans le panel, pour choisir un rôle.', type:  ApplicationCommandOptionType.Role,  required: false, },
  { name: 'rôle-5', description: 'Rôle qui sera dans le panel, pour choisir un rôle.', type:  ApplicationCommandOptionType.Role,  required: false, },
  { name: 'rôle-6', description: 'Rôle qui sera dans le panel, pour choisir un rôle.', type:  ApplicationCommandOptionType.Role,  required: false, },
  { name: 'rôle-7', description: 'Rôle qui sera dans le panel, pour choisir un rôle.', type:  ApplicationCommandOptionType.Role,  required: false, },
  { name: 'rôle-8', description: 'Rôle qui sera dans le panel, pour choisir un rôle.', type:  ApplicationCommandOptionType.Role,  required: false, },
  { name: 'rôle-9', description: 'Rôle qui sera dans le panel, pour choisir un rôle.', type:  ApplicationCommandOptionType.Role,  required: false, },
  { name: 'rôle-10', description: 'Rôle qui sera dans le panel, pour choisir un rôle.', type: ApplicationCommandOptionType.Role,  required: false, },
  { name: "description", description: "Description de l'embed || 400 caractères max.",
   type: ApplicationCommandOptionType.String, required: false, max_length: 400 },
  { name: "image", description: "Url d'une image à afficher.", type: ApplicationCommandOptionType.String, required: false,},
  { name: "couleur", description: "Couleur de l'embed || HexColor (#ff914d)",
                   type: ApplicationCommandOptionType.String, required: false,
                   max_length: 7 },
  { name: "modifier", description: "Lien du message de Fox'y à modifier.", type: ApplicationCommandOptionType.String, required: false,},        

  {
    name: "permission-requise",
    description: "Permission requise pour attribuer le(s) rôle(s) sélectionné(s).",
    type: ApplicationCommandOptionType.String,
    required: false,
    choices: [ 
      { name: "Administrateur", value: `${PermissionsBitField.Flags.Administrator.toString()}` },
      { name: "Expulser des membres", value: `${PermissionsBitField.Flags.KickMembers.toString()}` },
      { name: "Exclure des membres", value: `${PermissionsBitField.Flags.BanMembers.toString()}` },
    
      { name: "Gérer le serveur", value: `${PermissionsBitField.Flags.ManageGuild.toString()}` },
      { name: "Gérer les canaux", value: `${PermissionsBitField.Flags.ManageChannels.toString()}` },
      { name: "Gérer les surnoms", value: `${PermissionsBitField.Flags.ManageNicknames.toString()}` },
      { name: "Gérer les rôles", value: `${PermissionsBitField.Flags.ManageRoles.toString()}` },
      { name: "Gérer les fils", value: `${PermissionsBitField.Flags.ManageThreads.toString()}` },
      { name: "Gérer les emojis/autocollants", value: `${PermissionsBitField.Flags.ManageEmojisAndStickers.toString()}` },
      { name: "Gérer les événements", value: `${PermissionsBitField.Flags.ManageEvents.toString()}` },
      { name: "Gérer les messages", value: `${PermissionsBitField.Flags.ManageMessages.toString()}` },

      { name: "Ajouter des réactions", value: `${PermissionsBitField.Flags.AddReactions.toString()}` },
      { name: "Voir les logs", value: `${PermissionsBitField.Flags.ViewAuditLog.toString()}` },
      { name: "Joindre des fichiers", value: `${PermissionsBitField.Flags.AttachFiles.toString()}` },
      { name: "Intégrer des liens", value: `${PermissionsBitField.Flags.EmbedLinks.toString()}` },
      { name: "Mentionner everyone et tous les autres rôles", value: `${PermissionsBitField.Flags.MentionEveryone.toString()}` },
    
      { name: "Utiliser des emojis externes", value: `${PermissionsBitField.Flags.UseExternalEmojis.toString()}` },
      { name: "Utiliser des autocollants externes", value: `${PermissionsBitField.Flags.UseExternalStickers.toString()}` },
      { name: "Utiliser les commandes oblique", value: `${PermissionsBitField.Flags.UseApplicationCommands.toString()}` },
      { name: "Modifier le surnom", value: `${PermissionsBitField.Flags.ChangeNickname.toString()}` },
    
      { name: "Se connecter à un canal vocal", value: `${PermissionsBitField.Flags.Connect.toString()}` },
      { name: "Streamer", value: `${PermissionsBitField.Flags.Stream.toString()}` },
      { name: "Muter des membres", value: `${PermissionsBitField.Flags.MuteMembers.toString()}` },
      { name: "Déplacer des membres", value: `${PermissionsBitField.Flags.MoveMembers.toString()}` },
    ]
  },

  { name: 'rôle-requis', description: 'Sélectionnez un rôle requis pour attribuer le(s) rôle(s) sélectionné(s).', type: ApplicationCommandOptionType.Role,  required: false, },


 ], 

 status_command: `🟢`,

    run: async (client, interaction) => {

      try {

  var bouton_type = interaction.options.getString("bouton-type")
  let titre = interaction.options.getString('titre')
  let descipt = interaction.options.getString('description')
  let ColorHex = interaction.options.getString('couleur')
  let img = interaction.options.getString('image')
  let PermRequise = interaction.options.getString('permission-requise') || `0`;
  let RoleRequis = interaction.options.getRole('rôle-requis') || `0`;

  const roleIds = [];

  for (let i = 1; i <= 10; i++) {
    const roleOption = interaction.options.getRole(`rôle-${i}`);
    if (roleOption) {
      roleIds.push(roleOption.id);
    }
  }
  
  const foxysRole = interaction.guild.members.me.roles.highest;
  const validRoles = interaction.guild.roles.cache.filter((role) => {
    const isHigher = role.comparePositionTo(foxysRole) > 0;
    const isManaged = role.managed;
    return roleIds.includes(role.id) && !isHigher && !isManaged;
  });
  
    const validRolesArrayDescription = Array.from(validRoles.values())
    .slice(0, 10)
    .map((role, index) => `> ${index + 1}️⃣ - ${role}`)
    .join('\n');

 // Afficher les résultats dans le message de réponse
 let validRolesString = '';
 let invalidRolesString = '';
 const validRolesArray = Array.from(validRoles.values());
 const invalidRoles = roleIds
   .map((id) => interaction.guild.roles.cache.get(id))
   .filter((role) => !validRolesArray.includes(role));
 if (validRolesArray.length === 1) {
   validRolesString = `**Le rôle suivant a été configuré avec succès :**\n> - <@&${validRolesArray[0].id}>`;
 } else if (validRolesArray.length > 1) {
   validRolesString = `**Les rôles suivants ont été configurés avec succès :**\n${validRolesArray.map(role => `> - <@&${role.id}>`).join('\n')}`;
 }
 if (invalidRoles.length === 1) {
   const role = invalidRoles[0];
   invalidRolesString = `**Le rôle suivant n'a pas pu être configuré :**\n> - <@&${role.id}> ${role.managed ? 'est géré par une autre application.' : 'est plus haut que le rôle Fox\'y.'}`;
 } else if (invalidRoles.length > 1) {
   invalidRolesString = '**Les rôles suivants n\'ont pas pu être configurés :**\n' + invalidRoles.map(role => `> - <@&${role.id}> ${role.managed ? 'est géré par une autre application.' : 'est plus haut que le rôle Fox\'y.'}`).join('\n');
 }


let embed_en_cours = new EmbedBuilder()
  .setTitle(`${validRoles.size > 0 ? '✅ - Configuré avec succès' : ':x: - Échec de la configuration'} !`)
  .setDescription(`${validRolesString}\n\n${invalidRolesString}`
    + `\n\n> ${validRoles.size > 0 ? `:bulb: -  Il sera envoyé sous peu. S'il ne s'envoie pas, veuillez vérifier les permissions.`
                                    : ':bulb: -  Votre message ne sera pas envoyer car il n\'y a aucun rôle valide.'} !`)
  .setColor(`${validRoles.size > 0 ? 'Green' : 'Red'}`)

 if(PermRequise != `0` && !validRoles.size == 0){
  let PermiFr = bitfieldToArray(PermRequise);
    embed_en_cours.addFields(
      {name: `Permission requise :`, value : `> Il faudra la permissions **${PermiFr}**, pour interagir avec le(s) bouton(s).`}
      )
 } 

 if(RoleRequis != `0` && !validRoles.size == 0){
    embed_en_cours.addFields(
      {name: `Rôle requis :`, value : `> Il faudra le rôle **<@&${RoleRequis}>**, pour interagir avec le(s) bouton(s).`}
      )
 } 

let Couleur_verifier = ColorHex?.match(/^(#|0x)?(?:[0-9a-fA-F]){3,6}$/) ? ColorHex : color_bot_hex;

if (validRoles.size == 0) {
  await interaction.reply({ embeds: [embed_en_cours], ephemeral: true });
  return;
} else {
  await interaction.reply({ embeds: [embed_en_cours], ephemeral: true });
}

// Envoyer le message de sélection de rôles
let embed_rôles_react = new EmbedBuilder()
.setTitle(`${titre||`:x:`}`)
.setDescription(`${descipt || ''}\n\n${validRolesArrayDescription}`)
.setColor(Couleur_verifier || color_bot_hex)
.setFooter({ text: `Choisissez le(s) rôle(s) que vous souhaitez en utilisant les boutons ci-dessous.`, 
             iconURL: client.user.displayAvatarURL({ format: 'png', dynamic: false, size: 1024 }) });


    let LinkImage = '';
    const Url_Valide = (UrlTest, http_fac) => {
      const regexp = new RegExp(`^((http|https)://)?(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|/|=|?)?]+)+$`, 'i');
      return regexp.test(UrlTest);
    };

    LinkImage = (img && Url_Valide(img)) ? img : '0';
    if (LinkImage != `0`){
      embed_rôles_react.setImage(img)
    }


const rows = []; // tableau pour stocker les rangées de boutons
let currentRow = new ActionRowBuilder(); // crée la première rangée

for (let i = 0; i < validRolesArray.length; i++) {
 const emoji = i === 9 ? '🔟' : `${i + 1}️⃣`;
 const buttonId = `autorôle_${validRolesArray[i].id}_${PermRequise}_${RoleRequis.id || "0"}`;
 const buttonCreate = new ButtonBuilder()
      .setCustomId(buttonId)
      .setEmoji(emoji)
      .setStyle(ButtonStyle[bouton_type]);

    currentRow.addComponents(buttonCreate); // ajoute le bouton à la rangée actuelle

    if (currentRow.components.length === 5) { // si la rangée est pleine, ajoute-la au tableau de rangées et crée une nouvelle rangée
      rows.push(currentRow);
      currentRow = new ActionRowBuilder();
    }
  }

// Ajoute le bouton AddOption à la rangée actuelle s'il y a de la place, sinon crée une nouvelle rangée
const buttonConfig = new ButtonBuilder()
.setCustomId(`autorôle_CheckInfos`)
.setEmoji(`1097552030526083083`)
.setStyle(ButtonStyle.Secondary);
if (currentRow.components.length < 5) {
  currentRow.addComponents(buttonConfig);
} else {
  rows.push(currentRow);
  currentRow = new ActionRowBuilder();
  currentRow.addComponents(buttonConfig);
}

//currentRow.push(...rows);
rows.push(currentRow);


// Envoyer/modifier le message avec les composants
const modifierUrl = interaction.options.getString('modifier');
if (modifierUrl != null) {
  try {
    // Extraire l'ID du channel et de message du lien URL
    const urlParts = modifierUrl.split('/');
    const channelId = urlParts[urlParts.length - 2];
    const messageId = urlParts[urlParts.length - 1];

    // Récupérer le message à modifier
    const messageToEdit = await interaction.client.channels.cache.get(channelId).messages.fetch(messageId);

    // Vérifier si le message a été posté par le bot
    if (messageToEdit.author.id !== interaction.client.user.id) {
      const notBotMessage = new EmbedBuilder()
        .setTitle(':x: - Je ne suis pas l\'auteur du message !')
        .setDescription(`> Assurez-vous que je suis l'auteur du message à modifier.\n> [Redirection vers le lien.](${modifierUrl || 'Lien du message a modifié.'})`)
        .setColor('Red');

      const notBotRow = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel('- Redirection au message.')
          .setEmoji('🔗')
          .setURL(messageToEdit.url)
      );

      return interaction.reply({ embeds: [notBotMessage], components: [notBotRow], ephemeral: true });
    }

    // Mettre à jour le message
    await messageToEdit.edit({ embeds: [embed_rôles_react], components: rows });

    // Créer un message de confirmation
    const messageModified = new EmbedBuilder()
      .setTitle('✅ - Le message a bien été modifié.')
      .setColor('Green')
      .setURL(messageToEdit.url);

    const linkRow = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel('- Redirection au message.')
        .setEmoji('🔗')
        .setURL(messageToEdit.url)
    );

    return interaction.channel.send({
      embeds: [messageModified],
      components: [linkRow],
      ephemeral: true
    });
  } catch (error) {
    console.log(error)
    // Gérer les erreurs
    const errorMessage = new EmbedBuilder()
      .setTitle(':x: - Message non modifiée !')
      .setDescription(`**Que faire ?**\n> - **Vérifier bien qu'il y est quelque chose à envoyer.**\n> - Regader bien mes permissions.\n> Si le problème persiste, fait nous en part dans le support.`)
      .setColor('Red')
      .setTimestamp();

    if (error.message === 'Unknown Message') {
      errorMessage.setDescription(`> Assurez-vous d'avoir mis le lien du message à signaler.`);
    }

    return interaction.channel.send({ embeds: [errorMessage] }).catch(() => {});
  }
}

// Si il n'y a pas l'argument modifier, on crée un nouveau message.
return interaction.channel.send({ embeds: [embed_rôles_react], components: rows })
  .catch((e) => { console.log(e); });

} catch (err) {
  const files = require(`../../Functions/erreur_cmds.js`);
      files.err_cmds(client, interaction, err)
}
  
},
};


//// By
/////// Revolt
////////////// Owner Project   
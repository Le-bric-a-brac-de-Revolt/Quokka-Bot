const { PermissionsBitField, Permissions } = require("discord.js");


const permissionsBitToText = {
    [PermissionsBitField.Flags.Administrator.toString()]: "Administrator",
    [PermissionsBitField.Flags.KickMembers.toString()]: "KickMembers", 
    [PermissionsBitField.Flags.BanMembers.toString()]: "BanMembers",
    [PermissionsBitField.Flags.ManageGuild.toString()]: "ManageGuild",
    [PermissionsBitField.Flags.ManageChannels.toString()]: "ManageChannels",
    [PermissionsBitField.Flags.ManageNicknames.toString()]: "ManageNicknames",
    [PermissionsBitField.Flags.ManageRoles.toString()]: "ManageRoles",
    [PermissionsBitField.Flags.ManageThreads.toString()]: "ManageThreads",
    [PermissionsBitField.Flags.ManageEmojisAndStickers.toString()]: "ManageEmojisAndStickers",
    [PermissionsBitField.Flags.ManageEvents.toString()]: "ManageEvents",
    [PermissionsBitField.Flags.ManageMessages.toString()]: "ManageMessages",
    [PermissionsBitField.Flags.AddReactions.toString()]: "AddReactions",
    [PermissionsBitField.Flags.ViewAuditLog.toString()]: "ViewAuditLog",
    [PermissionsBitField.Flags.AttachFiles.toString()]: "AttachFiles",
    [PermissionsBitField.Flags.EmbedLinks.toString()]: "EmbedLinks",
    [PermissionsBitField.Flags.MentionEveryone.toString()]: "MentionEveryone",
    [PermissionsBitField.Flags.UseExternalEmojis.toString()]: "UseExternalEmojis",
    [PermissionsBitField.Flags.UseExternalStickers.toString()]: "UseExternalStickers",
    [PermissionsBitField.Flags.UseApplicationCommands.toString()]: "UseApplicationCommands",
    [PermissionsBitField.Flags.ChangeNickname.toString()]: "ChangeNickname",
    [PermissionsBitField.Flags.Connect.toString()]: "Connect",
    [PermissionsBitField.Flags.Stream.toString()]: "Stream",
    [PermissionsBitField.Flags.MuteMembers.toString()]: "MuteMembers",
    [PermissionsBitField.Flags.MoveMembers.toString()]: "MoveMembers",
    [PermissionsBitField.Flags.DeafenMembers.toString()]: "DeafenMembers",
    [PermissionsBitField.Flags.PrioritySpeaker.toString()]: "PrioritySpeaker",
    [PermissionsBitField.Flags.ReadMessageHistory.toString()]: "ReadMessageHistory",
    [PermissionsBitField.Flags.SendMessages.toString()]: "SendMessages",
    [PermissionsBitField.Flags.SendTTSMessages.toString()]: "SendTTSMessages",
    [PermissionsBitField.Flags.Speak.toString()]: "Speak",
    [PermissionsBitField.Flags.ViewChannel.toString()]: "ViewChannel",
    [PermissionsBitField.Flags.UseVAD.toString()]: "UseVAD",
    [PermissionsBitField.Flags.RequestToSpeak.toString()]: "RequestToSpeak",
    [PermissionsBitField.Flags.CreatePublicThreads.toString()]: "CreatePublicThreads",
    [PermissionsBitField.Flags.CreatePrivateThreads.toString()]: "CreatePrivateThreads"
 };

 const permissionsToFr = {
    "Administrator": "Administrateur",
    "ViewAuditLog": "Voir les journaux d'audit",
    "ViewGuildInsights": "Afficher les statistiques du serveur",
    "ManageGuild": "Gérer le serveur",
    "ManageRoles": "Gérer les rôles",
    "ManageChannels": "Gérer les salons",
    "KickMembers": "Expulser des membres",
    "BanMembers": "Bannir des membres",
    "MuteMembers": "Muter des membres dans un salon vocal",
    "ModerateMembers": "Exclure temporairement des membres",
    "ChangeNickname": "Changer son pseudo",
    "ManageNicknames": "Gérer les pseudos",
    "ManageEmojisAndStickers": "Gérer les émojis et les autocollants",
    "CreateInstantInvite": "Créer des invitations instantanées",
    "ManageEvents": "Gérer les événements",
    "ManageWebhooks": "Gérer les webhooks",
    "ManageMessages": "Gérer les messages",
    "DeafenMembers": "Rendre sourds des membres dans un salon vocal",
    "SendMessages": "Envoyer des messages",
    "ReadMessageHistory": "Voir l'historique des messages",
    "SendTTSMessages": "Envoyer des messages TTS",
    "ViewChannel": "Voir les salons textuels et les salons vocaux",
    "EmbedLinks": "Intégrer des liens",
    "AttachFiles": "Joindre des fichiers",
    "MentionEveryone": "Mentionner @everyone, @here et tous les rôles",
    "AddReactions": "Ajouter des réactions",
    "Connect": "Rejoindre un salon vocal",
    "Speak": "Parler dans un salon vocal",
    "Stream": "Partager son écran",
    "UseEmbeddedActivities": "Utiliser des activités intégrées dans un salon vocal",
    "MoveMembers": "Déplacer des membres entre les salons vocaux",
    "UseVAD": "Utiliser la détection d'activité vocale",
    "RequestToSpeak": "Demander la parole",
    "PrioritySpeaker": "Orateur prioritaire",
    "UseApplicationCommands": "Utiliser les commandes de l'application",
    "UseExternalStickers": "Utiliser des autocollants externes",
    "UseExternalEmojis": "Utiliser des émojis externes",
    "ManageThreads": "Gérer les fils et les messages",
    "CreatePublicThreads": "Créer des fils publics",
    "CreatePrivateThreads": "Créer des fils privés",
  };  

  function bitfieldToArray(ChffirePerms) {
    let PermAn = permissionsBitToText[ChffirePerms]
    let PermFr = permissionsToFr[PermAn]
    return PermFr;
  }  


module.exports = {
    permissionsBitToText,
    permissionsToFr,
    bitfieldToArray
  };


//// By
/////// Revolt
////////////// Owner Project 
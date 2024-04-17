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
  const { inspect } = require("util");

  const { color_bot_hex } = require("../../botconfig/main.json");

  module.exports = {
     name: "set-premium",
     usage: "txt <text>",
     cooldownsUser: 5000, 
     description: "gerez les abonnements",
     toggleOff: false,
     commanddev: false,
     developersOnly: false,
  
     default_member_permissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel ],
     botpermissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel ],
     type: ApplicationCommandType.ChatInput,
  
     status_command: `🟢`,
  
     options: [

        {
            name: 'new', type: ApplicationCommandOptionType.Subcommand, description: 'NOUVEAU ABONNEMENT', options:
                [
                  { name: 'sku-id', description: 'ID DE LA SKU', type: ApplicationCommandOptionType.String, required: true, },
                  { name: 'guild-or-user-id', description: 'ID DE LA GUILD OU DE L\'USER', type: ApplicationCommandOptionType.String, required: true, },
                  { name: "owner-type", description: "TYPE D'ABONNEMENT : 1 = GUILD // 2 = USER", type: ApplicationCommandOptionType.String, required: true,
                                    choices: [{ name: "GUILD subscription (1)",value: "1" }, { name: "USER subscription (2)",value: "2" }]},
                ],   
          },

          {
            name: 'delete', type: ApplicationCommandOptionType.Subcommand, description: 'SUPPRIMER ABONNEMENT', options:
                [
                  { name: 'entitlements-id', description: 'ID DU entitlements', type: ApplicationCommandOptionType.String, required: true, },
                ],   
          },

          {
            name: 'get', type: ApplicationCommandOptionType.Subcommand, description: 'VOIR ABONNEMENT', options:
                [
                  { name: 'guild-or-user-id', description: 'ID DE LA GUILD OU DE L\'USER', type: ApplicationCommandOptionType.String, required: true, },
                ],   
          },
    ],
  
  
     run: async (client, interaction, args) => {
  
      try{
  
          if (!interaction.member.roles.cache.has(`1048895513883312198`)){
              return;
          }

          const command = interaction.options._subcommand;

      if(command == `get`){

        let guild_User_Id_Get = interaction.options.getString('guild-or-user-id')
      
          const entitlements = await client.rest.get(`/applications/${client.user.id}/entitlements`);
          const serverEntitlement = entitlements.find(entitlement => entitlement.guild_id === guild_User_Id_Get);

          if(!serverEntitlement){
            await interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setTitle(":x: - J'ai rien trouvée !")
                    .setColor(color_bot_hex),
                ],
              }).catch((e)=>{console.log(e)})
            return;
          }
           else if (serverEntitlement){
              await interaction.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setTitle("🧩 - Abonnement serveur/utilisateur")
                      .setDescription(
                        `**Entitlement ID** : ${serverEntitlement.id || `Error`}`
                        + `\n> **SKU ID** : ${serverEntitlement.sku_id || `Error`}`
                        + `\n> **ABONNEMENT ID** : ${serverEntitlement.subscription_id || `Error`}`
                        + `\n> **SUPPRIMER PAR DISCORD** : ${serverEntitlement.deleted || `Error`}`
                        + `\n> **DÉMARRER** : ${serverEntitlement.starts_at || `No date`}`
                        + `\n> **FIN** : ${serverEntitlement.ends_at || `No date`}`
                      )
                      .setColor(color_bot_hex),
                  ],
                }).catch((e)=>{console.log(e)})
             return;
           }
      
      }


      if(command == `new`){

        let guild_User_Id_New = interaction.options.getString('guild-or-user-id')
        let Sku_Id_New = interaction.options.getString('sku-id')
        let Owner_Type_New = interaction.options.getString('owner-type')

        await client.rest.post(`/applications/${client.user.id}/entitlements`, {
            body: {
                 sku_id: Sku_Id_New,  // Remplacez par l'ID de la référence SKU pour accorder le droit à
                 owner_id: guild_User_Id_New, // Remplacez par l'ID de la guilde ou de l'utilisateur pour accorder le droit à
                 owner_type: Number(Owner_Type_New) // 1 pour un abonnement de guilde, 2 pour un abonnement d'utilisateur
               }
             }).then((entitlements) => {
                interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setTitle("🧩 - Abonnement serveur/utilisateur")
                    .setDescription(
                      `**Entitlement ID** : ${entitlements.id || `Error`}`
                      + `\n> **SKU ID** : ${entitlements.sku_id || `Error`}`
                      + `\n> **ABONNEMENT ID** : ${entitlements.subscription_id || `Error`}`
                      + `\n> **SUPPRIMER PAR DISCORD** : ${entitlements.deleted || `Error`}`
                      + `\n> **DÉMARRER** : ${entitlements.starts_at || `No date`}`
                      + `\n> **FIN** : ${entitlements.ends_at || `No date`}`
                    )
                    .setColor(color_bot_hex),
                ],
              }).catch((e)=>{console.log(e)})
              return;

             }).catch((error) => {
                interaction.reply({
                    embeds: [
                      new EmbedBuilder()
                        .setTitle(":x: - Erreur")
                        .setDescription(
                            `\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``
                          )
                        .setColor(color_bot_hex),
                    ],
                  }).catch((e)=>{console.log(e)})
             });
      }


      if(command == `delete`){

        let entitlements_id = interaction.options.getString('entitlements-id')

        await client.rest.delete(`/applications/${client.user.id}/entitlements/${entitlements_id}`)
        .then(() => {
                interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setTitle("🧩 - Abonnement supprimer avec succès")
                    .setColor(color_bot_hex),
                ],
              }).catch((e)=>{console.log(e)})
              return;
             }).catch((error) => {
                interaction.reply({
                    embeds: [
                      new EmbedBuilder()
                        .setTitle(":x: - Erreur")
                        .setDescription(
                            `\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``
                          )
                        .setColor(color_bot_hex),
                    ],
                  }).catch((e)=>{console.log(e)})
             });
      }

  
    } catch (err) {
      const files = require(`../../Functions/erreur_cmds.js`);
          files.err_cmds(client, interaction, err)
   }
  
  
    }
  }
  
const client = require("../../index");
const { EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, Permissions } = require("discord.js");
const { randomMessages_Cooldown, invite_bot, developerID, vip_member, beta_testeur_member, ListeNoir } = require("../../botconfig/main.json");
const ms = require("ms");

client.on("interactionCreate", async (interaction) => {

   // Vérification de la liste noire
   if (ListeNoir.includes(interaction.user.id)) {
      const ListNoir_Embed = new EmbedBuilder()
         .setTitle(`:x: - Vous faites partie de la liste noire. Vous ne pouvez interagir avec le bot.`)
         .setColor("Red");

      return interaction.reply({ embeds: [ListNoir_Embed], ephemeral: true });
   }

   // Traitement des slash commands
   if (interaction.isCommand() || interaction.isUserContextMenuCommand()) {
      const cmd = client.slashCommands.get(interaction.commandName) || client.slashOwner.get(interaction.commandName);
      if (!cmd) return;

      // Vérification des conditions d'exécution
      if (interaction.user.bot || !interaction.guild) {
         return interaction.reply({ content: ":x: - Vous ne pouvez pas interagir en message privé !" }).catch(() => {return;});
      }

      // Récupération des arguments de la commande
      const args = interaction.options.data.map(option => {
         if (option.type === 1) { // Sous-commande
            const subArgs = option.options?.filter(x => x.value).map(x => x.value);
            return [option.name, ...subArgs];
         }
         return option.value;
      }).flat();

      interaction.member = interaction.guild.members.cache.get(interaction.user.id);

      // Récupération des paramètres de guilde
      let guildSettings = await client.getGuild(interaction.guild);
      if (!guildSettings) {
         await client.createGuild(interaction.guild);
         guildSettings = await client.getGuild(interaction.guild);
      }

      // Vérification des permissions du développeur
     /* if (developerID.includes(interaction.user.id)) {
         return cmd.run(client, interaction, args, guildSettings);
      }*/

      // Gestion des cooldowns utilisateur
      if (cmd.cooldownsUser) {
         const cooldownKey = `${cmd.name}_${interaction.user.id}_${interaction.guild.id}`;
         if (client.cooldownsUser.has(cooldownKey)) {
            const endDate = new Date(client.cooldownsUser.get(cooldownKey));
            const discordTimestamp = `<t:${Math.round(endDate.getTime() / 1000)}:R>`;
            
            const cooldownEmbed = new EmbedBuilder()
               .setTitle(`${randomMessages_Cooldown[Math.floor(Math.random() * randomMessages_Cooldown.length)]}`)
               .setDescription(`> Veuillez attendre ${discordTimestamp} pour pouvoir réutiliser cette commande.`)
               .setColor("Red")
               .setTimestamp();

            return interaction.reply({ embeds: [cooldownEmbed], ephemeral: true });
         }

         client.cooldownsUser.set(cooldownKey, Date.now() + cmd.cooldownsUser);
         setTimeout(() => {
            client.cooldownsUser.delete(cooldownKey);
         }, cmd.cooldownsUser);
      }

      // Gestion des cooldowns Serveurs
      if (cmd.cooldownsServeur) {
         const cooldownKey = `${cmd.name}_${interaction.user.id}_${interaction.guild.id}`;
         if (client.cooldownsServeur.has(cooldownKey)) {
            const endDate = new Date(client.cooldownsServeur.get(cooldownKey));
            const discordTimestamp = `<t:${Math.round(endDate.getTime() / 1000)}:R>`;
            
            const cooldownEmbed = new EmbedBuilder()
               .setTitle(`${randomMessages_Cooldown[Math.floor(Math.random() * randomMessages_Cooldown.length)]}`)
               .setDescription(`> Veuillez attendre ${discordTimestamp} pour pouvoir réutiliser cette commande.`)
               .setColor("Red")
               .setTimestamp();

            return interaction.reply({ embeds: [cooldownEmbed], ephemeral: true });
         }

         client.cooldownsServeur.set(cooldownKey, Date.now() + cmd.cooldownsServeur);
         setTimeout(() => {
            client.cooldownsServeur.delete(cooldownKey);
         }, cmd.cooldownsServeur);
      }

      // Gestion des autres conditions de commande
      if (cmd.commanddev) {
         return interaction.reply({ 
            embeds: [new EmbedBuilder()
               .setTitle(`:x: | Cette commande est en cours de développement !`)
               .setDescription(`> Veuillez patienter jusqu'à la finalisation de cette commande par les développeurs.`)
               .setColor("Red")],
            ephemeral: true });

      } else if (cmd.toggleOff) {
         return interaction.reply({ 
            embeds: [new EmbedBuilder()
               .setTitle(`:x: | Cette commande a été désactivée par les développeurs !`)
               .setDescription(`> Veuillez réessayer ultérieurement.`)
               .setColor("Red")],
            ephemeral: true });

      } else if (cmd.developersOnly) {
         if (!developerID.includes(interaction.user.id)) {
            return interaction.reply({ 
               embeds: [new EmbedBuilder()
                  .setTitle(`:x: | Seuls les développeurs peuvent utiliser cette commande !`)
                  .setColor("Red")],
               ephemeral: true });
         }

      } else if (cmd.vipmember) {
         if (!vip_member.includes(interaction.guild.id)) {
            return interaction.reply({ 
               embeds: [new EmbedBuilder()
                  .setTitle(`:x: | Cette commande est réservée aux serveurs premium !`)
                  .setColor("Red")],
               ephemeral: true });
         }

      } else if (cmd.commande_beta_test) {
         if (!beta_testeur_member.includes(interaction.user.id)) {
            return interaction.reply({
                embeds: [ new EmbedBuilder()
                  .setTitle(`:x: | Cette commande est réservée aux bêta testeurs !`)
                  .setColor("Red")],
               ephemeral: true });
         }
      }

      // Vérification des permissions du bot
      if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve(cmd.botpermissions || []))) {
         const botPermsEmbed = new EmbedBuilder()
            .setTitle(`:x: | Je n'ai pas les permissions nécessaires pour exécuter cette commande !`)
            .setDescription(`> Veuillez me réinviter en utilisant le lien ci-dessous et assurez-vous de me donner les permissions nécessaires.`)
            .setColor("Red");

         const btn_invite_bot = new ButtonBuilder()
            .setLabel(`- Réinviter ${client.user.tag}`)
            .setEmoji(`🦊`)
            .setStyle(ButtonStyle.Link)
            .setURL(invite_bot);

         return interaction.reply({ embeds: [botPermsEmbed], components: [btn_invite_bot], ephemeral: true });
      }

      // Exécution de la commande
      cmd.run(client, interaction, args, guildSettings);
   }

   // Gestion des interactions avec les boutons
   if (interaction.isButton()) {
      try {
         // Votre code de gestion des interactions avec les boutons
            const rediect = require('../../interactions_btn_slcme/interactions_boutons.js');
            rediect.RediectInteractionsBoutons(client, interaction)
         
      } catch (err) {
         const files = require(`../../Functions/erreur_cmds.js`);
         files.err_cmds(client, interaction, err);
      }
   }

   // Gestion des interactions avec les menus déroulants
   if (interaction.isStringSelectMenu()) {
      try {
         // Votre code de gestion des interactions avec les menus déroulants
         const rediect = require('../../interactions_btn_slcme/interactions_slcme.js');
         rediect.RediectInteractionsSelectMenues(client, interaction)
      } catch (err) {
         const files = require(`../../Functions/erreur_cmds.js`);
         files.err_cmds(client, interaction, err);
      }
   }

   // Gestion des interactions avec le menu contextuel utilisateur
   if (interaction.isUserContextMenuCommand()) {
      await interaction.deferReply({ ephemeral: false });
      const command = client.slashCommands.get(interaction.commandName);
      if (command) command.run(client, interaction);
   }
});


//// By
/////// Revolt
////////////// Owner Project 
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");

module.exports.unban_btn = async (client, interaction, reason = undefined) => {
    try {
        // Vérifier si l'interaction provient d'un bot (ignorer les interactions des bots)
        if (interaction?.user.bot) {
            return;
        }

        // Récupération des arguments de l'interaction personnalisée
        let pollArgs = interaction.customId.trim().split("/");
        let userToUnban = pollArgs[1];

        // Vérifier si l'identifiant de l'utilisateur à débannir est défini
        if (userToUnban == null) {
            return;
        }

        // Vérifier les permissions de l'utilisateur à l'origine de l'interaction
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            const roleMissingPermissions = new EmbedBuilder()
                .setTitle(`:x: - ${interaction.user.username}, vous n'avez pas la permission requise.`)
                .setDescription(`> :bulb: - Vous devez avoir la permission \`Bannir un utilisateur\`.`)
                .setColor(`Red`);
            return interaction.reply({ embeds: [roleMissingPermissions], ephemeral: true }).catch(() => {});
        }

        // Vérifier les permissions du bot
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            const botMissingPermissions = new EmbedBuilder()
                .setTitle(`:x: - Je n'ai pas la permission requise !`)
                .setDescription(`> :bulb: - Je dois avoir la permission \`Bannir un utilisateur\`.`)
                .setColor(`Red`);
            return interaction.reply({ embeds: [botMissingPermissions], ephemeral: true }).catch(() => {});
        }

        // Tenter de débannir l'utilisateur
        try {
            await interaction.guild.members.unban(userToUnban);

            // Création d'une invitation temporaire pour le serveur
            const invite = await interaction.channel.createInvite({ maxUses: 1 });

            // Création de l'embed et du bouton pour envoyer à l'utilisateur débanni
            const msgUserEmbed = new EmbedBuilder()
                .setTitle(`🔧 - Tu as été débanni !`)
                .addFields([
                    { name: `Serveur :`, value: `> ${interaction.guild.name || `:x:`}` },
                    { name: `Modérateur :`, value: `> ${interaction.user}` },
                ])
                .setFooter({ text: `Le lien d'invitation est valide durant une semaine.`, iconURL: interaction.guild.iconURL({ dynamic: true, size: 1024 }) })
                .setColor(`Green`)
                .setTimestamp();

            // Envoi de l'embed et du bouton à l'utilisateur débanni
            client.users.cache.get(userToUnban)?.send({ embeds: [msgUserEmbed], components: [new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel(` - Rejoindre ${interaction.guild.name}.`)
                    .setEmoji(`✨`)
                    .setStyle(ButtonStyle.Link)
                    .setURL(invite.url || `https://discord.com/channels/@me`),
            )] }).catch(() => {});

            // Réponse confirmant le débannissement réussi
            const successEmbed = new EmbedBuilder()
                .setTitle(`✅ - L'utilisateur a été débanni avec succès par \`${interaction.user.username}\` !`)
                .setDescription(`> :bulb: - Il peut désormais rejoindre le serveur.`)
                .setColor(`Green`);

            return interaction.reply({ embeds: [successEmbed], ephemeral: false }).catch(() => {});

        } catch (err) {
            // Gestion des erreurs lors du débannissement
            console.log(err);

            const errorEmbed = new EmbedBuilder()
                .setTitle(`:x: - Impossible de débannir l'utilisateur...`)
                .setColor(`Red`);

            return interaction.reply({ embeds: [errorEmbed], ephemeral: true }).catch(() => {});
        }

    } catch (err) {
        // Gestion des erreurs avec envoi des détails à un fichier externe
        const files = require(`../../Functions/erreur_interact`);
        const NameInteract = `Unban`;
        files.err_cmds(client, interaction, err, NameInteract);
    }
};

const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports.inclure_btn = async (client, interaction, reason = undefined) => {
    try {
        // Récupération des arguments de l'interaction personnalisée
        let pollArgs = interaction.customId.trim().split("/");
        let userToInclude = pollArgs[1];

        // Vérifier si l'interaction provient d'un bot (ignorer les interactions des bots)
        if (interaction?.user.bot) {
            return;
        }

        // Vérifier si l'identifiant de l'utilisateur à inclure est défini
        if (userToInclude == null) {
            return;
        }

        // Vérifier les permissions de l'utilisateur à l'origine de l'interaction
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            const missingPermissionsEmbed = new EmbedBuilder()
                .setTitle(`:x: - \`${interaction.user.username}\`, vous n'avez pas la permission requise.`)
                .setDescription(`> :bulb: - Vous devez avoir la permission \`Gérer les membres\`.`)
                .setColor(`Red`);
            return interaction.reply({ embeds: [missingPermissionsEmbed], ephemeral: true }).catch(() => {});
        }

        // Vérifier les permissions du bot
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            const botMissingPermissionsEmbed = new EmbedBuilder()
                .setTitle(`:x: - Il me manque une permission !`)
                .setDescription(`> :bulb: - Je dois avoir la permission \`Gérer les membres\`.`)
                .setColor(`Red`);
            return interaction.reply({ embeds: [botMissingPermissionsEmbed], ephemeral: true }).catch(() => {});
        }

        // Récupérer le membre mentionné
        let memberMention = interaction.guild.members.cache.get(userToInclude);

        // Vérifier si le membre existe
        if (!memberMention) {
            const memberNotFoundEmbed = new EmbedBuilder()
                .setTitle(`:x: - Utilisateur introuvable !`)
                .setColor(`Red`);
            return interaction.reply({ embeds: [memberNotFoundEmbed], ephemeral: true }).catch(() => {});
        }

        // Vérifier si le membre est déjà inclus
        if (!memberMention.isCommunicationDisabled()) {
            const alreadyIncludedEmbed = new EmbedBuilder()
                .setTitle(`:x: - Cet utilisateur n'est pas exclu !`)
                .setColor(`Red`);
            return interaction.reply({ embeds: [alreadyIncludedEmbed], ephemeral: true }).catch(() => {});
        }

        // Tenter d'inclure à nouveau le membre
        try {
            await memberMention.timeout(null, `Inclusion par bouton d'exclusion. Effectuée par: ${interaction.user.username}`);

            // Message envoyé à l'utilisateur inclus
            const msgUserEmbed = new EmbedBuilder()
                .setTitle(`📥 - Tu as été inclus !`)
                .addFields([
                    { name: `Serveur:`, value: `> ${interaction.guild.name || `:x:`}` },
                    { name: `Modérateur:`, value: `> ${interaction.user}` },
                ])
                .setColor(`Green`)
                .setTimestamp();

            client.users.cache.get(userToInclude)?.send({ embeds: [msgUserEmbed] }).catch(() => {});

            // Réponse confirmant l'inclusion réussie
            const successEmbed = new EmbedBuilder()
                .setTitle(`✅ - L'utilisateur a été inclus avec succès par \`${interaction.user.username}\` !`)
                .setDescription(`> :bulb: - Il peut désormais parler et interagir sur le serveur.`)
                .setColor(`Green`);
            return interaction.reply({ embeds: [successEmbed], ephemeral: false }).catch(() => {});

        } catch (err) {
            console.log(err);
            // En cas d'erreur lors de l'inclusion
            const inclusionFailedEmbed = new EmbedBuilder()
                .setTitle(`:x: - Impossible d'inclure l'utilisateur...`)
                .setColor(`Red`);
            return interaction.reply({ embeds: [inclusionFailedEmbed], ephemeral: true }).catch(() => {});
        }

    } catch (err) {
        // Gestion des erreurs avec envoi des détails à un fichier externe
        const files = require(`../../Functions/erreur_interact`);
        const NameInteract = `inclure`;
        files.err_cmds(client, interaction, err, NameInteract);
    }
};

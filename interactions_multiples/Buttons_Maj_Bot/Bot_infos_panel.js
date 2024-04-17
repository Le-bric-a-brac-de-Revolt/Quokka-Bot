const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { linksupport, invite_bot, clientavatar, prefix, versionbot, developerID, color_bot_hex, appDirectoryBotLink } = require("../../botconfig/main.json");

module.exports.maj_bot_info = async (client, interaction, reason = undefined) => {
    try {
        // Vérifier si l'utilisateur est un bot (ignorer les interactions des autres bots)
        if (interaction?.user.bot) {
            return;
        }

        // Récupération du serveur de support par ID
        const supportServer = client.guilds.cache.get(`1035589781163364502`) || client.guilds.cache.get(`845733906543411250`);

        // Construction de l'embed d'informations sur le bot
        const upembed = new EmbedBuilder()
            .setTitle(`ℹ - Informations sur ${client.user.username}.`)
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                { name: `<:Robot:933351226165305414> - Bot version:`, value: `>>> Je suis actuellement à la version \`${versionbot}\` !` },
                { name: `<:Cmd:933352650211196988> - SlashsCommandes:`, value: `>>> Je suis entièrement en **SlashsCommandes**, avec \`${client.slashCommands.size}\` __SlashCommandes__.` },
                { name: `🟢 - En ligne depuis:`, value: `>>> Ma mise en ligne a été effectuée <t:${Math.floor(client.readyTimestamp / 1000) || -3600}:R>.` },
                { name: `⏱ - Bot Ping:`, value: `>>> Mon ping est actuellement de \`${client.ws.ping || `0404`}ms\`.` },
                { name: `<:RAM:933345411765243904> - RAM/Mémoire:`, value: `>>> J'utilise actuellement \`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB\` de RAM.` },
                { name: `<:Membres:933355996103987280> - Serveurs où je suis:`, value: `>>> Je suis sur \`${client.guilds.cache.size}\` __serveurs__, avec un total de \`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}\` __membres__.` },
                { name: `<:Support:933353837979398214> - Serveur de support:`, value: `>>> Le serveur de support est [${supportServer.name || "Inconnu"}](${linksupport}).` },
                { name: `🗃️ - Répertoire d'application:`, value: `>>> Le lien du répertoire d'application de ${client.user.username} est [ici](${appDirectoryBotLink}).` },
                {
                    name: `<:Dev:933356685274259526> - Développeurs:`,
                    value: `>>> Projet collaboratif => [Lien GitHub](https://github.com/Fox-y-Production/Foxy-collaboratif)`
                   // value: `>>> ${developerID.map(v => `<@${v}> | [${client.users.cache.find(user => user.id === v).username}](https://discord.com/users/${v})`).join(", ")}.`
                },
            ])
            .setImage("https://imgur.com/r8UoeNH.png")
            .setColor(color_bot_hex)
            .setTimestamp();

        // Construction du bouton pour mettre à jour les informations
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("Button_Maj_BotInfosPanel")
                    .setLabel(" - Mettre à jour le panel.")
                    .setEmoji(`⏱`)
                    .setStyle(ButtonStyle.Secondary)
            );

        // Mise à jour de l'interaction avec le nouvel embed et le bouton
        await interaction.message?.edit({ embeds: [upembed], components: [row] }) || await interaction.editReply({ embeds: [upembed], components: [row] });

        // Réponse confirmant la mise à jour réussie
        const successEmbed = new EmbedBuilder()
            .setTitle(`✅ - \`${interaction.user.username}\`, panel mis à jour avec succès !`)
            .setColor(`Green`);

        return interaction.reply({ embeds: [successEmbed], ephemeral: true }).catch(() => {});

    } catch (err) {
        // Gestion des erreurs avec envoi des détails à un fichier externe
        const files = require(`../../Functions/erreur_interact`);
        const NameInteract = `Bot Infos - MajPanel`;
        files.err_cmds(client, interaction, err, NameInteract);
    }
};


//// By
/////// Revolt
////////////// Owner Project 
const client = require("../../../index");
const { EmbedBuilder } = require("discord.js");

// Événement déclenché lorsque le bot quitte un serveur
client.on('guildDelete', async guild => {
    // Vérification si le nom du serveur est présent
    if (!guild.name) return;

    // Suppression des données du serveur dans la base de données du bot
    await client.deleteCollectionDB(guild);

    // Récupération du salon de départ du bot
    const leavsalon = await client.channels.fetch('1035939951033982977');
    const owner_id = guild.ownerId; // ID du propriétaire du serveur

    // Construction de l'embed pour annoncer le départ du serveur
    const lvembed = new EmbedBuilder()
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setTitle('<:renardTriste:1041374464723664946> - Oh, non, je viens de quitter un serveur !')
        .addFields([
            { name: `📋 - Nom du serveur :`, value: `\`${guild.name}\``, },
            { name: `👑 - Propriétaire du serveur :`, value: `> ${client.users.cache.find(user => user.id === owner_id)?.username || "Inconnu"} | ${owner_id ? `<@${owner_id}>` : "@Inconnu"} | ${owner_id || "012345678910111"}` },
            { name: `👥 - Nombre de membres :`, value: `> ${guild.memberCount} membres` },
            { name: `🧬 - ID du serveur :`, value: `> \`${guild.id}\`` },
        ])
        .setFooter(`Je suis maintenant dans ${client.guilds.cache.size} serveurs !`)
        .setColor('#FF1616')
        .setTimestamp()
        .setImage(`https://imgur.com/JE1H4E3.png`);

    // Ajout de la description du serveur à l'embed s'il y en a une
    if (guild.description) {
        lvembed.addFields([
            { name: `📎 - Description :`, value: `> ${guild.description || "Le serveur n'a pas de description"}` },
        ]);
    }

    // Envoi de l'embed dans le salon de départ avec une réaction
    leavsalon.send({ embeds: [lvembed] })
        .then(messageToReact => {
            messageToReact.react("💔");
        })
        .catch(console.error);

    console.log(`J'ai quitté le serveur : ${guild.name}`);
});


//// By
/////// Revolt
////////////// Owner Project 
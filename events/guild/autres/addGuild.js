const client = require("../../../index");
const { EmbedBuilder } = require("discord.js");

client.on("guildCreate", async guild => {
    // Récupération du salon d'ajout du bot
    const addsalon = await client.channels.fetch('1035939951033982977');
    const owner = await guild.fetchOwner();
    const owner_id = owner.id;

    // Création des données de guilde dans la base de données du bot
    await client.createGuild(guild);

    // Construction de l'embed pour annoncer l'ajout dans le serveur
    const embedguildnew = new EmbedBuilder()
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setTitle(`<:renardExtremLove:1041374685113372734> - Oh ! J'ai rejoint un serveur !`)
        .addFields([
            { name: `📋 - Nom du serveur :`, value: `\`${guild.name}\``, },
            { name: `👑 - Propriétaire du serveur :`, value: `> ${owner.user.username} | ${owner} | ${owner.id}` },
            { name: `👥 - Nombre de membres :`, value: `> ${guild.memberCount} membres` },
            { name: `🧬 - ID du serveur :`, value: `> \`${guild.id}\`` },
        ])
        .setFooter(`Je suis maintenant dans ${client.guilds.cache.size} serveurs !`)
        .setColor(`#14FF00`)
        .setTimestamp()
        .setImage(`https://imgur.com/VtAWmMW.png`);

    // Ajout de la description du serveur à l'embed s'il y en a une
    if (guild.description) {
        embedguildnew.addField(`📎 - Description :`, `> ${guild.description || `Le serveur n’a pas de description`}`);
    }

    // Envoi de l'embed dans le salon d'ajout avec une réaction
    addsalon.send({ embeds: [embedguildnew] })
        .then(messageToReact => {
            messageToReact.react(`<a:love:943058844110700574>`);
        })
        .catch(console.error);

    // Construction de l'embed pour saluer le serveur
    const newserv = new EmbedBuilder()
        .setTitle(`👋 - Salutation !`)
        .setDescription(`**Merci de m'avoir ajouté à votre serveur !**\n> Je ferai de mon mieux pour vous satisfaire. 😏`)
        .setImage(`https://imgur.com/yrhH8Np.png`)
        .setColor(`Green`)
        .setTimestamp();

    // Envoi du message de salutation dans le canal système du serveur si disponible
    if (guild.systemChannel) {
        guild.systemChannel.send({ embeds: [newserv] })
            .catch(console.error);
    }

    // Affichage d'un message en console pour confirmer l'ajout au serveur
    console.log(`J'ai rejoint le serveur de ${guild.name}`);
});


//// By
/////// Revolt
////////////// Owner Project 
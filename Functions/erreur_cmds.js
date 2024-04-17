const { EmbedBuilder,MessageAttachment } = require("discord.js");

module.exports.err_cmds = async(client, interaction, err) => {

  const owner = await interaction.guild.fetchOwner();

    console.log(err)

    const Erreur = new EmbedBuilder()
    .setTitle(`:x: - Une erreur est survenue !`)
    .setDescription(`> ☝ - Vous ne devez jamais recevoir un message comme ceci.`
                      +`\n> 🖐 - Merci de contacter l'administration du bot si le problème persiste.` 
                       + `\n> *👨‍💻 - Les dev's ont été avertis de l'erreur.*`)
  .addFields([
    { name: `Infos commande:` , value: `\`\`\`Commande name: ${interaction.commandName}\`\`\``
                     + `\n\`\`\`Commande executer par: ${interaction.user.tag}\`\`\``
                     + `\n\`\`\`Owner serveur: ${client.users.cache.find(user => user.id === owner.id).tag || `Commande en MP'S`}\`\`\`` },
    { name: `ERREUR:` , value: `\`\`\`${err || `Non defini`}\`\`\`` },
  ])
    .setColor(`Red`)
    .setTimestamp()
  
     client.channels.cache.get('1031951263794999378').send({embeds: [Erreur]}).catch(()=> {return})
   return interaction.reply({embeds: [Erreur], ephemeral: true,}).catch(()=> {return})

}


//// By
/////// Revolt
////////////// Owner Project 
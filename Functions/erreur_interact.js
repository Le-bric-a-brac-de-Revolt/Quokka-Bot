const { EmbedBuilder,MessageAttachment } = require("discord.js");

module.exports.err_cmds = async(client, interaction, err, NameInteract) => {

  const owner = await interaction?.guild?.fetchOwner() || `Inconue`;

    console.log(err)

    const Erreur = new EmbedBuilder()
    .setTitle(`:x: - Une erreur est survenue !`)
    .setDescription(`> ☝ - Vous ne devez jamais recevoir un message comme ceci.`
                      +`\n> 🖐 - Merci de contacter l'administration du bot si le prôblème persiste.` 
                       + `\n> *👨‍💻 - Les dev's ont été avartie de l'erreur.*`)
  .addFields([
    { name: `Infos Inetraction:` , value:
                     + `\n\`\`\`Inetraction executer par: ${interaction.user.tag}\`\`\``
                     + `\n\`\`\`Nom de l'interaction: ${NameInteract || `???`}\`\`\``
                     + `\n\`\`\`Owner serveur: ${client.users.cache.find(user => user.id === owner.id).tag || `MP'S`}\`\`\``
                     + `\n\`\`\`Nom + Id du serveur: ${interaction.guild.id || `MP'S`} | ${interaction.guild.name || `MP'S`}\`\`\``},
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
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



module.exports = {
   name: "serveur_leave",
   usage: "txt <text>",
   cooldownsUser: 5000, 
   description: "Liste de tout les serveurs du bot.",
   toggleOff: false,
   commanddev: false,
   developersOnly: false,

   default_member_permissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel ],
   botpermissions: [ PermissionsBitField.Flags.SendMessages | PermissionsBitField.Flags.ViewChannel ],
   type: ApplicationCommandType.ChatInput,

   status_command: `🟢`,

   options: [
        { name: "serveur_id", description: "Quel serveur je doit quitté ?"
		, type: ApplicationCommandOptionType.String, required: true },
	
   ],


   run: async (client, interaction, args) => {

    try{

		if (!interaction.member.roles.cache.has(`1048895513883312198`)){
			return;
		}

  		let serveurID= interaction.options.getString(`serveur_id`)

		let serveur_valide = client.guilds.cache.find(user => user.id === serveurID)

		/*if(!serveur_valide){
		    return interaction.reply(`Il n'y a pas de serveur a cet id.`)
		}*/


    const activ_or_desact = new ActionRowBuilder()
    .addComponents(
    new ButtonBuilder()
    .setCustomId('rester')
    .setLabel('- Ne pas quitter.')
    .setEmoji('📥')
    .setStyle(ButtonStyle.Success),
  
    new ButtonBuilder()
    .setCustomId('leave')
    .setLabel('- Quitter le serveur.')
    .setEmoji('📤')
    .setStyle(ButtonStyle.Danger),
    );
  
    const owner = await serveur_valide.fetchOwner();
    const que_faire = new EmbedBuilder()
    .setTitle(`✅ - ❌ - Que souhaitez-vous faire ? `)
    .setDescription(`> ⌛ - Vous aviez 30 secondes pour réagir.`)
    .addFields({
      name:`Dois-je vraiment quitter le serveur ?`,
      value: `>>> **Nom:** ${serveur_valide.name}` +
             `\n**Description:** ${serveur_valide.description || `:x:`}` +
             `\n**Nbr d'utilisateurs:** 👥 - ${serveur_valide.members.cache.filter(member => !member.user.bot).size} Membre(s) | 🤖 - ${serveur_valide.members.cache.filter(member => member.user.bot).size} Bot(s)`+
             `\n**Propriétaire:** ${owner} | ${owner.id} | [${owner.user.username}](https://discord.com/users/${owner.id})`
            })
    .setColor(`Orange`)
    .setTimestamp()

    interaction.reply({ embeds : [que_faire], components: [activ_or_desact]});

    const filter = (interactionss) => interactionss.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({  filter, time: 30000 });

    collector.on('collect', interact => {

      if ( interact.customId == `leave`){
        serveur_valide.leave()
        const embeds_non = new EmbedBuilder()
        .setTitle(`📌 - J'ai quitter le serveur.`)
        .addFields({
          name:`infos sur le serveur`,
          value: `>>> **Nom:** ${serveur_valide.name}` +
                 `\n**Description:** ${serveur_valide.description || `:x:`}` +
                 `\n**Nbr d'utilisateurs:** 👥 - ${serveur_valide.members.cache.filter(member => !member.user.bot).size} Membre(s) | 🤖 - ${serveur_valide.members.cache.filter(member => member.user.bot).size} Bot(s)`+
                 `\n**Propriétaire:** ${owner} | ${owner.id} | [${owner.user.username}](https://discord.com/users/${owner.id})`
                })
        .setColor(`Red`)
        .setTimestamp()

      collector.stop()
     return interact.message.edit({ embeds : [embeds_non], components: []}).catch(()=> {return;})
      }




      if ( interact.customId == `rester`){

        const embeds_non = new EmbedBuilder()
        .setTitle(`📌 - J'n'ai pas quitter le serveur.`)
        .setColor(`Red`)
        .setTimestamp()

      collector.stop()
     return interact.message.edit({ embeds : [embeds_non], components: []}).catch(()=> {return;})
      }


    })

    collector.on('end', () => {
      const temps_ecoule = new EmbedBuilder()
        .setTitle(`⌛ - Interaction terminer.`)
        .setColor(`Red`)
         .setTimestamp()
         
          interaction.editReply({ embeds: [que_faire], components: [], ephemeral: true, }).catch(()=> {return;})
     return interaction.channel.send({ embeds: [temps_ecoule], components: [], ephemeral: true, }).catch(()=> {return;})
})

  } catch (err) {
    const files = require(`../../Functions/erreur_cmds.js`);
        files.err_cmds(client, interaction, err)
 }


  }
}

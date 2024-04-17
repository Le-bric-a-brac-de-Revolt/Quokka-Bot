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
   name: "serveur_liste",
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

   options: [],


   run: async (client, interaction, args) => {

    try{

		if (!interaction.member.roles.cache.has(`1048895513883312198`)){
			return;
		}

  		let i0 = 0;
		let i1 = 10;
		let page = 1;

		let description = 
        `Il y a: ${client.guilds.cache.size} serveurs\n\n`+
		client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
      .map((r, i) => `**${i + 1}** - \`${r.name}\` (${r.id}) - [${client.users?.cache?.find(user => user.id === r.ownerId)?.username || `Inconue#0000`}](https://discord.com/users/${r.ownerId}) (${r.ownerId}) | ${r.memberCount} membres`)
      .slice(0, 10)
			.join("\n");

		const embed = new EmbedBuilder()
			.setAuthor({name: interaction.user.username, IconURL: interaction.user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' })})
			.setColor(`#2F3136`)
			.setTitle(`Page: ${page}/${Math.ceil(client.guilds.cache.size/10)}`)
			.setDescription(description);


			interaction.reply({content:`✨`, ephemeral: true})
		const msg = await interaction.channel.send({ embeds: [embed] });
        
		await msg.react("⬅");
		await msg.react("➡");
		// await msg.react("❌");

		const collector = msg.createReactionCollector((reaction, user) => user.id === interaction.user.id);

		collector.on("collect", async(reaction) => {

			if(reaction._emoji.name === "⬅") {

				// Updates variables
				i0 = i0-10;
				i1 = i1-10;
				page = page-1;
                
				// if there is no guild to display, delete the message
				if(i0 < 0){
					collector.stop()
					return msg.delete();
				}
				if(!i0 || !i1){
					collector.stop()
					return msg.delete();
				}
                
				description = `Il y a ${client.guilds.cache.size} serveurs\n\n`+
				client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
            .map((r, i) => `**${i + 1}** - \`${r.name}\` (${r.id}) - [${client.users?.cache?.find(user => user.id === r.ownerId)?.username || `Inconue#0000`}](https://discord.com/users/${r.ownerId}) (${r.ownerId}) | ${r.memberCount} membres`)
            .slice(i0, i1)
					.join("\n");

				// Update the embed with new informations
				embed.setTitle(`Page: ${page}/${Math.round(client.guilds.cache.size/10)}`)
					.setDescription(description);
            
				// Edit the message 
				msg.edit({ embeds: [embed]});
            
			}

			if(reaction._emoji.name === "➡"){

				// Updates variables
				i0 = i0+10;
				i1 = i1+10;
				page = page+1;

				// if there is no guild to display, delete the message
				if(i1 > client.guilds.cache.size + 10){
					collector.stop()
					return msg.delete();
				}
				if(!i0 || !i1){
					collector.stop()
					return msg.delete();
				}

				description = `Il y a: ${client.guilds.cache.size} serveurs\n\n`+
				client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
            .map((r, i) => `**${i + 1}** - \`${r.name}\` (${r.id}) - [${client.users?.cache?.find(user => user.id === r.ownerId)?.username || `Inconue#0000`}](https://discord.com/users/${r.ownerId}) (${r.ownerId}) | ${r.memberCount} membres`)
            .slice(i0, i1)
					.join("\n");

				// Update the embed with new informations
				embed.setTitle(`Il y a: ${page}/${Math.round(client.guilds.cache.size/10)} serveurs`)
					.setDescription(description);
            
				// Edit the message 
				msg.edit({ embeds: [embed] });

			}

			// Remove the reaction when the user react to the message
			await reaction.users.remove(interaction.user.id);

		});

  } catch (err) {
    const files = require(`../../Functions/erreur_cmds.js`);
        files.err_cmds(client, interaction, err)
 }


  }
}

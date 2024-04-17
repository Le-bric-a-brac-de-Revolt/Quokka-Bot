const client = require("../../index");
const { EmbedBuilder, WebhookClient } = require("discord.js");
const main_json = require("../../botconfig/main.json");

client.on("NewInteracLogs", async (inter) => {

  const interaction = inter.interaction;

  const webhookLogsCommande = new WebhookClient({
    url: main_json.WebHookClientUrl_InteracLog,
  });

  const commande = client.slashCommands.get(interaction.commandName);
  const owner = client.users.cache.find(user => user.id === interaction.guild.ownerId)

    const embed_interact = new EmbedBuilder()
  .setTitle(`🔰 - Nouvelle interaction.`)
  .addFields([ { name: `Informations sur l'interaction :` , 
                 value: `> \` - \` Commande: **${commande?.name || `0`}**`
                   //`\n> \` - \` Membre: **@${interaction?.user?.username || `0`} | ${interaction.user.id || `0`}**`+
                   //`\n> \` - \` Serveur: **${interaction.guild?.id || `0`}**`+
                   //`\n> \` - \` Owner: **${owner?.id || `0`}**` 
                  }, ])
  .setThumbnail(interaction.guild.iconURL({ dynamic: true}))
  .setTimestamp()
  .setColor(`#2F3136`)
  webhookLogsCommande.send({embeds : [embed_interact],
     username: client.user.username,
     avatarURL: client.user.avatarURL({ dynamic: true })}).catch(()=>{return;})
  console.log(`New interaction | User: ${interaction.user.username || `0`}, ${interaction.user.id || `0`} | Guild: ${interaction.guild.name || `0`},  ${interaction.guild.id || `0`} | CMD: ${commande.name || `0`}.`)


});

//// By
/////// Revolt
////////////// Owner Project 
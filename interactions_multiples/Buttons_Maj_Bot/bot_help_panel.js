const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder, 
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const {readdirSync} = require("fs");

const { color_bot_hex, appDirectoryBotLink, linkGitHub, linksupport } = require("../../botconfig/main.json");
  
module.exports.bot_help = async (client, interaction) => {


if(interaction?.user.bot){
    return;
}

try{

  if(!interaction.isCommand()){
 
let PollArgs = interaction?.customId?.trim()?.split("/")
let Obj1 = PollArgs[1]
var VersionDeEmbed = PollArgs[2] || `PC`
if (interaction.user.id != Obj1 ){
    const help_no_user_id = new EmbedBuilder()
    .setTitle(`:x: - Désolé, mais vous n'êtes pas l'auteur du panel d'aide. Veuillez en créer un autre !`)
    .setColor(`Red`)
    return interaction.reply({embeds: [help_no_user_id], fetchReply: true, ephemeral: true,}).catch(()=> {return})
}
}


if (interaction.values == 'AccueilHelp'  || !interaction.customId ){

  const helpEmbed = new EmbedBuilder()
  .setTitle(`${client.user.username} - Aide`)
  .addFields([
        { name: "🦊 - Hey !" , 
               value: `>>> ${client.user} est un bot **gratuit** et **collaboratif**. Vous pouvez participer au projet via [GitHub](${linkGitHub}), en rejoignant le [serveur de support](${linksupport}), ou même en faisant un don (pas encore disponible) dont tous les bénéfices seront versés à une association ! \n - *"Ne détruisez pas un projet qui offre, participez plutôt au projet au lieu de le détruire."*`},

       { name: `🎛 - Informations boutons` , 
              value: "> 🤖 ➯ Commandes concernant le Bot"+
                     "\n> 🔨 ➯ Commandes de modération"+
                     "\n> ⚙ ➯ Commandes de configuration"+
                    // "\n> 📁 ➯ Commandes utilitaire"+
                     "\n> 💼 ➯ Commandes diverses"+
                     "\n> 🕊 ➯ Commandes d'animaux"+
                     "\n> 🏠 ➯ Retour à ce menu" },
       { name: "⁉ - État de la commande" , 
              value: `> 🟢 ➯ Actif, état fonctionnel`
                    +`\n> 🟠 ➯ Bugs dans la commande, médiocre`
                    +`\n> 🔴 ➯ Non fonctionel`
                    +`\n> 🔵 ➯ (Re)Codage en cours` },
])
  .setImage("https://media.discordapp.net/attachments/1096552874730868866/1096746482738139236/Frame_9_21.png")
  .setColor(color_bot_hex)
  .setTimestamp();

const row = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
    .setLabel(`Répertoire d'application de ${client.user.username}`)
    .setStyle(ButtonStyle.Link)
    .setURL(appDirectoryBotLink),
);

let version = interaction?.options?.getString("version") || `PC`;

      var row2 = new ActionRowBuilder()
      .addComponents(
          new StringSelectMenuBuilder()
          .setCustomId(`SelectMenueHelp/${interaction.user.id}/${version}`)
          .setPlaceholder("Selectionne une catégorie !")
          .addOptions([
              { label: "Bot", emoji: "🤖", value: "inter_bot", },
              { label: "Moderation", emoji: "🔨", value: "inter_moderation", },
              { label: "Configuration", emoji: "⚙", value: "inter_Configurations", },
             // { label: "Utilitaire", emoji: "📁", value: "inter_Utilitaire", },
              { label: "Divers", emoji: "💼", value: "inter_Divers", },
              {label: "Accueil", emoji: "🏠", value: "AccueilHelp" },
              {label: "Fermer la page",emoji: "❌",value: "ferme"},  
          ])
      );

  let ArgsResponsesAcceuil = { embeds: [helpEmbed], components: [row, row2], fetchReply: true};
  
if(interaction.isCommand()){
      return interaction.reply(ArgsResponsesAcceuil).catch((e)=>{})
  } else {
       return interaction.update(ArgsResponsesAcceuil).catch((e)=>{})
  }      
}

if ( interaction.values == 'ferme'){
 return interaction.message.delete().catch(()=> {return; })
}

const botCommandsList = [];
readdirSync(`./SlashCommands/bot`).forEach((file) => {
  const filen = require(`../../SlashCommands/bot/${file}`);
  const name = filen.name
  const description = filen.description;
  const stat = filen.status_command;
  botCommandsList.push(`${VersionDeEmbed == "PC" ? `` : `\n`}> ${stat || `✪`} | \`/${name}\` ➯ ${description}`);
});


const Configuration_slashcommand = [];
readdirSync(`./SlashCommands/configuration`).forEach((file) => {
  const filen = require(`../../SlashCommands/configuration/${file}`);
  const name = filen.name;
  const description = filen.description;
  const stat = filen.status_command;
  Configuration_slashcommand.push(`${VersionDeEmbed == "PC" ? `` : `\n`}> ${stat || `✪`} | \`/${name}\` ➯ ${description}`); 
});


const Interactions_slashcommand = [];
readdirSync(`./SlashCommands/divers`).forEach((file) => {
  const filen = require(`../../SlashCommands/divers/${file}`);
  const name = filen.name;
  const description = filen.description;
  const stat = filen.status_command;
  Interactions_slashcommand.push(`${VersionDeEmbed == "PC" ? `` : `\n`}> ${stat || `✪`} | \`/${name}\` ➯ ${description}`);
});

const Moderate_slashcommand = [];
readdirSync(`./SlashCommands/moderation`).forEach((file) => {
  const filen = require(`../../SlashCommands/moderation/${file}`);
  const name = filen.name;
  const description = filen.description;
  const stat = filen.status_command;
  Moderate_slashcommand.push(`${VersionDeEmbed == "PC" ? `` : `\n`}> ${stat || `✪`} | \`/${name}\` ➯ ${description}`);
});



if ( interaction.values == 'inter_bot'){

    const help_bot = new EmbedBuilder()
    .setTitle(`🤖 - Bot`)
    .setDescription(`${botCommandsList.map((data) => `${data}`).join("\n")}`)
    .setColor(color_bot_hex)
    .setTimestamp()

    interaction.update({embeds: [help_bot], fetchReply: true, ephemeral: true,}).catch(()=> {return})

  }

  if ( interaction.values == 'inter_moderation'){

    const help_moderate = new EmbedBuilder()
    .setTitle(`🔨 - Modérations`)
    .setDescription(`${Moderate_slashcommand.map((data) => data).join("\n")}`)
    .setColor(color_bot_hex)
    .setTimestamp()
    
     interaction.update({embeds: [help_moderate], fetchReply: true, ephemeral: true,}).catch(()=> {return})

  }

  if ( interaction.values == 'inter_Configurations'){
    const help_config = new EmbedBuilder()
    .setTitle(`⚙ - Configuration`)
    .setDescription(`${Configuration_slashcommand.map((data) => data).join("\n")}`)
    .setColor(color_bot_hex)
    .setTimestamp()
    
     interaction.update({embeds: [help_config], fetchReply: true, ephemeral: true,})
  }


  if ( interaction.values == 'inter_Utilitaire'){

    const help_util = new EmbedBuilder()
    .setTitle(`🗂 - Utilitaire`)
    .setDescription(`${utilityCommandsList.map((data) => data).join("\n")}`)
    .setColor(color_bot_hex)
    .setTimestamp()

     interaction.update({embeds: [help_util], fetchReply: true, ephemeral: true,})


  }

  if ( interaction.values == 'inter_Divers'){

    const help_fun = new EmbedBuilder()
    .setTitle(`💼 - Divers`)
  .setDescription(`${Interactions_slashcommand.map((data) => data).join("\n")}`)
    .setColor(color_bot_hex)
    .setTimestamp()

     interaction.update({embeds: [help_fun], fetchReply: true, ephemeral: true,}).catch(()=> {return})

  }

} catch (err) { 
  const files = require(`../../Functions/erreur_interact`);
  let NameInteract =  `Help`
files.err_cmds(client, interaction, err, NameInteract)
}

  }

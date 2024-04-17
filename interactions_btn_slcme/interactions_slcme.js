const Discord = require("discord.js");
const mainjson = require("../botconfig/main.json");

module.exports.RediectInteractionsSelectMenues = async (client, interaction) => {
    try {
        if (interaction == null){return;} 
        if (interaction == undefined){return;} 

        // Interaction HELP
        if (interaction.customId.includes(`SelectMenueHelp`)){
            const fileHelp = require('../interactions_multiples/Buttons_Maj_Bot/bot_help_panel.js');
            fileHelp.bot_help(client, interaction)
         }
           

        
     } catch (err) {
        const files = require(`../../Functions/erreur_cmds.js`);
        files.err_cmds(client, interaction, err);
     }
}


//// By
/////// Revolt
////////////// Owner Project 
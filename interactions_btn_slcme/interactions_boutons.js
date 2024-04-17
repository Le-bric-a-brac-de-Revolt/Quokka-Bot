const Discord = require("discord.js");
const mainjson = require("../botconfig/main.json");

module.exports.RediectInteractionsBoutons = async (client, interaction) => {
    try {
        if (interaction == null){return;} 
        if (interaction == undefined){return;} 

        // Interaction Bot informations - Bouton maj
        if (interaction.customId.includes(`Button_Maj_BotInfosPanel`) ||  interaction.customId.includes(`MAJ_info_bot_bouton`)/*Ancien bouton*/){
            const I_bot_maj = require('../interactions_multiples/Buttons_Maj_Bot/Bot_infos_panel.js');
            I_bot_maj.maj_bot_info(client, interaction,)
         }

         // RÔLES
          if ( interaction.customId.includes(`autorôle`)){
               const I_bot_maj = require('../interactions_multiples/Autres/autorôle');
                I_bot_maj.autorôle(client, interaction,)
            }

        ////////// MODERATION 
        // Inclure
        if (interaction.customId.includes(`btn_Inclure`)){
            const fileInclure = require('../interactions_multiples/moderation/inclure');
            fileInclure.inclure_btn(client, interaction,)
         }  
         // Unban
         if (interaction.customId.includes(`btn_Unban`)){
            const fileUnban = require('../interactions_multiples/moderation/unban.js');
            fileUnban.unban_btn(client, interaction,)
         }            

        
     } catch (err) {
        const files = require(`../../Functions/erreur_cmds.js`);
        files.err_cmds(client, interaction, err);
     }
}


//// By
/////// Revolt
////////////// Owner Project 
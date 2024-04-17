const guild = require('../models/schema');
const {Guild} = require('../models/index')

const { Premuim_Serveur_Unlimited } = require("../botconfig/main.json");
const moment = require('moment');

module.exports = client => {
    client.getGuild = async guild => {
        const guilddata = await Guild.findOne({ Serveur_ID: guild.id});
        return guilddata
    };

    client.createGuild = async guild => {
        const createGuild = new Guild({ Serveur_ID: guild.id});
        createGuild.save();
    }; 

    client.updateGuild = async (guild, settings) => {
        let guilDdata = await client.getGuild(guild);
            if (typeof guilDdata != 'object') guilDdata = {}; 
              for ( const key in settings ){
                if ( guilDdata[key] != settings[key] ) guilDdata[key] = settings[key]
              }
         return guilDdata.updateOne(settings)     
    }

    client.deleteCollectionDB = async guild => {
       await Guild.findOneAndDelete({ Serveur_ID: guild.id});
    }
}


//// By
/////// Revolt
////////////// Owner Project 
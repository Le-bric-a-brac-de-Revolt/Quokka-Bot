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
  InteractionType,
  Component,
} = require("discord.js");

const client = require("../../../index");

client.on("messageCreate", async message => {

  if(message.content == `!<@1035925300544016535> configCollab`){
      if(message.author.id == "853203659051368468"){ // ID Revolt
         console.log("J'suis ici !")
      }
  }
})


//// By
/////// Revolt
////////////// Owner Project 
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
    Embed,
  } = require("discord.js");
  
  const { bitfieldToArray } = require(`../../Functions/ListeFrPermissions`)
  const { color_bot_hex } = require("../../botconfig/main.json");
    
  module.exports.autorôle = async (client, interaction, reason = undefined) => {
  
      try{
  
         let target = interaction.member
  
      //////////////////////////////////////////////
  
      if(interaction?.user.bot){
          return;
      }
  
  
      if(interaction.customId == `autorôle_CheckInfos`){
  
          let PermRequiseInfor = null;
          let RoleRequis = null;
          const roleIds = [];
  
          
          for (const component of interaction.message.components) {
            for (const button of component.components) {
              const [prefix, roleId, permReq, roleReq] = button.customId.split('_');
              if (prefix === 'autorôle' && roleId) {        
                if (roleId !== 'CheckInfos') {
                  roleIds.push(roleId);
                  PermRequiseInfor = permReq;
                  RoleRequis = roleReq;
                }
              }
            }
          }
          
  
          // Vérification des rôles actuels de l'utilisateur
          const member = interaction.member;
          const hasRoleIds = [];
          const missingRoleIds = [];
          for (const roleId of roleIds) {
            const role = interaction.guild.roles.cache.get(roleId);
            if (member.roles.cache.has(roleId)) {
              hasRoleIds.push(roleId);
            } else {
              missingRoleIds.push(roleId);
            }
          }
  
        // Construction de l'embed
        const embed = new EmbedBuilder()
          .setTitle('ℹ - Toutes les informations.')
          .setColor(color_bot_hex)
          .setTimestamp();
        if (hasRoleIds.length > 0) {
          const roleNames = hasRoleIds.map(roleId => interaction.guild.roles.cache.get(roleId));
          embed.addFields({name: 'Vous avez déjà les rôles suivants :', value : `>>> ` + roleNames.join('\n')});
        }
        if (missingRoleIds.length > 0) {
          const roleNames = missingRoleIds.map(roleId => interaction.guild.roles.cache.get(roleId));
          embed.addFields({ name: 'Vous pouvez obtenir les rôles suivants :', value : `>>> ` + roleNames.join('\n')});
        } 
        if(PermRequiseInfor != `0`){
          let PermNesc = bitfieldToArray(PermRequiseInfor);
          embed.addFields({ name: 'Permission requise', value : `>>> Vous devez avoir la permission suivante pour interagir avec les boutons : **${PermNesc}**`});
        }
        if(RoleRequis != `0`){
          embed.addFields({ name: 'Rôle requis', value : `>>> Vous devez avoir le rôle **<@&${RoleRequis}>** pour interagir avec les boutons.`});
        }
  
    return interaction.reply({ embeds : [embed], ephemeral: true,}).catch(()=> {return;})     
      }
  
      let PollArgs = interaction.customId.trim().split("_")
                let rôle_id_serv = PollArgs[1]
  
                let PermRequise = PollArgs[2] || `0`;
                let RoleRequisId = PollArgs[3] || `0`;
  
   if(!target.permissions.has(PermissionsBitField.resolve(PermRequise || [])) && PermRequise != `0`){
      let PermiFr = bitfieldToArray(PermRequise);
      return interaction.reply({ embeds : [new EmbedBuilder()
                                             .setTitle(`:x: - Il vous faut la permission nécessaire !`)
                                             .setDescription(`> :bulb: - Il vous faut avoir la permission **${PermiFr}**.`)
                                             .setColor(`Red`)
                               ], ephemeral: true,}).catch(()=> {return;})
   }
  
   if(!target.roles.cache.has(RoleRequisId) && RoleRequisId != `0`){
      return interaction.reply({ embeds : [new EmbedBuilder()
                                             .setTitle(`:x: - Il vous faut le rôle nécessaire !`)
                                             .setDescription(`> :bulb: - Il vous faut avoir le rôle **<@&${RoleRequisId}>**.`)
                                             .setColor(`Red`)
                               ], ephemeral: true,}).catch(()=> {return;})
   }
  
  
      if (target.roles.cache.has(rôle_id_serv)){
  
          try {
  
              await target.roles.remove(rôle_id_serv)
  
          const role_deja_assigniez = new EmbedBuilder()
          .setTitle(`✅ - \`${interaction.user.username}\`, rôle retiré avec succès !`)
          .setDescription(`> ℹ - Rôle retiré: <@&${rôle_id_serv}>.`)
          .setColor(color_bot_hex)
          return interaction.reply({ embeds : [role_deja_assigniez], ephemeral: true,}).catch(()=> {return;})
      
      
      } catch (err) {
  
          if(interaction.guild.ownerId == interaction.user.id){
              const role_owner = new EmbedBuilder()
              .setTitle(`:x: - \`${interaction.user.username}\`, Je ne peux pas donner de rôle au Owner du serveur ni le gérer !`)
              .setColor(`Red`)
              return interaction.reply({ embeds : [role_owner], ephemeral: true,}).catch(()=> {return;})
          }
  
          const role_deja_assigniez_error = new EmbedBuilder()
          .setTitle(`:x: - \`${interaction.user.username}\`, Uh Ohh, je crois avoir un problème de permissions !`)
          .setDescription(`> :bulb: - Demande à un administrateur du serveur, pour voir le problème. Le rôle <@&${rôle_id_serv}>, doit sûrement être plus haut que mon rôle à moi, un administrateur doit mettre le rôle au-dessus du rôle <@&${rôle_id_serv}>.`)
          .setColor(`Red`)
          return interaction.reply({ embeds : [role_deja_assigniez_error], ephemeral: true,}).catch(()=> {return;})
  
      }
      }
  
  
      try {
  
          await target.roles.add(rôle_id_serv)
          
          const role_succes = new EmbedBuilder()
          .setTitle(`✅ - \`${interaction.user.username}\`, rôle ajouté avec succès !`)
          .setDescription(`> ℹ - Rôle ajouté: <@&${rôle_id_serv}>.`)
          .setColor(color_bot_hex)
          return interaction.reply({ embeds : [role_succes], ephemeral: true,})
          
          } catch {
  
              if(interaction.guild.ownerId == interaction.user.id){
                  const role_owner = new EmbedBuilder()
                  .setTitle(`:x: - \`${interaction.user.username}\`, Je ne peux pas donner de rôle au Owner du serveur ni le gérer !`)
                  .setColor(`Red`)
                  return interaction.reply({ embeds : [role_owner], ephemeral: true,}).catch(()=> {return;})
              }
          
          const Role_non_dispo2 = new EmbedBuilder()
          .setTitle(`:x: - \`${interaction.user.username}\`, Un p'tit problème de rôle ici...`)
          .setDescription(`> :bulb: - Demande à un administrateur du serveur, pour voir le problème. Le rôle <@&${rôle_id_serv}>, doit sûrement être plus haut que mon rôle à moi, un administrateur doit mettre le rôle au-dessus du rôle <@&${rôle_id_serv}>.`)
          .setColor(`Red`)
          return interaction.reply({ embeds : [Role_non_dispo2], ephemeral: true,}).catch(()=> {return;})
          
          }
  
  
      } catch (err){
          const files = require(`../../Functions/erreur_interact`);
          let NameInteract =  `Auto Role`
        files.err_cmds(client, interaction, err, NameInteract)
        }
  
  
  }
  

//// By
/////// Revolt
////////////// Owner Project 
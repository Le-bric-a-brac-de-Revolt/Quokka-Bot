const { glob } = require("glob");
const { promisify } = require("util");
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
const globPromise = promisify(glob);
const mainjson = require("../botconfig/main.json");
const chalk = require("chalk");
const fs = require('fs');



module.exports = async (client) => {
  // ———————————————[Commands]———————————————
  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }
  });
  var EventCount = 0;
  var SlashCunt = 0;

  // ———————————————[Events]———————————————
  fs.readdirSync('./events/').forEach(async (dir) => {
		const eventFile = fs.readdirSync(`./events/${dir}`).filter(fillle => fillle.endsWith('.js'));
		for (let fillle of eventFile) {
			let pull = require(`../events/${dir}/${fillle}`);
      console.log(`[EVENT GÉNÉRAL] - ../events/${dir}/${fillle}`)
      EventCount++;
		}
	});

  fs.readdirSync('./events/guild/').forEach(async (dir) => {
		const eventFile = fs.readdirSync(`./events/guild/${dir}`).filter(fillle => fillle.endsWith('.js'));
		for (let fillle of eventFile) {
			let pull = require(`../events/guild/${dir}/${fillle}`);
      console.log(`[EVENT GUILD] - ../events/guild/${dir}/${fillle}`)
      EventCount++;
		}
	});

  fs.readdirSync('./events/messages/').forEach(async (dir) => {
		const eventFile = fs.readdirSync(`./events/messages/${dir}`).filter(fillle => fillle.endsWith('.js'));
		for (let fillle of eventFile) {
			let pull = require(`../events/messages/${dir}/${fillle}`);
      console.log(`[EVENT MESSAGES] - ../events/messages/${dir}/${fillle}`)
      EventCount++;
		}
	});


  // ———————————————[Slash Commands]———————————————

  const arrayOfSlashCommands = [];

  fs.readdirSync('./SlashCommands/').forEach(async (dir) => {
		const commands = fs.readdirSync(`./SlashCommands/${dir}`).filter(file => file.endsWith('.js'));
		for (let file of commands) {
      
			let pull = require(`../SlashCommands/${dir}/${file}`);
      client.slashCommands.set(pull.name, pull);
      arrayOfSlashCommands.push(pull);

     /* arrayOfSlashCommands.push({
        name: pull.name,
        description: pull.description,
        type: pull.type || 1,
        options: pull.options ? pull.options : null,
        default_permission: pull.default_permissions ? pull.default_permissions : null,
        default_member_permissions: pull.default_member_permissions ? PermissionsBitField.resolve(pull.default_member_permissions).toString() : null
      });*/
      //console.log(pull)
          SlashCunt++;
      console.log(`[SLASH LOAD] - ` + pull.name)
    }
});

setTimeout(() => { 
  console.log(`[CUNT SLASH LOAD] - ${SlashCunt}`)
  console.log(`[CUNT EVENT LOAD] - ${EventCount}`)
 }, 2000);





/*
 const CMDS_OWNER = [];
 fs.readdirSync('./SlashOwner/').forEach(async (dir) => {
  const commands = fs.readdirSync(`./SlashOwner/${dir}`).filter(file => file.endsWith('.js'));
  for (let file of commands) {
    
    let pull = require(`../SlashOwner/${dir}/${file}`);
    client.slashOwner.set(pull.name, pull);
    CMDS_OWNER.push(pull);

   /* arrayOfSlashCommands.push({
      name: pull.name,
      description: pull.description,
      type: pull.type || 1,
      options: pull.options ? pull.options : null,
      default_permission: pull.default_permissions ? pull.default_permissions : null,
      default_member_permissions: pull.default_member_permissions ? PermissionsBitField.resolve(pull.default_member_permissions).toString() : null
    }); 
    //console.log(pull)
        SlashCunt++;
    console.log(`[SLASH LOAD OWNER] - ` + pull.name)
  }
});
*/
client.on("ready", async () => {
await client.application.commands.set(arrayOfSlashCommands);
//await client.guilds.cache.get("845733906543411250").commands.set(CMDS_OWNER);
return;
}); 

};

//// By
/////// Revolt
////////////// Owner Project 
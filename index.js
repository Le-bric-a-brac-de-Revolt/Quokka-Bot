const { Client, Collection, GatewayIntentBits } = require("discord.js");

  const client = new Client({ intents: //3243773,//3276799,
                                    [
                                     GatewayIntentBits.AutoModerationConfiguration,
                                     GatewayIntentBits.AutoModerationExecution,
                                     GatewayIntentBits.DirectMessageReactions,
                                     GatewayIntentBits.DirectMessageTyping,
                                     GatewayIntentBits.DirectMessages,
                                     GatewayIntentBits.GuildEmojisAndStickers,
                                     GatewayIntentBits.GuildIntegrations,
                                     GatewayIntentBits.GuildInvites,
                                     GatewayIntentBits.GuildMessageReactions,
                                     GatewayIntentBits.GuildMessageTyping,
                                     GatewayIntentBits.GuildMessages,
                                     GatewayIntentBits.GuildModeration,
                                     GatewayIntentBits.GuildScheduledEvents,
                                     GatewayIntentBits.GuildVoiceStates,
                                     GatewayIntentBits.GuildWebhooks,
                                     GatewayIntentBits.Guilds,

                                     GatewayIntentBits.GuildMembers,
                                    // GatewayIntentBits.GuildPresences,
                                    // GatewayIntentBits.MessageContent
                                    ],
                             autoReconnect: true,
                            });

module.exports = client;

const chalk = require("chalk");

// ———————————————[Global Variables]———————————————
client.commands = new Collection();
client.cooldownsUser = new Collection();
client.cooldownsServeur = new Collection();
client.slashCommands = new Collection();
client.slashOwner = new Collection();

client.config = require("./botconfig/main.json");
require("./handler")(client);
require("./Functions/anti-crash")(client);

const { mongo_Token } = require("./botconfig/main.json");
require('./Functions/database')(client)

const mongoose = require("mongoose");
mongoose.connect(mongo_Token, {
   autoIndex: false,
   maxPoolSize: 10, 
   socketTimeoutMS: 45000, 
   family: 4 
}).then(() => console.log(`-  Connecté à la base de données`)).catch(err => console.log(err))


// ———————————————[Logging Into Client]———————————————
const token = client.config.clienttoken;
   client.login(token);


//// By
/////// Revolt
////////////// Owner Project 
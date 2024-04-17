const client = require("../../index");
const chalk = require("chalk");
const { version: discordjsVersion, EmbedBuilder, ActivityType, WebhookClient  } = require("discord.js");
const { prefix } = require("../../botconfig/main.json");
const main_json = require("../../botconfig/main.json");

client.on("ready", async () => {

  //client.user.edit({ username: `Fox'y`})

  const supportServer = client.guilds.cache.get(`${main_json.TestingServerID}`);
  if (!supportServer) return console.log("");
  // ———————————————[Status]———————————————

  updateStatus(); // Mettez à jour le statut lors du démarrage initial
  setInterval(updateStatus, 7000); // Mettez à jour le statut toutes les 7 secondes
  // setInterval(() => pingDiscord(client), 1800000); // Envoie un ping toutes les 1800000 ms (30 minutes)

  // ———————————————[Ready MSG]———————————————
  console.log(chalk.green.bold("Succès !"));
  console.log(chalk.gray("Connecté à"), chalk.yellow(`${client.user.tag}`));
  console.log(
    chalk.white("Watching"),
    chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    chalk.white(
      `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 ? "Users," : "User,"}`),
    chalk.red(`${client.guilds.cache.size}`),
    chalk.white(`${client.guilds.cache.size > 1 ? "Serveurs." : "Serveur."}`)
  );
  console.log(
    chalk.white(`Prefix:` + chalk.red(` / `)),
    chalk.white("||"),
    chalk.red(`${client.slashCommands.size}`),
    chalk.white(`Commandes`)
  );
  console.log(
    chalk.white(`Support-Serveur: `) +
      chalk.red(`${supportServer.name || "None"}`)
  );
  console.log("");
  console.log(chalk.red.bold("——————————[Statistics]——————————"));
  console.log(
    chalk.gray(
      `Discord.js Version: ${discordjsVersion}\nNode.js Version: ${process.version} on ${process.platform} ${process.arch}`)
  );
  console.log(
    chalk.gray(
      `RAM/Memoire: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
    )
  );


  
  const OnlineWebHooks = new WebhookClient({
    url: main_json.WebHookClientUrl_LogOnline,
  });
  
  OnlineWebHooks.send({embeds : [new EmbedBuilder()
    .setTitle(`<:FoxyDBO:1096531360639877250> - Je suis de retour !`)
    .setThumbnail("https://cdn.discordapp.com/attachments/939881506711695410/939881793266548787/3929_idle.png")
    .addFields([ { name: `⏱ - Ping:` , value: `>>> \`\`\`${client.ws.ping || `0404`}ms\`\`\`` }, ])
    .setColor(`Green`)
    .setTimestamp()],
         username: client.user.username,
         avatarURL: client.user.avatarURL({ dynamic: true })
    })

});


function updateStatus() {
  const numberOfGuilds = client.guilds.cache.size;
  const numberOfMembers = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
  const statuses = [
    `${numberOfGuilds} serveurs.`,
    `${numberOfMembers} membres.`,
    `la commande /aide`,
    `les forêts !`,
    `les renard !`,
    `les bêtises !`,
    `la position du soleil sur la terre !`,
  ];

  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

client.user.setPresence({
    activities: [{ name: randomStatus, type: ActivityType.Watching }],
    status: 'idle',
  });
}


//// By
/////// Revolt
////////////// Owner Project 
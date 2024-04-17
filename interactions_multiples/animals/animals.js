const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

const { tokenNigthApi, color_bot_hex } = require("../../botconfig/main.json");
//const { NightAPI } = require('night-api');
//const api = new NightAPI(tokenNigthApi);

module.exports.animalsFile = async (client, interaction, animal) => {
  try {
    const ColorDefaultAnimals = {
      "cat": color_bot_hex,
      "dog": color_bot_hex,
      "giraffe": "#C97F4E",
      "hamster": "#da9e38",
      "kangaroo": color_bot_hex,
      "leopard": "#d09800",
      "lezard": "#8ab894",
      "lion": "#a0714f",
      "wolf": "Grey",
      "paon": "#067790",
      "quokka": "#AF4005",
      "fox": color_bot_hex,
      "singes": "#582900"
    };

    // Appel à NightAPI pour récupérer une image d'animal
    const response = await axios.get(`https://api.night-api.com/images/animals/${animal}`, {
      headers: {
        authorization: tokenNigthApi
      }
    });

    // Création de l'embed avec l'image et la couleur par défaut correspondant à l'animal
    const embed = new EmbedBuilder()
      .setImage(response.data.content.url)
      .setColor(ColorDefaultAnimals[animal] || color_bot_hex) // Utilisation de la couleur par défaut ou celle définie pour cet animal
      .setTimestamp();

    // Répondre à l'interaction avec l'embed créé
    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    // En cas d'erreur, gérer l'erreur avec une fonction dédiée
    const errorHandler = require(`../../Functions/erreur_interact`);
    const NameInteract = `Animal - ${animal}`;
    errorHandler.err_cmds(client, interaction, err, NameInteract);
  }
};

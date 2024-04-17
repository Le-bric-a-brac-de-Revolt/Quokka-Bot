const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  Serveur_ID: String,
});

module.exports = mongoose.model("Guild", guildSchema);


//// By
/////// Revolt
////////////// Owner Project
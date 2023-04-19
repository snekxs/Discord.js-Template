const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("./check");

module,
  (exports = {
    data: new SlashCommandBuilder()
      .setName("status")
      .setDescription("Check Bot Status"),
    async execute(interaction) {
      interaction.reply("yes puta");
    },
  });

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { execute } = require("./check");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Check Bot Status"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Status")
      .setDescription("Gearo is Online")
      .setColor("Aqua");
    interaction.reply({ embeds: [embed] });
  },
};

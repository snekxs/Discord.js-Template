const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Check Bot Status"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Status")
      .setDescription("Bot is Online")
      .setColor("Aqua");
    interaction.reply({ embeds: [embed] });
  },
};

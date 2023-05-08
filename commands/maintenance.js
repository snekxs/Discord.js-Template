const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ridzyuyhihrriayeweqw.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHp5dXloaWhycmlheWV3ZXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4OTI5NTUsImV4cCI6MTk5MDQ2ODk1NX0.dNloclNcqXm6V_w1TJ19RV3PXRSjOY03DXNfdFVhfRU";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mode")
    .setDescription("Set the Maintenace Mode")
    .addStringOption((option) =>
      option
        .setName("mode")
        .setDescription("Maintenace Mode")
        .setRequired(true)
        .addChoices(
          { name: "True", value: "true" },
          { name: "False", value: "false" }
        )
    ),
  async execute(interaction) {
    const mode = interaction.options.getString("mode");

    const embed = new EmbedBuilder()
      .setTitle("Maintenance")
      .setDescription(`Set to **${mode}**`)
      .setColor("Aqua");

    supabase
      .from("site_settings")
      .select("maintenance")
      .eq("id", 1)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        } else {
          const currentMode = data[0].maintenance;
          if (mode === String(currentMode)) {
            const errorEmbed = new EmbedBuilder()
              .setTitle("Maintenance")
              .setDescription(`Already set to **${mode}**`)
              .setColor("Red");
            interaction.reply({ embeds: [errorEmbed] });
          } else {
            supabase
              .from("site_settings")
              .update({ maintenance: mode })
              .eq("id", 1)
              .then(({ data, error }) => {
                if (error) {
                  console.log(error);
                } else {
                  interaction.reply({ embeds: [embed] });
                }
              });
          }
        }
      });
  },
};

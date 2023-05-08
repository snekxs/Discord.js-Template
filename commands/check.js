const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
} = require("discord.js");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ridzyuyhihrriayeweqw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHp5dXloaWhycmlheWV3ZXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4OTI5NTUsImV4cCI6MTk5MDQ2ODk1NX0.dNloclNcqXm6V_w1TJ19RV3PXRSjOY03DXNfdFVhfRU";

supabase = createClient(supabaseUrl, supabaseKey);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check")
    .setDescription("Check if any products in queue"),
  async execute(interaction) {
    await supabase
      .from("ProductsInQueue")
      .select("*")
      .then((response) => {
        const data = response.data;
        const count = data.length;

        if (count === 0) {
          interaction.reply("No products in queue");
        } else {
          for (let i = 0; i < count; i++) {
            const row = new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId("add")
                  .setLabel("Add")
                  .setStyle(ButtonStyle.Success)
              )
              .addComponents(
                new ButtonBuilder()
                  .setCustomId("reject")
                  .setLabel("Reject")
                  .setStyle(ButtonStyle.Danger)
              );
            const embed = new EmbedBuilder()
              .setTitle(data[i].name)
              .addFields(
                { name: "Brand", value: `${data[i].brand}`, inline: true },
                { name: "Type", value: `${data[i].type}`, inline: true }
              )
              .setImage(data[i].image_url);

            interaction.reply({ embeds: [embed], components: [row] });
          }
        }
      });
  },
};

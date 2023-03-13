const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = "https://ridzyuyhihrriayeweqw.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHp5dXloaWhycmlheWV3ZXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4OTI5NTUsImV4cCI6MTk5MDQ2ODk1NX0.dNloclNcqXm6V_w1TJ19RV3PXRSjOY03DXNfdFVhfRU";


supabase = createClient(supabaseUrl, supabaseKey);


module.exports = {
    data: new SlashCommandBuilder()
        .setName("check")
        .setDescription("Check if any products in queue"),
    async execute(interaction) {
        interaction.reply("FIX ME CUNT")
}

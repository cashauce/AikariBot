import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the current song"),
  async execute(interaction: ChatInputCommandInteraction) {
    const { client, guildId, member } = interaction;
    const voiceChannel = (member as any).voice.channel;
    const queue = (client as any).distube.getQueue(guildId);

    if (!voiceChannel) {
      return interaction.reply({ content: "You must be in a voice channel to skip music!", ephemeral: true });
    }

    if (!queue) {
      return interaction.reply({ content: "There is nothing playing right now.", ephemeral: true });
    }

    try {
      // If there's only one song, skip() will act like stop()
      await (client as any).distube.skip(guildId);
      await interaction.reply("⏭️ Skipped the current song!");
    } catch (e) {
      // Fallback if skip fails (common if it's the last song)
      await (client as any).distube.stop(guildId);
      await interaction.reply("⏹️ No more songs in queue, stopping playback.");
    }
  },
};
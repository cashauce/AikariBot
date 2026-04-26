import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop the music and clear the queue"),
  async execute(interaction: ChatInputCommandInteraction) {
    const { client, guildId, member } = interaction;
    const voiceChannel = (member as any).voice.channel;
    const queue = (client as any).distube.getQueue(guildId);

    if (!voiceChannel) {
      return interaction.reply({ content: "You must be in a voice channel to stop the music!", ephemeral: true });
    }

    if (!queue) {
      return interaction.reply({ content: "There is no music to stop.", ephemeral: true });
    }

    await (client as any).distube.stop(guildId);
    await interaction.reply("⏹️ Music stopped and queue cleared!");
  },
};
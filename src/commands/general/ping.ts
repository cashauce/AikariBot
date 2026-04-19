import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../types/Command";

const ping: Command = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Bot Latency"),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();  // buys you more time
        
        const latency = Date.now() - interaction.createdTimestamp;
        await interaction.editReply(`Pong! 🏓 Latency: ${latency}ms`);
    }
};

export default ping;
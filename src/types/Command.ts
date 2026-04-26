import { 
    ChatInputCommandInteraction, 
    SlashCommandBuilder, 
    SlashCommandOptionsOnlyBuilder, 
    SlashCommandSubcommandsOnlyBuilder 
} from "discord.js";

export interface Command {
    // This allows the base builder OR the builder with options/subcommands
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<any>;
}
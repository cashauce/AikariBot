import { Client, Collection, REST, Routes } from "discord.js";
import { Command } from "../types/Command";
import { readdirSync } from "fs";
import { join } from "path";

export const commands = new Collection<string, Command>();

export async function loadCommands(client: Client){
    const commandsPath = join(import.meta.dir, "../commands");
    const categories = readdirSync(commandsPath);

    for (const category of categories){
        const files = readdirSync(join(commandsPath, category)).filter(f =>
            f.endsWith(".ts")
        );

        for (const file of files){
            const mod = await import(join(commandsPath, category, file));
            const command: Command = mod.default;
            commands.set(command.data.name, command);
        }
    }

    const rest = new REST().setToken(Bun.env.DISCORD_TOKEN!);
    await rest.put(
        Routes.applicationCommands(Bun.env.CLIENT_ID!),
        { body: commands.map(c => c.data.toJSON())}
    );

    console.log(`Loaded ${commands.size} commands`);
}
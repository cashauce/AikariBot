import { Client, GatewayIntentBits, Events } from "discord.js";
import { loadCommands, commands } from "./handlers/commandHandler";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, async () => {
  await loadCommands(client);
  console.log(`✅ Logged in as ${client.user?.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    try {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: "Something went wrong!", ephemeral: true });
      } else {
        await interaction.reply({ content: "Something went wrong!", ephemeral: true });
      }
    } catch (replyError) {
      console.error("Failed to send error reply to interaction:", replyError);
    }
  }
});

const _token = (typeof Bun !== "undefined" && Bun.env)
  ? (Bun.env.BOT_TOKEN ?? Bun.env.DISCORD_TOKEN)
  : (process.env.BOT_TOKEN ?? process.env.DISCORD_TOKEN);

if (!_token) {
  console.error("No bot token provided in environment (BOT_TOKEN or DISCORD_TOKEN).");
  process.exit(1);
}

client.login(_token);
import { ChatInputCommandInteraction, SlashCommandBuilder, GuildMember } from "discord.js";
import { Command } from "../../types/Command";

const play: Command = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays song from Soundcloud")
    .addStringOption(option =>
        option.setName("query").setDescription("Song name or URL").setRequired(true)
    ),

    async execute(interaction: ChatInputCommandInteraction) {
        const{ member, guild, channel, options, client } = interaction;

        const voiceChannel = (member as GuildMember).voice.channel;
        if (!voiceChannel){
            return interaction.reply({
                content: "You must be in a voice channel",
                ephemeral: true
            });
        }

        if (guild?.members.me?.voice.channelId && voiceChannel.id !== guild.members.me.voice.channelId) {
            return interaction.reply({
                content: "I'm playing in a different channel!",
                ephemeral: true
            });
        }

        await interaction.deferReply();
        const query = options.getString("query", true);

        
        try{
            const distube = (client as any).distube;
            await distube.play(voiceChannel, query, {
                textChannel: channel as any,
                member: member as GuildMember,
                skip: false
            });

            await interaction.editReply(`Searching for ${query} ...`);
        }catch(error) {
            console.error(error);
            await interaction.editReply(`Failed to play the song`);
        }
    }
};

export default play;
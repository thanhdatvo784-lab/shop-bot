import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";

import { Command } from "../core/structures/command";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Kiểm tra trạng thái của bot."),

    async execute(interaction: ChatInputCommandInteraction) {
        const latency = Date.now() - interaction.createdTimestamp;

        await interaction.reply({
            content: [
                "🏓 Pong!",
                `⏱️ Latency: ${latency}ms`,
                `🤖 API Ping: ${interaction.client.ws.ping}ms`,
            ].join("\n"),
        });
    },
};

export default command;
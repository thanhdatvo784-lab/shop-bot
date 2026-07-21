import {
    ChatInputCommandInteraction,
    Events,
} from "discord.js";
import { logger } from "../core/logger/logger";
import { loadCommands } from "../core/loaders/command-loader";

const commandsPromise = loadCommands();

export const name = Events.InteractionCreate;
export const once = false;

export async function execute(
    interaction: ChatInputCommandInteraction
) {
    if (!interaction.isChatInputCommand()) return;

    const commands = await commandsPromise;

    const command = commands.get(interaction.commandName);

    if (!command) {
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        logger.error(error);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "❌ Đã xảy ra lỗi.",
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: "❌ Đã xảy ra lỗi.",
                ephemeral: true,
            });
        }
    }
}
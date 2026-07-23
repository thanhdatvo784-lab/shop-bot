import {
    Events,
    Interaction,
} from "discord.js";

import { logger } from "../core/logger/logger";
import { loadButtons } from "../core/loaders/button-loader";
import { loadCommands } from "../core/loaders/command-loader";

const commandsPromise = loadCommands();
const buttonsPromise = loadButtons();

export const name = Events.InteractionCreate;
export const once = false;

export async function execute(
    interaction: Interaction
) {

    console.log("Interaction:", interaction.type);

    // ===== BUTTON =====
    if (interaction.isButton()) {

        const buttons = await buttonsPromise;

        const action = interaction.customId.split(":")[0];

        console.log("Button:", interaction.customId);
        console.log("Action:", action);
        console.log("Buttons:", [...buttons.keys()]);

        const button = buttons.get(action);

        if (!button) {
            console.log("❌ Không tìm thấy button:", interaction.customId);
            return;
        }

        try {
            await button.execute(interaction);
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

        return;
    }

    // ===== SLASH COMMAND =====
    if (!interaction.isChatInputCommand()) {
        return;
    }

    const commands = await commandsPromise;

    const command = commands.get(interaction.commandName);

    if (!command) {
        console.log("❌ Không tìm thấy command:", interaction.commandName);
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
import {
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    SlashCommandBuilder,
} from "discord.js";

import { Command } from "../../core/structures/command";
import { creditController } from "../../modules/credit/credit.controller";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("credit-add")
        .setDescription("Cộng Credit cho người dùng")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Người nhận Credit")
                .setRequired(true)
        )

        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("Số Credit cần cộng")
                .setMinValue(1)
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {

        const user = interaction.options.getUser("user", true);
        const amount = interaction.options.getInteger("amount", true);

        const credit = await creditController.deposit(
            user.id,
            amount
        );

        await interaction.reply({
            content:
`✅ Đã cộng **${amount.toLocaleString()} Credit** cho ${user}

💰 Số dư mới: **${credit?.balance.toLocaleString()} Credit**`,
        });
    },
};

export default command;
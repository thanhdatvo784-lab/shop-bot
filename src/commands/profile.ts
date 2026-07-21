import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
} from "discord.js";

import { Command } from "../core/structures/command";
import { profileController } from "../modules/profile/profile.controller";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("Xem hồ sơ của bạn."),

    async execute(interaction: ChatInputCommandInteraction) {
        const profile = await profileController.initializeProfile(
            interaction.user.id,
            interaction.user.username
        );

        const embed = new EmbedBuilder()
            .setTitle("👤 Hồ sơ người dùng")
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
                {
                    name: "Tên",
                    value: profile.username,
                    inline: true,
                },
                {
                    name: "Discord ID",
                    value: profile.discordId,
                    inline: true,
                },
                {
                    name: "Vai trò",
                    value: profile.role,
                    inline: true,
                },
                {
                    name: "Trạng thái",
                    value: profile.status,
                    inline: true,
                },
                {
                    name: "Tham gia",
                    value: `<t:${Math.floor(profile.createdAt.getTime() / 1000)}:F>`,
                }
            )
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
        });
    },
};

export default command;
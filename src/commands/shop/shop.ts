import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
} from "discord.js";

import { Command } from "../../core/structures/command";
import { productController } from "../../modules/product/product.controller";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("Xem danh sách sản phẩm"),

    async execute(interaction: ChatInputCommandInteraction) {
        const products = await productController.findAll();

        if (products.length === 0) {
            await interaction.reply({
                content: "❌ Hiện chưa có sản phẩm nào.",
                ephemeral: true,
            });

            return;
        }

        const embed = new EmbedBuilder()
            .setTitle("🛒 CỬA HÀNG")
            .setDescription(
                products
                    .map(
                        (product) =>
                            `📦 **${product.name}**
💰 ${product.price.toLocaleString()} Credit
📂 ${product.category}`
                    )
                    .join("\n\n──────────────\n\n")
            )
            .setFooter({
                text: `Tổng sản phẩm: ${products.length}`,
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
        });
    },
};

export default command;
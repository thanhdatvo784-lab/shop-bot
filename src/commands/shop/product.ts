import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
} from "discord.js";

import { Command } from "../../core/structures/command";
import { productController } from "../../modules/product/product.controller";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("product")
        .setDescription("Xem chi tiết sản phẩm")
        .addStringOption(option =>
            option
                .setName("id")
                .setDescription("ID sản phẩm")
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const productId = interaction.options.getString("id", true);

        const product = await productController.findByProductId(productId);

        if (!product) {
            await interaction.reply({
                content: "❌ Không tìm thấy sản phẩm.",
                ephemeral: true,
            });

            return;
        }

        const embed = new EmbedBuilder()
            .setTitle(`📦 ${product.name}`)
            .addFields(
                {
                    name: "🆔 Product ID",
                    value: product.productId,
                    inline: true,
                },
                {
                    name: "💰 Giá",
                    value: `${product.price.toLocaleString()} Credit`,
                    inline: true,
                },
                {
                    name: "📂 Danh mục",
                    value: product.category,
                    inline: true,
                },
                {
                    name: "🟢 Trạng thái",
                    value: product.status,
                    inline: true,
                },
                {
                    name: "📝 Mô tả",
                    value: product.description,
                }
            )
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
        });
    },
};

export default command;
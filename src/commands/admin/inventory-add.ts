import {
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    SlashCommandBuilder,
} from "discord.js";

import { Command } from "../../core/structures/command";
import { inventoryController } from "../../modules/inventory/inventory.controller";
import { productController } from "../../modules/product/product.controller";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("inventory-add")
        .setDescription("Thêm hàng vào kho")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

        .addStringOption(option =>
            option
                .setName("product")
                .setDescription("Product ID")
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName("data")
                .setDescription("Key hoặc tài khoản")
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {

        const productId = interaction.options.getString("product", true);
        const data = interaction.options.getString("data", true);

        const product = await productController.findByProductId(productId);

        if (!product) {
            await interaction.reply({
                content: "❌ Không tìm thấy sản phẩm.",
                ephemeral: true,
            });

            return;
        }

        const inventory = await inventoryController.create({
            productId,
            data,
        });

        await interaction.reply({
            content:
`✅ Đã thêm vào kho

📦 ${product.name}
🆔 ${inventory.inventoryId}`,
        });
    },
};

export default command;
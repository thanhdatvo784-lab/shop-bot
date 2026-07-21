import {
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    SlashCommandBuilder,
} from "discord.js";

import { Command } from "../../core/structures/command";
import { productController } from "../../modules/product/product.controller";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("product-create")
        .setDescription("Tạo sản phẩm mới")

        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

        .addStringOption(option =>
            option
                .setName("name")
                .setDescription("Tên sản phẩm")
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName("description")
                .setDescription("Mô tả")
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName("category")
                .setDescription("Danh mục")
                .setRequired(true)
        )

        .addNumberOption(option =>
            option
                .setName("price")
                .setDescription("Giá")
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {

        const name = interaction.options.getString("name", true);
        const description = interaction.options.getString("description", true);
        const category = interaction.options.getString("category", true);
        const price = interaction.options.getNumber("price", true);

        const product = await productController.create({
            name,
            description,
            category,
            price,
        });

        await interaction.reply({
            content:
`✅ Đã tạo sản phẩm

ID: ${product.productId}
Tên: ${product.name}
Giá: ${product.price.toLocaleString()} Credit`,
        });
    },
};

export default command;
import {
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    SlashCommandBuilder,
} from "discord.js";

import { Command } from "../../core/structures/command";
import { productController } from "../../modules/product/product.controller";
import { DeliveryType } from "../../modules/product/product.types";

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
                .setDescription("Mô tả sản phẩm")
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName("delivery")
                .setDescription("Hình thức giao hàng")
                .setRequired(true)
                .addChoices(
                    {
                        name: "🤖 Tự động",
                        value: DeliveryType.AUTO,
                    },
                    {
                        name: "👤 Thủ công",
                        value: DeliveryType.MANUAL,
                    }
                )
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
                .setDescription("Giá sản phẩm")
                .setMinValue(0)
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const name = interaction.options.getString("name", true);
        const description = interaction.options.getString("description", true);
        const deliveryType = interaction.options.getString(
            "delivery",
            true
        ) as DeliveryType;
        const category = interaction.options.getString("category", true);
        const price = interaction.options.getNumber("price", true);

        const product = await productController.create({
            name,
            description,
            deliveryType,
            category,
            price,
        });

        await interaction.reply({
            content: `✅ Đã tạo sản phẩm thành công

🆔 ID: ${product.productId}
📦 Tên: ${product.name}
📝 Mô tả: ${product.description}
📂 Danh mục: ${product.category}
🚚 Giao hàng: ${product.deliveryType}
💰 Giá: ${product.price.toLocaleString()} Credit`,
        });
    },
};

export default command;
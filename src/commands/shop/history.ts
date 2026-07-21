import {
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
} from "discord.js";

import { Command } from "../../core/structures/command";
import { orderController } from "../../modules/order/order.controller";
import { productController } from "../../modules/product/product.controller";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("history")
        .setDescription("Xem lịch sử mua hàng"),

    async execute(interaction: ChatInputCommandInteraction) {

        const orders = await orderController.findByUserId(
            interaction.user.id
        );

        if (orders.length === 0) {
            await interaction.reply({
                content: "📭 Bạn chưa có đơn hàng nào.",
                ephemeral: true,
            });

            return;
        }

        const description = await Promise.all(
            orders.map(async (order) => {

                const product = await productController.findByProductId(
                    order.productId
                );

                return `🆔 **${order.orderId}**
📦 ${product?.name ?? "Đã xóa"}
💰 ${order.price.toLocaleString()} Credit
📅 <t:${Math.floor(order.createdAt!.getTime() / 1000)}:f>
✅ ${order.status}`;
            })
        );

        const embed = new EmbedBuilder()
            .setTitle("🧾 LỊCH SỬ MUA HÀNG")
            .setDescription(description.join("\n\n━━━━━━━━━━━━━━\n\n"))
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
        });
    },
};

export default command;
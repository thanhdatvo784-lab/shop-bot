import { ButtonInteraction } from "discord.js";

import { Button } from "../../core/structures/button";
import { orderWorkflowService } from "../../core/services/order-workflow.service";

const button: Button = {
    customId: "order_accept",

    async execute(interaction: ButtonInteraction) {

        const [, orderId] = interaction.customId.split(":");

        try {

            const order = await orderWorkflowService.accept(
                interaction.client,
                orderId,
                interaction.user.id
            );

            await interaction.reply({
                content: `✅ Bạn đã nhận xử lý đơn **${order.orderId}**.`,
                ephemeral: true,
            });

        } catch (error) {

            await interaction.reply({
                content: `❌ ${(error as Error).message}`,
                ephemeral: true,
            });

        }
    },
};

export default button;
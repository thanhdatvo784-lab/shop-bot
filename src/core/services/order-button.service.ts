import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from "discord.js";

export class OrderButtonService {

    pending(orderId: string) {
        return [
            new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setCustomId(`order_accept:${orderId}`)
                    .setLabel("Nhận xử lý")
                    .setEmoji("✅")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId(`order_cancel:${orderId}`)
                    .setLabel("Hủy đơn")
                    .setEmoji("❌")
                    .setStyle(ButtonStyle.Danger),
            ),
        ];
    }

    processing(orderId: string) {
        return [
            new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setCustomId(`order_complete:${orderId}`)
                    .setLabel("Hoàn thành")
                    .setEmoji("🎉")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId(`order_transfer:${orderId}`)
                    .setLabel("Chuyển xử lý")
                    .setEmoji("🔄")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId(`order_cancel:${orderId}`)
                    .setLabel("Hủy đơn")
                    .setEmoji("❌")
                    .setStyle(ButtonStyle.Danger),
            ),
        ];
    }

    completed() {
        return [];
    }

    cancelled() {
        return [];
    }
}

export const orderButtonService = new OrderButtonService();
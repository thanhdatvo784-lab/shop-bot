import {
    ChannelType,
    Client,
    TextChannel,
} from "discord.js";

import { config } from "../config/config";
import { orderEmbedService } from "./order-embed.service";
import { channelService } from "./channel.service";

export class HistoryOrderService {

    async completed(
        client: Client,
        orderId: string,
        customer: any,
        staff: any,
        productName: string,
        price: number
    ) {

       const channel = await channelService.history(client);

        const message = await channel.send({
            embeds: [
                orderEmbedService.completed(
                    orderId,
                    customer,
                    staff,
                    productName,
                    price
                ),
            ],
        });

        return message.id;
    }

    async cancelled(
        client: Client,
        orderId: string,
        customer: any,
        staff: any,
        productName: string,
        price: number,
        reason: string
    ) {

       const channel = await channelService.history(client);

        if (!channel || channel.type !== ChannelType.GuildText) {
            throw new Error("History channel not found.");
        }

        const message = await channel.send({
            embeds: [
                orderEmbedService.cancelled(
                    orderId,
                    customer,
                    staff,
                    productName,
                    price,
                    reason
                ),
            ],
        });

        return message.id;
    }

}

export const historyOrderService = new HistoryOrderService();
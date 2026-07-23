import {
    ChannelType,
    Client,
    TextChannel,
} from "discord.js";

import { config } from "../config/config";
import { orderEmbedService } from "./order-embed.service";
import { orderButtonService } from "./order-button.service";
import { channelService } from "./channel.service";

export class ProcessingOrderService {

    async send(
        client: Client,
        orderId: string,
        customer: any,
        staff: any,
        productName: string,
        price: number
    ) {

       const channel = await channelService.processing(client);

        const message = await channel.send({
            embeds: [
                orderEmbedService.processing(
                    orderId,
                    customer,
                    staff,
                    productName,
                    price
                ),
            ],
            components: orderButtonService.processing(orderId),
        });

        return message.id;
    }

}

export const processingOrderService = new ProcessingOrderService();
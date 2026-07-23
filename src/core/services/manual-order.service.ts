import {
    ChannelType,
    Client,
    EmbedBuilder,
    TextChannel,
} from "discord.js";

import { config } from "../config/config";
import { orderEmbedService } from "./order-embed.service";
import { orderButtonService } from "./order-button.service";
import { channelService } from "./channel.service";

export class ManualOrderService {
    async send(
        client: Client,
        orderId: string,
        userId: string,
        productName: string,
        price: number
    ) {
      const channel = await channelService.queue(client);

       const user = await client.users.fetch(userId);

const message = await channel.send({
    embeds: [
        orderEmbedService.pending(
            orderId,
            user,
            productName,
            price
        ),
    ],
    components: orderButtonService.pending(orderId),
});

return message.id;
    }
}

export const manualOrderService = new ManualOrderService();
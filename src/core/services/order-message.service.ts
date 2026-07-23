import {
    ChannelType,
    Client,
    TextChannel,
} from "discord.js";

import { config } from "../config/config";
import { channelService } from "./channel.service";

export class OrderMessageService {

    async getMessage(
        client: Client,
        messageId: string
    ) {

      const channel = await channelService.queue(client);

        return await (channel as TextChannel).messages.fetch(messageId);
    }

    async deleteMessage(
    client: Client,
    messageId: string
) {

   const channel = await channelService.processing(client);

    const message = await (channel as TextChannel).messages.fetch(
        messageId
    );

    await message.delete();
}

async deleteProcessingMessage(
    client: Client,
    messageId: string
) {

   const channel = await channelService.queue(client);

    const message = await (channel as TextChannel)
        .messages.fetch(messageId);

    await message.delete();
}
}

export const orderMessageService = new OrderMessageService();
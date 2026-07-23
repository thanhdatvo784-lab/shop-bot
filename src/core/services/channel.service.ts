import {
    ChannelType,
    Client,
    TextChannel,
} from "discord.js";

import { config } from "../config/config";

export class ChannelService {

    async queue(client: Client) {

        const channel = await client.channels.fetch(
            config.discord.manualOrderChannelId
        );

        if (!channel || channel.type !== ChannelType.GuildText) {
            throw new Error("Queue channel not found.");
        }

        return channel as TextChannel;
    }

    async processing(client: Client) {

        const channel = await client.channels.fetch(
            config.discord.processingOrderChannelId
        );

        if (!channel || channel.type !== ChannelType.GuildText) {
            throw new Error("Processing channel not found.");
        }

        return channel as TextChannel;
    }

    async history(client: Client) {

        const channel = await client.channels.fetch(
            config.discord.orderHistoryChannelId
        );

        if (!channel || channel.type !== ChannelType.GuildText) {
            throw new Error("History channel not found.");
        }

        return channel as TextChannel;
    }

}

export const channelService = new ChannelService();
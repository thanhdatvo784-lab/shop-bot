import "dotenv/config";

import { Client, GatewayIntentBits } from "discord.js";

import { config } from "./core/config/config";
import { connectDatabase } from "./core/database/database";
import { logger } from "./core/logger/logger";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.once("clientReady", () => {
        logger.info(`🤖 ${client.user?.tag} is online!`);
});

async function bootstrap() {
    await connectDatabase();

    await client.login(config.discord.token);
}

bootstrap();